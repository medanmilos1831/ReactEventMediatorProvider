import { EventEntity } from './eventEntity';

/**
 * The EventHub class acts as the main point of interaction for managing event-related operations
 * in the event-driven system. It handles global event dispatching, subscription, and interaction
 * with event interceptors and scopes.
 * This class also facilitates creating and exposing event instances for use by clients.
 */
export class EventHub {
  /**
   * An instance of EventEntity that represents an individual event instance.
   * This EventEntity encapsulates the event dispatching logic, subscribing to events,
   * and interacting with event interceptors and scopes.
   *
   * The EventEntity object contains the logic for all event handling, and this EventHub
   * provides access to it for external use.
   */
  event = new EventEntity('global');
}
