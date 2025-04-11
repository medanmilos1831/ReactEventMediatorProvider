import { useEffect, useState } from 'react';
import { dispatch, subscribe } from '../event-pulse';
import { ComponentOne } from './components/ComponentOne';
import { user } from '../modules/user.module';
const HomePage = () => {
  let [state, setState] = useState(0);
  useEffect(() => {
    let r = subscribe({
      scope: 'user',
      eventName: 'pera',
      callback(data) {
        console.log('UI pera home');
      },
    });
    console.log('r', r);
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
            scope: 'User',
            dispatch: {
              eventName: 'fetchUser',
              payload: {
                id: 1,
              },
            },
          });
          dispatch({
            scope: 'user',
            dispatch: {
              eventName: 'pera',
              payload: {
                id: 1,
              },
            },
          });
        }}
      >
        click me
      </button>
      <button
        onClick={() => {
          user.setSomeData('medan');
        }}
      >
        set some data
      </button>
      {/* <ComponentOne /> */}
    </div>
  );
};

export { HomePage };
