/**
 * Interface for an Observer.
 * Defines the core methods an Observer should implement.
 */
export interface IObserver {
  /**
   * Subscribes to an event.
   *
   * @param {subscribeType} params - Details about the event and callback.
   * @returns {Function} A function to unsubscribe from the event.
   */
  subscribe(params: subscribeType): () => void;

  /**
   * Notifies all subscribers of a specific event.
   *
   * @param {eventDetail} params - The details of the event being triggered.
   * @returns {any} Result of the notify operation (can vary based on implementation).
   */
  notify(params: eventDetail): any;
}

/**
 * Defines the condition for updating a subscription.
 * Can either be a boolean or a function that evaluates the event details.
 */
export type shouldUpdateType =
  | boolean
  | ((eventDetail: eventDetail) => boolean);

/**
 * Parameters for subscribing to an event.
 */
export type subscribeType = {
  event: string; // The name of the event to subscribe to.
  callback: Function; // The callback function executed when the event is triggered.
  shouldUpdate: shouldUpdateType; // Determines whether the callback should run.
};

/**
 * Core structure for an event.
 */
type event = {
  event: string | undefined; // The name of the event (can be undefined in some cases).
  payload: any; // Data passed along with the event.
};

/**
 * Extended type for the `notify` function parameters.
 */
export type notify = event & {
  config?: {
    eventType: `${EVENTS_TYPE}` | string; // Optional event type (supports predefined or custom types).
  };
};

/**
 * Extended details of an event, including configuration.
 */
export type eventDetail = event & {
  config:
    | {
        eventType: `${EVENTS_TYPE}` | string; // Event type for categorization.
      }
    | undefined;
};

// STORE TYPES

/**
 * Defines a module with state, mutations, and optional getters.
 * This is used for managing application state in a modular way.
 *
 * @template T - The type of the state in the module.
 */
export interface ModuleType<T = unknown> {
  moduleName: string; // Name of the module.
  state: T; // The module's state object.
  mutation?: { [key: string]: (this: T, args: any) => void }; // Methods for updating state.
  getters?: { [key: string]: (this: T) => any } | undefined; // Optional computed properties.
}
// END :: STORE TYPES

/**
 * Enumeration of predefined event types.
 * Can be extended with custom types if necessary.
 */
export enum EVENTS_TYPE {
  SIGNAL_EVENT = 'signal_event', // Used for signaling generic events.
  STORE_MUTATION_EVENT = 'store_mutation_event', // Used for events related to store mutations.
}
