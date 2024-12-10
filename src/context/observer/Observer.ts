/**
 * Observer class for implementing an event-driven architecture.
 * Extends the native `EventTarget` to manage events and subscribers.
 * Provides methods for notifying subscribers and handling conditional updates.
 */
import {
  IObserver,
  notifyType,
  shouldUpdateType,
  subscribeType,
} from '../types';

export class Observer extends EventTarget implements IObserver {
  constructor() {
    super(); // Call the parent class constructor (EventTarget).
  }

  /**
   * Notifies all subscribers of a specific event with the provided payload.
   * Creates and dispatches a `CustomEvent` containing the event name and payload.
   *
   * @param {string} event - The name of the event to notify subscribers about.
   * @param {any} payload - The data to send to subscribers.
   */
  // event: string,
  //   payload: any,
  //   config?: {
  //     eventType: 'storeMutation' | 'eventSignal';
  //   }
  notify = ({ event, payload, config }: notifyType) => {
    const target = new CustomEvent(event, {
      detail: {
        payload, // The actual data to pass to subscribers.
        event, // The event name for contextual information.
        config: config ?? {},
      },
    });
    this.dispatchEvent(target); // Emit the event to all listeners.
  };

  /**
   * Subscribes to a specific event with a callback and an optional condition for updates.
   * Allows conditional execution of the callback based on the `shouldUpdate` parameter.
   *
   * @param {string} event - The event to subscribe to.
   * @param {(payload: any) => void} callback - The function to execute when the event occurs.
   * @param {shouldUpdateType} shouldUpdate -
   *  A boolean or a function to decide whether to trigger the callback.
   *  - If a boolean, `true` always triggers the callback.
   *  - If a function, it receives the payload and should return `true` to trigger the callback.
   *
   * @returns {() => void} A function to unsubscribe from the event.
   */
  subscribe({ event, callback, shouldUpdate }: subscribeType) {
    // Listener function that wraps the callback with the condition logic.
    let listener = (e: any) => {
      // If `shouldUpdate` is a boolean and true, execute the callback.
      if (typeof shouldUpdate === 'boolean' && shouldUpdate) {
        callback(e.detail); // `e.detail` contains event data and payload.
        return;
      }
      // If `shouldUpdate` is a function, evaluate the condition.
      if (typeof shouldUpdate === 'function' && shouldUpdate(e.detail)) {
        callback(e.detail);
      }
    };

    this.addEventListener(event, listener); // Attach the listener to the event.

    // Return a cleanup function to remove the listener.
    return () => {
      this.removeEventListener(event, listener);
    };
  }
}
