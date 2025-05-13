import { Button } from 'antd';
import { dispatch, logging, subscribe } from '../event-pulse';

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
