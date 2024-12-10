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
  const { state } = useGetState('counterModule/getCounter', {
    events: ['counterModule/inc', 'counterModule/dec'],
  });
  const dispatch = useMutateState();
  return (
    <>
      <button
        onClick={() => {
          dispatch('counterModule/inc', {
            payload: 1,
          });
        }}
      >
        inc
      </button>
      <button
        onClick={() => {
          dispatch('counterModule/dec', {
            payload: 1,
          });
        }}
      >
        dec
      </button>
      {state && state}
    </>
  );
};

export { HomePage };
