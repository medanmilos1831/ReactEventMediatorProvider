import { ModuleType } from '../context/types';
import { EventMediorProvider, EventMediorStoreProvider } from '../context';
import { HomePage } from '../pages/HomePage';

interface ICounter {
  counter: number;
}
interface IPerson {
  fname: string;
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
              inc() {
                this;
              },
            },
            getters: {
              getCounter() {
                console.log('counterModule', this.counter);
                // this;
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
