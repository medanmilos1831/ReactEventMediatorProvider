import { EventEntity } from './eventEntity';
import { EventHub } from './eventHub';

export class ScopedEventService {
  private scopedEvents: Record<string, EventEntity> = {};
  private generateScope = (scopeName: string): void => {
    this.scopedEvents[scopeName] = EventHub.CREATE_EVENT_ENTITY();
  };
  eventScope = (scopeName: string) => {
    if (!this.scopedEvents[scopeName]) {
      this.generateScope(scopeName);
    }

    return EventHub.EXPOSE(this.scopedEvents[scopeName]);
  };
}
