import { PersonModal } from '../modals/PersonModal';
import { One } from './components/One';
import { Three } from './components/Three';
import { Two } from './components/Two';
import { eventScope, dispatch, subscribe } from '../event-pulse';

const HomePage = () => {
  subscribe('person', (data: any) => {
    console.log('this is modal scope', data);
  });
  eventScope('user').subscribe('person', (data: any) => {
    console.log('this is user scope', data);
  });
  eventScope('modal').subscribe('person', (data: any) => {
    console.log('this is modal scope', data);
  });
  eventScope('modal')
    .eventScope('mile')
    .subscribe('person', (data: any) => {
      console.log('this is modal mile scope', data);
    });
  return (
    <>
      <h1>Home page</h1>
      <button
        onClick={() => {
          eventScope('user').dispatch({
            eventName: 'person',
            payload: {
              fname: 'this is user scope payload',
            },
          });
        }}
      >
        user scope
      </button>
      <button
        onClick={() => {
          eventScope('modal').dispatch({
            eventName: 'person',
            payload: {
              fname: 'this is modal scope payload',
            },
          });
        }}
      >
        modal scope
      </button>
      <button
        onClick={() => {
          eventScope('modal')
            .eventScope('mile')
            .dispatch({
              eventName: 'person',
              payload: {
                fname: 'this is modal mile scope payload',
              },
            });
        }}
      >
        modal mile scope
      </button>
      <button
        onClick={() => {
          dispatch({
            eventName: 'person',
            payload: {
              fname: 'GLOBAL scope',
            },
          });
        }}
      >
        global
      </button>
      <PersonModal />
      <One />
      <Two />
      <Three />
    </>
  );
};

export { HomePage };
