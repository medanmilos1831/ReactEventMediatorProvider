import { dispatch } from 'scoped-observer';
import { Query } from './Query';
export class QueryManager {
  hash!: string;
  constructor(hash: string) {
    this.hash = hash;
  }
  generateQuery(obj: any) {
    return new Query(obj, this.hash);
  }

  async queryPromiseFn(query: any) {
    try {
      const result = await query.queryPromise();
      query.data = result.data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      query.isLoading = false;
      dispatch({
        scope: query.hash,
        eventName: query.name,
        payload: query,
      });
    }
  }

  initializeQuery(params: any) {
    return new Query(params, this.hash);
  }
}
