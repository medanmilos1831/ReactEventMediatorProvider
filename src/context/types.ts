export interface IObserver {
  subscribe(params: subscribeType): () => void;
  notify(params: eventDetail): any;
}

export type shouldUpdateType =
  | boolean
  | ((eventDetail: eventDetail) => boolean);

export type subscribeType = {
  event: string;
  callback: Function;
  shouldUpdate: shouldUpdateType;
};

type event = {
  event: string | undefined;
  payload: any;
};
export type notify = event & {
  config?: {
    eventType: `${EVENTS_TYPE}` | string;
  };
};

export type eventDetail = event & {
  config:
    | {
        eventType: `${EVENTS_TYPE}` | string;
      }
    | undefined;
};

// STORE TYPES
export interface ModuleType<T = unknown> {
  moduleName: string;
  state: T;
  mutation?: { [key: string]: (this: T, args: any) => void };
  getters?: { [key: string]: (this: T) => any } | undefined;
}
// END :: STORE TYPES

export enum EVENTS_TYPE {
  SIGNAL_EVENT = 'signal_event',
  STORE_MUTATION_EVENT = 'store_mutation_event',
}
