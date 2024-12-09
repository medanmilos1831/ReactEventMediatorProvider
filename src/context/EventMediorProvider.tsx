import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Observer } from './observer';
import { EventMediorContext } from './EventMediorContext';
import { shouldUpdateType } from './types';

/**
 * EventMediorProvider component.
 * Provides a shared Observer instance via React Context, allowing components to
 * publish and subscribe to events without prop drilling.
 *
 * @param {React.ReactNode} children - Child components that need access to the observer.
 * @returns {JSX.Element} The provider wrapping child components.
 */
const EventMediorProvider = ({ children }: PropsWithChildren) => {
  // Lazily initialize the observer instance to ensure it's created only once.
  const [observer, _] = useState(init);

  function init() {
    return new Observer();
  }

  return (
    <EventMediorContext.Provider value={observer}>
      {children}
    </EventMediorContext.Provider>
  );
};

/**
 * EventMediorProvider.Subscriber component.
 * Subscribes to one or more events, re-renders when relevant events occur,
 * and cleans up subscriptions on unmount.
 *
 * @param {string[]} event - List of event names to subscribe to.
 * @param {Function} children - Render function receiving the event payload and name.
 * @param {shouldUpdateType} shouldUpdate - Optional; determines whether to trigger an update.
 * @returns {JSX.Element} Rendered child components with event data.
 */
EventMediorProvider.Subscriber = ({
  event,
  children,
  shouldUpdate = true,
}: {
  event: string[];
  children: ({ payload, event }: any) => JSX.Element;
  shouldUpdate?: shouldUpdateType;
}) => {
  const observer = useContext(EventMediorContext)!;

  // Track subscription initialization for each event.
  const init = useRef<(boolean | (() => void))[]>(
    Array(event.length).fill(false)
  );

  // State used to force re-rendering.
  const [_, render] = useState<number>(0);

  // Reference to hold the latest event payload.
  const payload = useRef<any>({
    payload: undefined,
    event: undefined,
  });

  // Subscribe to events and handle updates.
  event.forEach((event, index) => {
    if (init.current[index] === false) {
      init.current[index] = observer.subscribe(
        event,
        (eventDetail: any) => {
          // Update payload and trigger re-render.
          payload.current = {
            ...payload.current,
            ...eventDetail,
          };
          render((prev) => prev + 1);
        },
        shouldUpdate
      );
    }
  });

  // Cleanup subscriptions on unmount.
  useEffect(() => {
    return () => {
      init.current.forEach((item) => {
        (item as () => void)();
      });
    };
  }, []);

  return (
    <>
      {children({
        ...payload.current,
      })}
    </>
  );
};

/**
 * useNotify hook.
 * Provides a function to trigger events with a payload.
 *
 * @returns {Function} The notify function from the Observer instance.
 */
function useNotify() {
  const observer = useContext(EventMediorContext)!;
  return observer.notify;
}

/**
 * useSubscribe hook.
 * Subscribes to a single event, invoking a callback when the event is triggered.
 * Automatically cleans up the subscription on component unmount.
 *
 * @param {string} event - Name of the event to subscribe to.
 * @param {Function} callback - Function to call with the event payload.
 * @returns {Function} The notify function for triggering events.
 */
function useSubscribe(events: string[], callback: Function) {
  const observer = useContext(EventMediorContext)!;

  useEffect(() => {
    // Subscribe to the event and receive the unsubscribe function.
    let unsubscribe: (() => void)[] = [];
    events.forEach((event) => {
      unsubscribe.push(observer.subscribe(event, callback, true));
    });
    return () => {
      unsubscribe.forEach((item) => {
        item();
      });
    };
  });

  return observer.notify;
}

export { EventMediorProvider, useNotify, useSubscribe };
