import { EventHub } from './eventHub';

// Create a global instance of EventHub using the CREATE_EVENT_ENTITY method
let globalEventHub = new EventHub(EventHub.CREATE_EVENT_ENTITY('global'));

// Destructure and expose the key event handling functionalities from the globalEventHub's event entity
const { dispatch, subscribe, eventInterceptor, eventScope } = EventHub.EXPOSE(
  globalEventHub.event
);

// Export the necessary methods for use in other parts of the application
function logHub() {
  console.log('HUB', globalEventHub);
}
export { dispatch, subscribe, eventInterceptor, eventScope, logHub };
