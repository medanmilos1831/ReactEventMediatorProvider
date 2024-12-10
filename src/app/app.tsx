import { ModuleType } from '../context/types';
import { EventMediorProvider, EventMediorStoreProvider } from '../context';
import { HomePage } from '../pages/HomePage';

interface ICounter {
  counter: number;
}

export function App() {
  return (
    <EventMediorProvider>
      <EventMediorStoreProvider<[ModuleType<ICounter>]>
        modules={[
          {
            moduleName: 'counterModule',
            state: {
              counter: 0,
            },
            mutation: {
              inc(payload: any) {
                this.counter = this.counter + payload;
              },
              dec(payload: any) {
                this.counter = this.counter - payload;
              },
            },
            getters: {
              getCounter() {
                return this.counter;
              },
            },
          },
        ]}
      >
        <HomePage />
      </EventMediorStoreProvider>
    </EventMediorProvider>
  );
}
