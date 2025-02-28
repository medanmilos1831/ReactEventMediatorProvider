import { EventHub } from './eventHub';

let globalEventHub = new EventHub(EventHub.CREATE_EVENT_ENTITY());
let { dispatch, subscribe, eventInterceptor, eventScope } = EventHub.EXPOSE(
  globalEventHub.event
);
export { dispatch, subscribe, eventInterceptor, eventScope };
