export interface IObserver {
  subscribe(params: subscribeType): () => void;
  notify(params: notifyType): any;
}

export type shouldUpdateType = boolean | ((payload: any) => boolean);

export type subscribeType = {
  event: string;
  callback: Function;
  shouldUpdate: shouldUpdateType;
};
export type notifyType = {
  event: string;
  payload: any;
  config?: {
    eventType: 'storeMutation' | 'eventSignal';
  };
};

// STORE TYPES
export interface ModuleType<T = unknown> {
  moduleName: string;
  state: T;
  mutation?: { [key: string]: (this: T, args: any) => void };
  getters?: { [key: string]: (this: T) => any } | undefined;
}
// END :: STORE TYPES
