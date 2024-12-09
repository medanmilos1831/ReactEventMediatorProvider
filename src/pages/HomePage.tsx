import { useState } from 'react';
import { EventMediorProvider, useNotify } from '../context';
import { Col, Modal, Row } from 'antd';
import { PersonModal } from '../modals/PersonModal';
import { CompanyModal } from '../modals/CompanyModal';
import { SideBar, TableWrapper } from '../components';
import { useGetState } from '../context/Store';

const HomePage = () => {
  const emit = useNotify();
  const [counter, setCounter] = useState(0);
  useGetState({
    moduleName: 'counterModule',
    getter: 'getCounter',
    dep: 'pera',
  });
  return <></>;
};

export { HomePage };
