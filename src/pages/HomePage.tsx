import { useState } from 'react';
import { EventMediorProvider, useNotify } from '../context';
import { Col, Modal, Row } from 'antd';
import { PersonModal } from '../modals/PersonModal';
import { CompanyModal } from '../modals/CompanyModal';
import { SideBar, TableWrapper } from '../components';
import { useGetState } from '../context/Store';
import { useMutateState } from '../context/Store/EventMediorStoreProvider';

const HomePage = () => {
  const [counter, setCounter] = useState(0);
  const { state } = useGetState({
    moduleName: 'counterModule',
    getter: 'getCounter',
    dep: ['pera'],
  });
  const dis = useMutateState();
  console.log('state', state);
  // const emit = useNotify();
  return (
    <>
      {/* dasdaasdas */}
      <button
        onClick={() => {
          dis({
            event: 'pera',
            moduleName: 'counterModule',
            mutation: 'inc',
            payload: 1,
          });
        }}
      >
        clik
      </button>
      {/* <TableWrapper /> */}
    </>
  );
};

export { HomePage };
