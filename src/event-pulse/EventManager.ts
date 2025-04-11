import { createElement, ReactNode } from 'react';
import { EventEntity } from './EventEntity';

export class EventManager {
  events = new EventEntity();
  logger: boolean = false;
  private log(type: 'dispatch' | 'subscribe', data: Record<string, any>) {
    if (this.logger) {
      console.group(`[EventManager] ${type.toUpperCase()}`);
      console.table(data);
      console.groupEnd();
    }
  }
  managerAction = ({
    scope,
    dispatch,
  }: {
    scope?: string;
    dispatch: {
      eventName: string; // The name of the event.
      payload?: any; // The payload to be sent with the event.
    };
  }) => {
    if (scope === 'global' || !scope) {
      this.log('dispatch', {
        Scope: 'GLOBAL',
        Event: dispatch.eventName,
        Payload: dispatch.payload ?? 'No Payload',
      });

      this.events.dispatch(dispatch);
      return;
    }
    let current = this.events;
    for (const item of scope.split(':')) {
      if (!current.scopedEvents[item]) {
        console.warn(`Scope "${scope}" does not exist.`);
        return;
      }
      current = current.scopedEvents[item];
    }

    this.log('dispatch', {
      Scope: scope,
      Event: dispatch.eventName,
      Payload: dispatch.payload ?? 'No Payload',
    });
    current.dispatch(dispatch);
  };

  managerSubscribe = ({
    scope,
    eventName,
    callback,
  }: {
    scope?: string;
    eventName: string;
    callback: (data: { payload: any }) => void;
  }) => {
    if (scope === 'global' || !scope) {
      return this.events.subscribe(eventName, callback);
    }
    let arr = scope.split(':');
    let currentLevel = this.events;
    let unsubscriber: (() => void) | undefined = undefined;

    arr.forEach((item, index) => {
      if (!currentLevel.scopedEvents[item]) {
        currentLevel.scopedEvents[item] = new EventEntity(item);
      }

      if (index === arr.length - 1) {
        unsubscriber = currentLevel.scopedEvents[item].subscribe(
          eventName,
          callback
        );
      }

      currentLevel = currentLevel.scopedEvents[item];
    });
    return unsubscriber!;
  };

  managerEventInterceptor = ({
    scope,
    eventName,
    callback,
  }: {
    scope?: string;
    eventName: string;
    callback: (data: { eventPayload: any }) => any;
  }) => {
    if (scope === 'global' || !scope) {
      this.events.eventInterceptor.interceptor(callback, { eventName });
      return;
    }

    let current = this.events;
    for (const item of scope.split(':')) {
      if (!current.scopedEvents[item]) {
        console.warn(`Scope "${scope}" does not exist.`);
        return;
      }
      current = current.scopedEvents[item];
    }

    current.eventInterceptor.interceptor(callback, { eventName });
  };

  configEventManager = (config: { logger: boolean }) => {
    this.logger = config.logger;
  };
}
