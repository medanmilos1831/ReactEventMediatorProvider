import { Button } from 'antd';
import { useEffect } from 'react';
import { dispatch, subscribe, eventInterceptor, logging } from '../event-pulse';

export default function HomePage() {
  let r = subscribe({
    scope: 'someScope:one',
    eventName: 'someEvent',
    callback(data) {
      console.log('events callback', data);
      // logging();
    },
  });

  eventInterceptor({
    // scope: 'someScope:onepera',
    eventName: 'someEvent',
    callback(data) {
      console.log('data', data);
      return 2;
    },
  });

  logging();
  // useEffect(() => {
  //   subscribe({
  //     scope: 'someScope:one',
  //     eventName: 'someEvent',
  //     callback(data) {
  //       console.log('events callback');
  //       // logging();
  //     },
  //   });
  //   logging();
  // }, []);
  return (
    <div>
      <h1>Home page</h1>
      <br />
      <Button
        onClick={() => {
          dispatch({
            scope: 'someScope:one',
            eventName: 'someEvent',
            payload: 1,
          });
        }}
        type="primary"
      >
        click me
      </Button>
      <Button
        onClick={() => {
          r();
          // dispatch({
          //   scope: 'someScope:one',
          //   eventName: 'someEvent',
          //   payload: 1,
          // });
        }}
        type="primary"
      >
        unsubscribe
      </Button>
    </div>
  );
}
