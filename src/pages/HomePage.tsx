import { Button } from 'antd';
import { dispatch, logging, subscribe } from '../scoped-observer';

export default function HomePage() {
  const unsubscribe = subscribe({
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
      </Button>
    </div>
  );
}
