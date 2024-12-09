export interface IObserver {
  subscribe(
    event: string,
    callback: Function,
    shouldUpdate: shouldUpdateType
  ): () => void;
  notify(event: string, payload: any): any;
}

export type shouldUpdateType = boolean | ((payload: any) => boolean);

// STORE TYPES
export interface ModuleType<T = unknown> {
  moduleName: string;
  state: T;
  mutation?: { [key: string]: (this: T, args: any) => void };
  getters?: { [key: string]: (this: T) => any } | undefined;
}
// END :: STORE TYPES
