import { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { EventMediorContext } from './EventMediorContext';
import { Observer } from './observer';
import { event } from './types';

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
 * Custom hook to send notifications (trigger events) in the system.
 *
 * @returns {Function} A function to notify observers of specific events.
 */
function useNotify() {
  const observer = useContext(EventMediorContext)!;

  return ({ event, payload }: event) => {
    observer.notify({
      event,
      payload,
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
function useSubscribe(callback: (params: event) => void, events: string[]) {
  const observer = useContext(EventMediorContext)!;

  useEffect(() => {
    // Subscribe to each event and store unsubscribe callbacks.
    let unsubscribe: (() => void)[] = [];
    events.forEach((event) => {
      unsubscribe.push(
        observer.subscribe({
          event,
          callback,
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
