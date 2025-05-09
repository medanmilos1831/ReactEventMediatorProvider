import { subscribe } from './subscribe';
import { action } from './action';
import { GLOBAL_EVENT_ENTITY } from './constants';
import { EventEntity } from './EventEntity';
import { actionType, subscribeType } from './types';

export class EventManager {
  events = new EventEntity();
  logger: boolean = false;
  protected log(type: 'dispatch' | 'subscribe', data: Record<string, any>) {
    if (this.logger) {
      console.group(`[EventManager] ${type.toUpperCase()}`);
      console.table(data);
      console.groupEnd();
    }
  }

  managerAction = (obj: actionType) => {
    action.call(this, obj);
  };

  managerSubscribe = (obj: subscribeType) => {
    return subscribe.call(this, obj);
  };

  managerEventInterceptor = ({
    scope = GLOBAL_EVENT_ENTITY,
    eventName,
    callback,
  }: {
    scope?: string;
    eventName: string;
    callback: (data: { eventPayload: any }) => any;
  }) => {
    if (!scope || scope === GLOBAL_EVENT_ENTITY) {
      this.events.eventInterceptor.interceptor(callback, { eventName });
      return;
    }

    let scopes = scope?.split(':').filter(Boolean) ?? [];
    let current = this.events;
    for (const item of scopes) {
      if (!current.scopedEvents.has(item)) {
        console.warn(`Scope "${scope}" does not exist.`);
        return;
      }
      current = current.scopedEvents.get(item)!;
    }

    current.eventInterceptor.interceptor(callback, { eventName });
  };

  configEventManager = (config: { logger: boolean }) => {
    this.logger = config.logger;
  };

  autoBindListeners(
    object: any,
    objMap: { [key: string]: { eventName: string }[] }
  ) {
    Object.entries(objMap).map(([k, v]: [string, any]) => {
      v.forEach((item: any) => {
        subscribe.call(this, {
          ...item,
          scope: Object.getPrototypeOf(object).constructor.name,
          callback(data: any) {
            object[k](data.payload);
          },
        });
      });
    });
  }

  logging = () => {
    console.log(this.events);
  };
}
