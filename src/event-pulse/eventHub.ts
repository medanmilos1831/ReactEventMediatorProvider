import { EventEntity } from './eventEntity';
import { InterceptorEventService } from './interceptorEventService';
import { ScopedEventService } from './scopedEventService';

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
  event: EventEntity;

  /**
   * Constructor for the EventHub class.
   * This constructor initializes an EventHub instance with a given EventEntity instance,
   * which contains the event logic.
   *
   * @param event - The EventEntity instance that will handle event dispatching, subscriptions,
   * and interactions with interceptors and scopes.
   */
  constructor(event: EventEntity) {
    // Initialize the event property with the provided EventEntity instance.
    this.event = event;
  }

  /**
   * The EXPOSE method exposes critical methods and services from the EventEntity
   * to external consumers of the EventHub.
   * This is a key method for providing the core functionality required to interact
   * with events in the system.
   *
   * Exposed methods:
   * - dispatch: Dispatches an event with optional payload data.
   * - subscribe: Subscribes to an event, triggering a callback when the event is emitted.
   * - eventInterceptor: Provides access to the event interceptor service for modifying event data.
   * - eventScope: Provides access to the event scope service, enabling event-specific scopes.
   *
   * @param event - The EventEntity instance to expose. This event instance contains
   *                all methods related to dispatching, subscribing, interceptors, and scopes.
   * @returns An object containing the core functionalities that can be used externally.
   *          These include methods for dispatching events, subscribing to events,
   *          and accessing the interceptor and scope services.
   *
   * @example
   * const exposedEvent = EventHub.EXPOSE(event);
   * exposedEvent.dispatch('eventName', data); // Dispatches an event.
   * exposedEvent.subscribe('eventName', callback); // Subscribes to an event.
   */
  static EXPOSE = (event: EventEntity) => {
    return {
      // Dispatch an event with an optional payload.
      dispatch: event.dispatch,

      // Subscribe to an event and provide a callback that will be invoked when the event is triggered.
      subscribe: event.subscribe,

      // Access the interceptor service for modifying event data before dispatching.
      eventInterceptor: event.interceptorService.interceptor,

      // Access the event scope service that allows creating and managing event-specific scopes.
      eventScope: event.eventScopes.eventScope,
    };
  };

  /**
   * The CREATE_EVENT_ENTITY method is used to create a new EventEntity instance.
   * This new instance is fully initialized with the necessary services:
   * - InterceptorEventService for intercepting and modifying event data.
   * - ScopedEventService for handling scoped event behavior.
   *
   * This method is essential for creating new, self-contained event instances, each with
   * their own event logic, interceptor management, and event scope handling.
   *
   * @returns A new EventEntity instance, fully configured with the required services.
   *
   * @example
   * const newEventEntity = EventHub.CREATE_EVENT_ENTITY();
   * newEventEntity.dispatch('eventName', data); // Dispatches an event from the new entity.
   */
  static CREATE_EVENT_ENTITY = () => {
    // Create a new EventEntity with its dependencies: InterceptorEventService and ScopedEventService.
    return new EventEntity(
      new InterceptorEventService(), // Creates a new instance of the interceptor service.
      new ScopedEventService() // Creates a new instance of the scoped event service.
    );
  };
}
