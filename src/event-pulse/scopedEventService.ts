import { EventEntity } from './eventEntity';
import { EventHub } from './eventHub';

/**
 * The ScopedEventService class provides functionality to manage and access scoped event entities.
 * It allows for the creation and access of events within different scopes, ensuring that events
 * in one scope do not interfere with those in another scope.
 */
export class ScopedEventService {
  /**
   * A record that holds event entities, keyed by their scope name.
   * Each scope can have its own set of event entities, enabling encapsulation of event management
   * within specific sections of the application.
   *
   * @example
   * scopedEvents = {
   *   "userScope": EventEntityInstance,
   *   "orderScope": EventEntityInstance,
   * }
   */
  scopedEvents: Record<string, EventEntity> = {};

  /**
   * A private method that generates and stores a new `EventEntity` for a given scope name.
   * This method is automatically called when an event scope is requested but does not already exist.
   *
   * @param scopeName The name of the scope where the event entity should be created.
   */
  private generateScope = (scopeName: string): void => {
    // Create a new EventEntity and store it in the scopedEvents record
    this.scopedEvents[scopeName] = EventHub.CREATE_EVENT_ENTITY(scopeName);
  };

  /**
   * The `eventScope` method provides access to the event entity for a given scope.
   * If the scope does not exist, it is generated automatically.
   *
   * @param scopeName The name of the scope whose event entity is being requested.
   * @returns The `EventEntity` instance for the requested scope.
   *
   * @example
   * const userEvents = scopedEventService.eventScope("userScope");
   */
  eventScope = (scopeName: string) => {
    // If the scope does not exist in scopedEvents, generate it.
    if (!this.scopedEvents[scopeName]) {
      this.generateScope(scopeName);
    }

    // Return the `EventEntity` associated with the scope, exposing its functionality.
    return EventHub.EXPOSE(this.scopedEvents[scopeName]);
  };
}
