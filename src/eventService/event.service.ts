import { EventInterceptor } from './event.interceptor';
import { EventScope } from './event.scope';

/**
 * Type for the function used to subscribe to an event. The callback function receives event data.
 * @param data Data sent with the event, including the payload and append value.
 */
type subscriberCallbackType = (data: { payload: any; append: any }) => void;

/**
 * Class representing a service for managing events with support for interceptors.
 * This class allows for event dispatching and subscribing, as well as manipulating data before the event is emitted.
 * It inherits from `EventTarget`, meaning it can emit and listen for events.
 */
export class EventService extends EventTarget {
  /**
   * Instance of the interceptor service that manages data processing before an event is dispatched.
   */
  interceptorService!: EventInterceptor;
  eventScopes!: EventScope;

  /**
   * Constructor function that initializes the EventService and the interceptor service.
   */
  constructor(interceptorService: EventInterceptor, eventScopes: EventScope) {
    super();
    this.interceptorService = interceptorService;
    this.eventScopes = eventScopes;
  }

  /**
   * Function that dispatches an event with the processed payload.
   * It first executes all the interceptors registered for the event, then dispatches the event.
   * @param eventName The name of the event to be dispatched.
   * @param payload The data to be sent with the event.
   */
  dispatch = ({
    eventName,
    payload = undefined,
  }: {
    eventName: string;
    payload?: any;
  }) => {
    let { payload: eventPayload } = this.interceptorService.executeInterceptors(
      eventName,
      payload
    );

    // Creating and dispatching the event with the processed data
    const event = new CustomEvent(eventName, {
      detail: {
        payload: eventPayload,
      },
    });
    this.dispatchEvent(event);
  };

  /**
   * Function that allows subscribing to an event. When the event is emitted, the callback function is invoked.
   * @param eventName The name of the event to subscribe to.
   * @param callback The function that is called when the event is emitted. It receives event data.
   * @returns A function that can be called to unsubscribe from the event.
   */
  subscribe = (eventName: string, callback: subscriberCallbackType) => {
    let handler = (e: any) => {
      callback(e.detail);
    };

    // Adding an event listener for the event
    this.addEventListener(eventName, handler);

    // Returns a function that removes the event listener
    return () => this.removeEventListener(eventName, handler);
  };

  static EXPOSE = (event: EventService) => {
    return {
      dispatch: event.dispatch,
      subscribe: event.subscribe,
      eventInterceptor: event.interceptorService.interceptor,
      eventScope: event.eventScopes.eventScope,
    };
  };
}
