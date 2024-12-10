import { PropsWithChildren, useContext, useRef, useState } from 'react';
import { EventMediorStoreContext } from './EventMediorStoreContext';
import { ModuleType } from '../types';
import { Store } from './Store';
import { useNotify, useSubscribe } from '../EventMediorProvider';

function EventMediorStoreProvider<T extends ModuleType<any>[]>({
  children,
  modules,
}: PropsWithChildren<{ modules: T }>) {
  const [store, _] = useState(init);
  function init() {
    return new Store(modules);
  }
  return (
    <EventMediorStoreContext.Provider value={store}>
      {children}
    </EventMediorStoreContext.Provider>
  );
}

const useGetState = (
  target: string,
  {
    events,
  }: {
    events: string[];
  }
) => {
  const { store } = useContext(EventMediorStoreContext);
  const [_, setState] = useState(0);
  const eventData = useRef<{
    moduleName: string | undefined;
    getter: string | undefined;
  }>({
    moduleName: undefined,
    getter: undefined,
  });
  useSubscribe(events, () => {
    const parts = target.split('/');
    const moduleName = parts[0];
    const getter = parts[1];
    eventData.current = {
      ...eventData.current,
      moduleName,
      getter,
    };
    setState((prev) => prev + 1);
  });
  const { moduleName, getter } = eventData.current;
  return {
    state:
      !moduleName || !getter
        ? undefined
        : store[moduleName].getters[getter].call(store[moduleName].state),
  };
};

const useMutateState = () => {
  const { store } = useContext(EventMediorStoreContext);
  const emit = useNotify();
  return (
    event: string,
    obj: {
      payload: any;
    }
  ) => {
    const parts = event.split('/');
    const moduleName = parts[0];
    const mutation = parts[1];
    const { payload } = obj;
    store[moduleName].mutation[mutation].call(store[moduleName].state, payload);

    if (event) {
      emit(event, undefined);
    }
  };
};

export { EventMediorStoreProvider, useGetState, useMutateState };
