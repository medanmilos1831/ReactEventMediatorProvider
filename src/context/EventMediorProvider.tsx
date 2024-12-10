import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Observer } from './observer';
import { EventMediorContext } from './EventMediorContext';
import { eventDetail, EVENTS_TYPE, notify, shouldUpdateType } from './types';

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

  /**
   * Initializes a new instance of Observer.
   * This function is called only once during the component's lifetime.
   *
   * @returns {Observer} A new Observer instance.
   */
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
 * Subscriber component of EventMediorProvider.
 * Subscribes to one or more events and re-renders child components
 * when relevant events are triggered.
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
  children: (params: eventDetail) => JSX.Element;
  shouldUpdate?: shouldUpdateType;
}) => {
  // Retrieve the Observer instance from context.
  const observer = useContext(EventMediorContext)!;

  // Track subscription initialization for each event.
  const init = useRef<(boolean | (() => void))[]>(
    Array(event.length).fill(false)
  );

  // State used to force re-rendering.
  const [_, render] = useState<number>(0);

  // Reference to hold the latest event payload.
  const payload = useRef<eventDetail>({
    payload: undefined,
    event: undefined,
    config: undefined,
  });

  // Subscribe to events and handle updates.
  event.forEach((event, index) => {
    if (init.current[index] === false) {
      // Initialize subscription for the event.
      init.current[index] = observer.subscribe({
        event,
        callback: (eventDetail: eventDetail) => {
          // Update payload and trigger re-render.
          payload.current = eventDetail;
          render((prev) => prev + 1);
        },
        shouldUpdate,
      });
    }
  });

  // Cleanup subscriptions on unmount.
  useEffect(() => {
    return () => {
      init.current.forEach((item) => {
        (item as () => void)(); // Invoke unsubscribe callbacks.
      });
    };
  }, []);

  return <>{children(payload.current)}</>;
};

/**
 * Custom hook to send notifications (trigger events) in the system.
 *
 * @returns {Function} A function to notify observers of specific events.
 */
function useNotify() {
  const observer = useContext(EventMediorContext)!;

  return ({ event, payload, config }: notify) => {
    observer.notify({
      event,
      payload,
      config: config
        ? config
        : {
            eventType: EVENTS_TYPE.SIGNAL_EVENT, // Default event type.
          },
    });
  };
}

/**
 * Custom hook to subscribe to one or more events with a callback.
 * Automatically cleans up subscriptions when the component is unmounted.
 *
 * @param {Function} callback - Callback function invoked with event details.
 * @param {string[]} events - List of events to subscribe to.
 * @returns {Function} A function to notify other observers.
 */
function useSubscribe(
  callback: (params: eventDetail) => void,
  events: string[]
) {
  const observer = useContext(EventMediorContext)!;

  useEffect(() => {
    // Subscribe to each event and store unsubscribe callbacks.
    let unsubscribe: (() => void)[] = [];
    events.forEach((event) => {
      unsubscribe.push(
        observer.subscribe({
          event,
          callback,
          shouldUpdate: true,
        })
      );
    });

    // Cleanup subscriptions on unmount.
    return () => {
      unsubscribe.forEach((item) => {
        item();
      });
    };
  }, [events, callback, observer]);

  return observer.notify;
}

// Exporting the provider and hooks for usage in other components.
export { EventMediorProvider, useNotify, useSubscribe };
