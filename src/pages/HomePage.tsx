import { useState } from 'react';
import { EventMediorProvider, useNotify, useSubscribe } from '../context';
import { Col, Modal, Row } from 'antd';
import { PersonModal } from '../modals/PersonModal';
import { CompanyModal } from '../modals/CompanyModal';
import { SideBar, TableWrapper } from '../components';
import { useGetState } from '../context/Store';
import { useMutateState } from '../context/Store/EventMediorStoreProvider';

const SideBarFilter = () => {
  const emit = useNotify();
  function emiter(payload: number) {
    emit({
      event: 'choseNumber',
      payload,
    });
  }
  return (
    <div
      style={{
        border: '1px solid red',
      }}
    >
      <span>Choose Number</span>
      <button
        onClick={() => {
          emiter(1);
        }}
      >
        1
      </button>
      <button
        onClick={() => {
          emiter(2);
        }}
      >
        2
      </button>
      <button
        onClick={() => {
          emiter(3);
        }}
      >
        3
      </button>
      <button
        onClick={() => {
          emiter(4);
        }}
      >
        4
      </button>
      <button
        onClick={() => {
          emiter(5);
        }}
      >
        5
      </button>
    </div>
  );
};
const Wrapper = () => {
  useSubscribe(
    (obj) => {
      console.log('obj', obj);
    },
    ['choseNumber']
  );
  return (
    <>
      <span>My wrapper</span>
      {/* <EventMediorProvider.Subscriber
        event={['choseNumber']}
        shouldUpdate={({ payload }) => {
          return payload === 2 || payload === 4;
        }}
      >
        {({ payload }) => {
          return (
            <>
              <span>{payload ?? 0}</span>
            </>
          );
        }}
      </EventMediorProvider.Subscriber> */}
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <SideBarFilter />
      <Wrapper />
    </>
  );
};

export { HomePage };
