/**
 * Observer class for implementing an event-driven architecture.
 * Extends the native `EventTarget` to manage events and subscribers.
 * Provides methods for notifying subscribers and handling conditional updates.
 */

import { event, IObserver, subscribeType } from '../types';

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
   */
  notify = (eventDetail: event) => {
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
   *
   * @param {subscribeType} params - Subscription details.
   * - `event` (string): The event to subscribe to.
   * - `callback` (function): The function to execute when the event occurs.
   *
   * @returns {() => void} A function to unsubscribe from the event.
   */
  subscribe({ event, callback }: subscribeType) {
    // Listener function that wraps the callback with conditional logic.
    const listener = (event: any) => {
      const eventDetail = event.detail as event;
      callback(eventDetail);
    };

    // Attach the listener to the event.
    this.addEventListener(event, listener);

    // Return a cleanup function to remove the listener.
    return () => {
      this.removeEventListener(event, listener);
    };
  }
}
