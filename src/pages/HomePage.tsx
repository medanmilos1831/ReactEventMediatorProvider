import { useEffect, useState } from 'react';
import { dispatch, subscribe } from '../event-pulse';
import { ComponentOne } from './components/ComponentOne';
const HomePage = () => {
  let [d, e] = useState();
  useEffect(() => {
    let r = subscribe({
      scope: 'person:zile',
      eventName: 'pera',
      callback(data) {
        e(data.payload);
        console.log('usao sam obde', data);
      },
    });
    return () => {
      r();
    };
  }, []);
  return (
    <div>
      <h1>home page</h1>
      <button
        onClick={() => {
          dispatch({
            scope: 'person:zile',
            dispatch: {
              eventName: 'pera',
              payload: 1,
            },
          });
        }}
      >
        click me
      </button>
      <ComponentOne />
    </div>
  );
};

export { HomePage };
