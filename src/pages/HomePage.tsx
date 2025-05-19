import { Button } from 'antd';
import { subscribe, dispatch, logging } from 'scoped-observer';
import { ModulesMap, mutate, useSubscribe } from 'scoped-observer-store-react';
type CounterData = {
  counter: number;
};

type StoreModules = ModulesMap<{
  counter: CounterData;
}>;
export default function HomePage() {
  // const unsubscribe = subscribe({
  //   eventName: 'someEvent',
  //   callback(data) {
  //     console.log('events callback', data);
  //   },
  // });
  // logging();
  const { result } = useSubscribe(
    (state: StoreModules) => {
      return state.counter.data.counter;
    },
    ['nekiEvent']
  );
  console.log('state', result);
  return (
    <div>
      <h1>Home page</h1>
      <br />
      <button
        onClick={() => {
          mutate(
            {
              scope: 'counter',
              commit: 'updateCounter',
              payload: 1,
            },
            ['nekiEvent']
          );
        }}
      >
        milos
      </button>
      {/* <Button
        onClick={() => {
          dispatch({
            eventName: 'someEvent',
            payload: 0,
          });
        }}
        type="primary"
      >
        click me
      </Button>
      <Button
        onClick={() => {
          dispatch({
            eventName: 'someEvent',
            payload: 0,
          });
        }}
        type="primary"
      >
        click me person module
      </Button>
      <Button
        onClick={() => {
          logging();
        }}
        type="primary"
      >
        unsubscribe
      </Button> */}
    </div>
  );
}
