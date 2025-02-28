/**
 * Interface that defines the basic parameters for the interceptor configuration.
 */
interface IInterceptor {
  /**
   * The name of the event that the interceptor responds to.
   * @example "userLogin"
   */
  eventName: string;
}

/**
 * Type for a function representing the interceptor callback.
 * @param obj An object containing the event payload.
 * @returns Returns the processed payload or undefined if there is no change.
 */
type interceptorCallbackType = (obj: { eventPayload: any }) => any;

/**
 * Class that manages the registration and execution of interceptors for events.
 */
export class InterceptorEventService {
  /**
   * Maps event names to a list of interceptors that are executed when the event is triggered.
   * The key is the event name, and the value is a list of interceptors that respond to that event.
   */
  interceptors = new Map<string, { interceptor: interceptorCallbackType }[]>();

  /**
   * Registers a new interceptor for a specific event.
   * @param callback The function that is called when the event occurs. It processes the event payload.
   * @param config Configuration that contains the event name the interceptor responds to.
   * @returns A function that allows removing this interceptor.
   * @example
   * const unsubscribe = interceptorService.interceptor(callback, { eventName: "userLogin" });
   * unsubscribe(); // Called to remove the interceptor
   */
  interceptor = (callback: interceptorCallbackType, config: IInterceptor) => {
    const defaultConfig: IInterceptor = {
      ...config,
    };
    const { eventName } = defaultConfig;

    // If there are no interceptors for this event yet, add the new interceptor
    if (!this.interceptors.has(eventName)) {
      this.interceptors.set(eventName, [{ interceptor: callback }]);
    } else {
      // If interceptors exist for this event, add the new one to the list
      let value = this.interceptors.get(eventName)!;
      value.push({ interceptor: callback });
      this.interceptors.set(eventName, value);
    }

    // Function that removes the interceptor for the specific event
    return () => {
      if (!this.interceptors.has(eventName)) return;

      let value = this.interceptors.get(eventName)!;
      // Filter interceptors and remove the one passed in
      value = value.filter((item) => item.interceptor != callback);

      // If no interceptors remain for this event, remove it from the map
      value.length === 0
        ? this.interceptors.delete(eventName)
        : this.interceptors.set(eventName, value);
    };
  };

  /**
   * Executes all registered interceptors for a given event and processes the payload.
   * @param eventName The name of the event whose interceptors are executed.
   * @param payload The data passed to the event. It will be processed by the interceptors.
   * @returns The new payload processed by all interceptors.
   * @example
   * const result = interceptorService.executeInterceptors("userLogin", payload);
   * console.log(result.payload); // Returns the processed payload
   */
  executeInterceptors = (eventName: string, payload: any) => {
    // If no interceptors are registered for the event, return the original payload
    if (!this.interceptors.has(eventName)) {
      return {
        payload: payload,
      };
    }

    let data = structuredClone(payload);

    // Call each interceptor for the specified event
    this.interceptors.get(eventName)!.forEach(({ interceptor }) => {
      let result = interceptor({
        eventPayload: data,
      });

      // If the interceptor modifies the payload, update the data
      if (result) {
        data = result;
      }
    });

    return {
      payload: data,
    };
  };
}
