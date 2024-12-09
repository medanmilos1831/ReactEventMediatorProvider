import { PropsWithChildren, useContext, useState } from 'react';
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

const useGetState = ({
  moduleName,
  getter,
  dep,
}: {
  moduleName: string;
  getter: string;
  dep: string[];
}) => {
  const { store } = useContext(EventMediorStoreContext);
  const [_, setState] = useState(0);
  useSubscribe(dep, (data: any) => {
    setState((prev) => prev + 1);
  });
  return {
    state: store[moduleName].getters[getter].call(store[moduleName].state),
  };
};

const useMutateState = () => {
  const { store } = useContext(EventMediorStoreContext);
  const emit = useNotify();
  return (obj: {
    event?: string;
    payload: any;
    moduleName: string;
    mutation: string;
  }) => {
    const { moduleName, mutation, payload, event } = obj;
    store[moduleName].mutation[mutation].call(store[moduleName].state, payload);
    if (event) {
      emit(event, undefined);
    }
  };
};

export { EventMediorStoreProvider, useGetState, useMutateState };
