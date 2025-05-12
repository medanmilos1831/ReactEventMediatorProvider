import { Button } from 'antd';
import { useEffect } from 'react';
import {
  dispatch,
  subscribe,
  eventInterceptor,
  logging,
  autoBindListeners,
} from '../event-pulse';

class Person {
  constructor() {
    autoBindListeners(this, {
      printFname: [
        {
          eventName: 'nekiEvent',
        },
      ],
    });
  }

  printFname() {
    console.log('print');
  }
}

new Person();

export default function HomePage() {
  let u = subscribe({
    eventName: 'someEvent',
    callback(data) {
      console.log('events callback', data);
    },
  });
  logging();
  return (
    <div>
      <h1>Home page</h1>
      <br />
      <Button
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
            scope: 'Person',
            eventName: 'nekiEvent',
            payload: 0,
          });
        }}
        type="primary"
      >
        click me person module
      </Button>
      <Button
        onClick={() => {
          u();
          logging();
        }}
        type="primary"
      >
        unsubscribe
      </Button>
    </div>
  );
}
