import { PropsWithChildren, useContext, useState } from 'react';
import { EventMediorStoreContext } from './EventMediorStoreContext';
import { ModuleType } from '../types';
import { Store } from './Store';
import { useSubscribe } from '../EventMediorProvider';

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
  dep: string;
}) => {
  const { store } = useContext(EventMediorStoreContext);
  const [state, setState] = useState(undefined);
  useSubscribe(dep, () => {
    console.log('hehhehehhehe');
  });
  //   console.log('store', store);
  const item = store[moduleName].getters[getter].call(store[moduleName].state);
  console.log('item', item);
  return {
    state,
  };
};

export { EventMediorStoreProvider, useGetState };
