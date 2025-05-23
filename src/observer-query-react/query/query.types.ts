export interface IQuery {
  name: string;
  data: any;
  queryPromise: () => Promise<any>;
  dependencies: string;
  isLoading: boolean;
  isError: any;
  error: any;
  config: IQueryObserverConfig;
}

export interface IQueryManager {
  queryPromiseFn: any;
  initializeQuery(params: IQueryObserver): IQuery;
}

export interface IQueryObserver {
  name: IQuery['name'];
  queryPromise: IQuery['queryPromise'];
  dependencies: any[];
  config?: IQueryObserverConfig;
}

export interface IQueryObserverConfig {
  enabled?: boolean;
}
