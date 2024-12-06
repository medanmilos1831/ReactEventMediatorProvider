export interface IObserver {
  subscribe(event: string, setPayload: any): () => void;
  notify(event: string, payload: any): any;
}
