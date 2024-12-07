export interface IObserver {
  subscribe(event: string, setPayload: Function): () => void;
  notify(event: string, payload: any): any;
}
