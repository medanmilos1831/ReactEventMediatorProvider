import { EventHub } from './eventHub';
// Create a global instance of EventHub using the CREATE_EVENT_ENTITY method
let eventHub = new EventHub();

// Export the necessary methods for use in other parts of the application
function logHub() {
  console.log('HUB', eventHub);
}

const dispatch = eventHub.event.dispatch;
const subscribe = eventHub.event.subscribe;
const eventInterceptor = eventHub.event.eventInterceptor.interceptor;
const eventScope = eventHub.event.eventScope.bind(eventHub.event);

export { dispatch, subscribe, eventInterceptor, eventScope, logHub };
