import { PropsWithChildren, useContext, useRef, useState } from 'react';
import { EventMediorStoreContext } from './EventMediorStoreContext';
import { EVENTS_TYPE, ModuleType } from '../types';
import { Store } from './Store';
import { useSubscribe } from '../EventMediorProvider';
import { EventMediorContext } from '../EventMediorContext';

/**
 * React Provider for EventMediorStore.
 * Initializes and provides a store to the component tree.
 *
 * @template T - Array of module definitions conforming to `ModuleType`.
 * @param {PropsWithChildren<{ modules: T }>} props - Props containing child components and module definitions.
 * @returns {JSX.Element} The provider component for the store.
 */
function EventMediorStoreProvider<T extends ModuleType<any>[]>({
  children,
  modules,
}: PropsWithChildren<{ modules: T }>) {
  // Initialize the store only once using the `useState` initializer function
  const [store, _] = useState(init);

  /**
   * Initializes the store with the given modules.
   * @returns {Store} The initialized store.
   */
  function init() {
    return new Store(modules);
  }

  return (
    <EventMediorStoreContext.Provider value={store}>
      {children}
    </EventMediorStoreContext.Provider>
  );
}

EventMediorStoreProvider.GetState = ({
  children,
  target,
  config,
}: {
  children: (obj: { state: any }) => JSX.Element;
  target: string;
  config: {
    events: string[];
  };
}) => {
  const { state } = useGetState(target, config);
  return (
    <>
      {children({
        state,
      })}
    </>
  );
};
/**
 * Hook for retrieving a specific state from the store.
 * Subscribes to events and updates the component state when changes occur.
 *
 * @param {string} target - The target in "moduleName/getter" format.
 * @param {{ events: string[] }} options - Options specifying the events to listen for.
 * @returns {{ state: any | undefined }} The current state or undefined if not available.
 */
const useGetState = (
  target: string,
  {
    events,
  }: {
    events: string[];
  }
) => {
  const { store, parseSlash } = useContext(EventMediorStoreContext);

  // Local state to force re-render on event updates
  const [_, setState] = useState(0);

  // Store the parsed moduleName and getter for the target
  const eventData = useRef<{
    moduleName: string | undefined;
    getter: string | undefined;
  }>({
    moduleName: parseSlash(target).moduleName,
    getter: parseSlash(target).item,
  });

  // Subscribe to specified events and update state on event triggers
  useSubscribe(() => {
    setState((prev) => prev + 1); // Increment state to trigger re-render
  }, events);

  const { moduleName, getter } = eventData.current;

  return {
    state:
      !moduleName || !getter
        ? undefined
        : store[moduleName].getters[getter].call(store[moduleName].state),
  };
};

/**
 * Hook for mutating the state in the store and optionally emitting an event.
 *
 * @returns {(event: string, obj: { payload: any }) => void} Function to mutate state and emit events.
 */
const useMutateState = () => {
  const { store, parseSlash } = useContext(EventMediorStoreContext);
  const observer = useContext(EventMediorContext)!;
  return (params: { event: string; payload: any }) => {
    const { event, payload } = params;
    // Parse the event into moduleName and mutation
    const { moduleName, item: mutation } = parseSlash(event);

    // Perform the mutation on the module's state
    store[moduleName].mutation[mutation].call(store[moduleName].state, payload);

    // Emit the event if specified
    if (event) {
      observer.notify({
        event,
        payload,
        config: {
          eventType: EVENTS_TYPE.STORE_MUTATION_EVENT,
        },
      });
    }
  };
};

export { EventMediorStoreProvider, useGetState, useMutateState };
