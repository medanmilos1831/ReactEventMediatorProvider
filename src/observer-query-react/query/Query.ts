import { IQuery, IQueryObserver } from './query.types';

export class Query {
  name!: string;
  data = undefined;
  queryPromise!: any;
  dependencies!: any;
  isLoading = true;
  isError = false;
  error = undefined;
  config = {
    enabled: true,
  };

  constructor({ name, dependencies, queryPromise, config }: IQueryObserver) {
    this.config = {
      ...this.config,
      ...config,
    };
    this.name = name;
    this.dependencies = '';
    this.queryPromise = queryPromise;
    this.isLoading = this.config.enabled;
  }
}
