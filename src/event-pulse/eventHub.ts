import { EventEntity } from './eventEntity';
import { InterceptorEventService } from './interceptorEventService';
import { ScopedEventService } from './scopedEventService';
export class EventHub {
  event: EventEntity;
  constructor(event: EventEntity) {
    this.event = event;
  }
  static EXPOSE = (event: EventEntity) => {
    return {
      dispatch: event.dispatch,
      subscribe: event.subscribe,
      eventInterceptor: event.interceptorService.interceptor,
      eventScope: event.eventScopes.eventScope,
    };
  };
  static CREATE_EVENT_ENTITY = () => {
    return new EventEntity(
      new InterceptorEventService(),
      new ScopedEventService()
    );
  };
}
