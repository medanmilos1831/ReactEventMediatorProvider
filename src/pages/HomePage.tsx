import { useState } from 'react';
import { EventMediorProvider, useNotify, useSubscribe } from '../context';
import { Col, Modal, Row } from 'antd';
import { PersonModal } from '../modals/PersonModal';
import { CompanyModal } from '../modals/CompanyModal';
import { SideBar, TableWrapper } from '../components';
import { useGetState } from '../context/Store';
import { useMutateState } from '../context/Store/EventMediorStoreProvider';

const HomePage = () => {
  const [counter, setCounter] = useState(0);
  const emit = useNotify();
  const dispatch = useMutateState();
  const { state } = useGetState('counterModule/getCounter', {
    events: ['counterModule/inc', 'counterModule/dec'],
  });
  useSubscribe((data) => {}, ['counterModule/inc']);
  return (
    <>
      <EventMediorProvider.Subscriber
        event={['counterModule/inc', 'counterModule/dec', 'zika']}
        shouldUpdate={false}
      >
        {({ event, payload, config }) => {
          return <>pera</>;
        }}
      </EventMediorProvider.Subscriber>
      <button
        onClick={() => {
          emit({
            event: 'pera',
            payload: 'ovo je neki payload',
            // config: {
            //   eventType: 'pera',
            // },
          });
        }}
      >
        rise pera event
      </button>
      <button
        onClick={() => {
          dispatch({
            event: 'counterModule/inc',
            payload: 1,
          });
        }}
      >
        inc
      </button>
      <button
        onClick={() => {
          dispatch({
            event: 'counterModule/dec',
            payload: 1,
          });
        }}
      >
        dec
      </button>
      <button
        onClick={() => {
          emit({
            event: 'zika',
            payload: 1,
          });
        }}
      >
        signal
      </button>
      {/* {state && state} */}
    </>
  );
};

export { HomePage };
