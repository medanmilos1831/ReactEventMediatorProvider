import { EventInterceptor } from './event.interceptor';
import { EventService } from './event.service';

export class EventScope {
  private scopedEvents: {
    [key: string]: EventService;
  } = {};
  private generateScope = (scopeName: string) => {
    this.scopedEvents = {
      ...this.scopedEvents,
      [scopeName]: new EventService(new EventInterceptor(), new EventScope()),
    };
  };
  eventScope = (scopeName: string) => {
    if (!this.scopedEvents[scopeName]) {
      this.generateScope(scopeName);
    }

    return EventService.EXPOSE(this.scopedEvents[scopeName]);
  };
}
