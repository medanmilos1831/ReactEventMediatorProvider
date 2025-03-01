import { EventEntity } from './eventEntity';
import { EventHub } from './eventHub';

// Create a global instance of EventHub using the CREATE_EVENT_ENTITY method
let eventHub = new EventHub();

// Destructure and expose the key event handling functionalities from the globalEventHub's event entity
const { dispatch, subscribe, eventInterceptor } = EventHub.EXPOSE(
  eventHub.event
);

// Export the necessary methods for use in other parts of the application
function logHub() {
  console.log('HUB', eventHub);
}
const eventScope = (scope: string) => eventHub.eventScope(scope);
export { dispatch, subscribe, eventInterceptor, eventScope, logHub };
