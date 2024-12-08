import { IObserver, shouldUpdateType } from '../types';

export class Observer extends EventTarget implements IObserver {
  constructor() {
    super();
  }
  notify = (event: string, payload: any) => {
    const target = new CustomEvent(event, {
      detail: {
        payload,
        event,
      },
    });
    this.dispatchEvent(target);
  };
  subscribe(
    event: string,
    callback: (payload: any) => void,
    shouldUpdate: shouldUpdateType
  ) {
    let listener = (e: any) => {
      if (typeof shouldUpdate === 'boolean' && shouldUpdate) {
        callback(e.detail);
        return;
      }
      if (typeof shouldUpdate === 'function' && shouldUpdate(e.detail)) {
        callback(e.detail);
      }
    };
    this.addEventListener(event, listener);
    return () => {
      this.removeEventListener(event, listener);
    };
  }
}
