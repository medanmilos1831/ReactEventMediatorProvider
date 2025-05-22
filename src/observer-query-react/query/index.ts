import { useEffect, useRef, useState } from 'react';
import { subscribe } from 'scoped-observer';
import { EventScope } from '../EventScope';
import { QueryManager } from './QueryManager';
const { hash } = new EventScope();
const queryManager = new QueryManager(hash);

function useQueryObserver({ name, queryPromise, dependencies = [] }: any) {
  const init = useRef(true);
  const [query, setQuery] = useState<any>(() =>
    queryManager.initializeQuery({
      name,
      queryPromise,
      dependencies,
    })
  );

  useEffect(() => {
    const unsubscribe = subscribe({
      scope: hash,
      eventName: name,
      callback({ payload }) {
        setQuery({ ...payload });
      },
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (init.current) {
    queryManager.queryPromiseFn(query);
  }

  if (!init.current && JSON.stringify(dependencies) != query.dependencies) {
    query.isLoading = true;
    query.dependencies = JSON.stringify(dependencies);
    query.queryPromise = queryPromise;
    queryManager.queryPromiseFn(query);
  }

  init.current = false;

  return query;
}

export { queryManager, useQueryObserver };
