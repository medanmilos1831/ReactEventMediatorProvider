import HomePage from '../pages/HomePage';
import { configEventManager } from '../scoped-observer';
import { generateStore } from 'scoped-observer-store-react';
configEventManager({
  logger: false,
});

generateStore({
  counter: {
    data: {
      counter: 1,
    },
    mutations: {
      updateCounter(param) {
        this.counter = this.counter + param;
      },
    },
    getters: {
      getCounter() {
        return this.counter;
      },
    },
  },
});

export const App = () => {
  return <HomePage />;
};
