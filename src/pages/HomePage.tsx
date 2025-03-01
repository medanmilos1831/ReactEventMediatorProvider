import { PersonModal } from '../modals/PersonModal';
import { One } from './components/One';
import { Three } from './components/Three';
import { Two } from './components/Two';
import {
  dispatch,
  subscribe,
  logHub,
  eventScope,
  eventInterceptor,
} from '../event-pulse';
import { Button, Space } from 'antd';

const HomePage = () => {
  subscribe('pera', (data) => {
    console.log('PERA', data);
  });
  eventInterceptor(
    ({ eventPayload }) => {
      return {
        ...eventPayload,
        e: 'pera',
      };
    },
    {
      eventName: 'pera',
    }
  );
  eventScope('person').eventInterceptor(
    ({ eventPayload }) => {
      return {
        ...eventPayload,
        city: 'Beograd',
      };
    },
    {
      eventName: 'pera',
    }
  );
  eventScope('person').subscribe('pera', (data) => {
    console.log('PERSONS - PERA', data);
  });
  eventScope('person')
    .eventScope('men')
    .subscribe('pera', (data) => {
      console.log('PERSONS - men -PERA', data);
    });
  // eventScope('nested')
  //   .eventScope('nested1')
  //   .subscribe('nest', (data) => {
  //     console.log('nested => nested1', data);
  //   });
  // eventScope('nested')
  //   .eventScope('nested12')
  //   .subscribe('nest', (data) => {
  //     console.log('nested => nested12', data);
  //   });
  // eventScope('nested')
  //   .eventScope('nested1')
  //   .eventScope('nested2')
  //   .subscribe('nest', () => {
  //     console.log('nested => nested1 => nested2');
  //   });

  // eventScope('nested').subscribe('nest', () => {
  //   console.log('nested');
  // });
  // eventScope('nested').subscribe('*', () => {
  //   console.log('sve sto je pod nested treba da se ovo desi');
  // });
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
            eventName: 'pera',
            payload: {
              counter: 1,
            },
          });
        }}
      >
        e and inter
      </Button>
      <Button
        type="primary"
        onClick={() => {
          eventScope('person').dispatch({
            eventName: 'pera',
            payload: {
              age: 20,
            },
          });
        }}
      >
        e and inter modle person
      </Button>
      <Button
        type="primary"
        onClick={() => {
          eventScope('person')
            .eventScope('men')
            .dispatch({
              eventName: 'pera',
              payload: {
                age: 20,
                car: 'audi',
              },
            });
        }}
      >
        e and inter modle person me
      </Button>
      {/* <Button
        type="primary"
        onClick={() => {
          eventScope('nested')
            .eventScope('nested12')
            .dispatch({
              eventName: 'nest',
              payload: {
                scope: 'nested => nested12',
                data: '12',
              },
            });
        }}
      >
        {`nested => nested12`}
      </Button>
      <Button
        type="primary"
        onClick={() => {
          eventScope('nested')
            .eventScope('nested1')
            .dispatch({
              eventName: 'nest',
              payload: {
                scope: 'global',
                data: '0',
              },
            });
        }}
      >
        {`nested => nested1`}
      </Button>
      <Button
        type="primary"
        onClick={() => {
          eventScope('nested')
            .eventScope('nested1')
            .eventScope('nested2')
            .dispatch({
              eventName: 'nest',
              payload: {
                scope: 'global',
                data: '0',
              },
            });
        }}
      >
        {`nested => nested1 => nested2`}
      </Button>
      <Button
        type="primary"
        onClick={() => {
          eventScope('nested').dispatch({
            eventName: 'nest',
            payload: {
              scope: 'global',
              data: '0',
            },
          });
        }}
      >
        {`nested`}
      </Button>
      <Button
        type="primary"
        onClick={() => {
          eventScope('nested').dispatch({
            eventName: 'pera',
            payload: {
              scope: 'global',
              data: '0',
            },
          });
        }}
      >
        {`nested`} novi
      </Button> */}
    </div>
  );
};

export { HomePage };
