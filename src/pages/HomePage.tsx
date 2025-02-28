import { PersonModal } from '../modals/PersonModal';
import { One } from './components/One';
import { Three } from './components/Three';
import { Two } from './components/Two';
import { eventScope, dispatch, subscribe, logHub } from '../event-pulse';
import { Button, Space } from 'antd';

const HomePage = () => {
  subscribe('*', (data: any) => {
    console.log('GLOBAL EVENT GLOBAL SCOPE', data);
  });
  subscribe('globalEventOne', (data: any) => {
    console.log('GLOBAL EVENT ONE GLOBAL SCOPE', data);
  });
  eventScope('nested').subscribe('*', (data: any) => {
    console.log('GLOBAL EVENT NESTED SCOPE', data);
  });
  eventScope('nested').subscribe('globalEventOne', (data: any) => {
    console.log('GLOBAL EVENT ONE NESTED SCOPE', data);
  });
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>Home page</h1>
      <Button
        type="primary"
        onClick={() => {
          logHub();
        }}
      >
        LOG HUB
      </Button>
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            eventName: 'someGlobalEvent',
            payload: {
              scope: 'global',
              data: '0',
            },
          });
        }}
      >
        GLOBAL EVENT GLOBAL SCOPE
      </Button>
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            eventName: 'globalEventOne',
            payload: {
              scope: 'global',
              data: '1',
            },
          });
        }}
      >
        GLOBAL EVENT ONE GLOBAL SCOPE
      </Button>
      {/*  */}
      <Button
        type="primary"
        onClick={() => {
          eventScope('nested').dispatch({
            eventName: 'someGlobalEvent',
            payload: {
              scope: 'global',
              data: '0',
            },
          });
        }}
      >
        GLOBAL EVENT NESTED SCOPE
      </Button>
      <Button
        type="primary"
        onClick={() => {
          eventScope('nested').dispatch({
            eventName: 'globalEventOne',
            payload: {
              scope: 'global',
              data: '1',
            },
          });
        }}
      >
        GLOBAL EVENT ONE NESTED SCOPE
      </Button>
    </div>
  );
};

export { HomePage };
