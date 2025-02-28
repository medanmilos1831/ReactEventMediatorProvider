import { EventInterceptor } from './event.interceptor';
import { EventScope } from './event.scope';
import { EventService } from './event.service';

// Initializing an instance of EventService
let instance = new EventService(new EventInterceptor(), new EventScope());
let { dispatch, subscribe, eventInterceptor, eventScope } =
  EventService.EXPOSE(instance);
export { dispatch, subscribe, eventInterceptor, eventScope };
