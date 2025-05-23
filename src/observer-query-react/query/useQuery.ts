import { useEffect, useRef, useState } from 'react';
import { IQuery, IQueryObserver } from './query.types';
import { queryManager } from '.';
import { subscribe } from 'scoped-observer';
import { hash } from '../EventScope';

export function useQuery(params: IQueryObserver) {
  // const init = useRef(true);
  const [query, setQuery] = useState<IQuery>(() =>
    queryManager.initializeQuery(params)
  );

  useEffect(() => {
    const unsubscribe = subscribe({
      scope: hash,
      eventName: params.name,
      callback({ payload }) {
        setQuery({ ...payload });
      },
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!params.config?.enabled) {
    return query;
  }

  if (JSON.stringify(params.dependencies) != query.dependencies) {
    queryManager.queryPromiseFn(params, query);
  }

  return query;
}
