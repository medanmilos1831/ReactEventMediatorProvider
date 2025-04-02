import { dispatch, eventInterceptor, subscribe } from '../event-pulse';
import { ComponentOne } from './components/ComponentOne';
const HomePage = () => {
  subscribe({
    scope: 'person:zile',
    eventName: 'pera',
    callback(data) {
      console.log('usao sam obde', data);
    },
  });
  eventInterceptor({
    scope: 'person:zile',
    eventName: 'pera',
    callback(data) {
      console.log('PRESRETAC', data.eventPayload);
      return {
        ppayload: data.eventPayload,
        fname: 'Milos',
      };
      // console.log('samo', data);
    },
  });
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
