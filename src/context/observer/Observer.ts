/**
 * Observer class for implementing an event-driven architecture.
 * Extends the native `EventTarget` to manage events and subscribers.
 * Provides methods for notifying subscribers and handling conditional updates.
 */

import {
  IObserver,
  eventDetail,
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
   * @param {eventDetail} eventDetail - Object containing the event name, payload, and optional configuration.
   * - `event` (string): The name of the event to notify subscribers about.
   * - `payload` (any): The data to send to subscribers.
   * - `config` (optional): Additional configuration like event type.
   */
  notify = (eventDetail: eventDetail) => {
    if (!eventDetail.event) {
      console.error('Event name is undefined!');
      return;
    }

    // Create a new CustomEvent with the provided details.
    const target = new CustomEvent(eventDetail.event, {
      detail: eventDetail, // Attach the eventDetail object to the event's detail property.
    });

    this.dispatchEvent(target); // Emit the event to all listeners.
  };

  /**
   * Subscribes to a specific event with a callback and an optional condition for updates.
   * Allows conditional execution of the callback based on the `shouldUpdate` parameter.
   *
   * @param {subscribeType} params - Subscription details.
   * - `event` (string): The event to subscribe to.
   * - `callback` (function): The function to execute when the event occurs.
   * - `shouldUpdate` (boolean or function): Determines whether the callback is triggered:
   *   - If `true`, the callback is always executed.
   *   - If a function, it is called with the event payload and must return `true` to trigger the callback.
   *
   * @returns {() => void} A function to unsubscribe from the event.
   */
  subscribe({ event, callback, shouldUpdate }: subscribeType) {
    // Listener function that wraps the callback with conditional logic.
    const listener = (event: any) => {
      const eventDetail = event.detail as eventDetail;

      // Trigger the callback if `shouldUpdate` is a boolean and true.
      if (typeof shouldUpdate === 'boolean' && shouldUpdate) {
        callback(eventDetail);
        return;
      }

      // Trigger the callback if `shouldUpdate` is a function and returns true.
      if (typeof shouldUpdate === 'function' && shouldUpdate(eventDetail)) {
        callback(eventDetail);
      }
    };

    // Attach the listener to the event.
    this.addEventListener(event, listener);

    // Return a cleanup function to remove the listener.
    return () => {
      this.removeEventListener(event, listener);
    };
  }
}
