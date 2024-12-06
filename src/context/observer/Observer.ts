import { IObserver } from '../types';

export class Observer extends EventTarget implements IObserver {
  constructor() {
    super();
  }
  notify = (event: string, payload: any) => {
    const target = new CustomEvent(event, {
      detail: payload,
    });
    this.dispatchEvent(target);
  };
  subscribe(event: string, setPayload: Function) {
    let listener = (e: any) => {
      setPayload(e.detail);
    };
    this.addEventListener(event, listener);
    return () => {
      this.removeEventListener(event, listener);
    };
  }
}
