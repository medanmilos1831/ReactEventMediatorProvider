import { dispatch } from 'scoped-observer';
import { hash } from '../EventScope';
import { Query } from './Query';
import { IQuery, IQueryObserver } from './query.types';
export class QueryManager {
  async queryPromiseFn(
    { queryPromise, config, dependencies }: IQueryObserver,
    query: IQuery
  ) {
    try {
      query.isLoading = true;
      query.queryPromise = queryPromise;
      query.dependencies = JSON.stringify(dependencies);
      query.config = {
        ...query.config,
        ...config,
      };
      const result = await query.queryPromise();
      query.data = result.data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      query.isLoading = false;
      dispatch({
        scope: hash,
        eventName: query.name,
        payload: query,
      });
    }
  }

  initializeQuery(params: IQueryObserver) {
    return new Query(params);
  }
}

const queryManager = new QueryManager();

export { queryManager };
