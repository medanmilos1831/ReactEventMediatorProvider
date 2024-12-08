export interface IObserver {
  subscribe(
    event: string,
    callback: Function,
    shouldUpdate: shouldUpdateType
  ): () => void;
  notify(event: string, payload: any): any;
}

export type shouldUpdateType = boolean | ((payload: any) => boolean);
