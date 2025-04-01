import {
  dispatch,
  eventInterceptor,
  eventScope,
  logHub,
  subscribe,
  eventHub,
} from '../event-pulse';
import { ComponentOne } from './components/ComponentOne';
const HomePage = () => {
  logHub();
  eventScope('peraScoped').subscribe('pera', ({ payload }) => {
    console.log('helooooo', payload);
  });

  eventScope('peraScoped').eventInterceptor(
    (payload) => {
      return 10;
    },
    {
      eventName: 'pera',
    }
  );
  return (
    <div>
      <h1>home page</h1>
      <button
        onClick={() => {
          eventScope('peraScoped').dispatch({
            eventName: 'pera',
            payload: 1,
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
