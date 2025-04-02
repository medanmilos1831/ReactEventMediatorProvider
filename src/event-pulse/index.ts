import { EventEntity } from './EventEntity';
let eventHub = new EventEntity();

// Export the necessary methods for use in other parts of the application
function logHub() {
  console.log('HUB', eventHub);
}

const dispatch = eventHub.dispatch;
const subscribe = eventHub.subscribe;
const eventInterceptor = eventHub.eventInterceptor.interceptor;
const eventScope = eventHub.eventScope.bind(eventHub);

export { dispatch, eventInterceptor, eventScope, logHub, subscribe, eventHub };
