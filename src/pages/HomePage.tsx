import { useState } from 'react';
import { EventMediorProvider, useNotify } from '../context';
import { Col, Modal, Row } from 'antd';
import { PersonModal } from '../modals/PersonModal';
import { CompanyModal } from '../modals/CompanyModal';
import { SideBar, TableWrapper } from '../components';

const HomePage = () => {
  const emit = useNotify();
  const [counter, setCounter] = useState(0);
  return (
    <>
      <h1>HomePage</h1>
      <EventMediorProvider.Subscriber
        event="personModal"
        // shouldUpdate={(param) => {
        //   console.log('param', param);
        //   if (param.open === true) {
        //     return true;
        //   }
        //   return false;
        // }}
      >
        {({ payload, event }) => {
          console.log('payload', payload);
          return (
            <Modal
              open={payload?.open}
              onCancel={() => {
                emit(event, {
                  open: false,
                });
              }}
              onOk={() => {
                emit('companyModal', {
                  open: true,
                });
              }}
            >
              <PersonModal {...(payload?.props ?? {})} />
            </Modal>
          );
        }}
      </EventMediorProvider.Subscriber>
      <EventMediorProvider.Subscriber event="companyModal">
        {({ payload }) => {
          return (
            <Modal
              open={payload?.open}
              onCancel={() => {
                emit('companyModal', {
                  open: false,
                });
              }}
            >
              <CompanyModal {...(payload?.props ?? {})} />
            </Modal>
          );
        }}
      </EventMediorProvider.Subscriber>
      <button
        onClick={() => {
          emit('personModal', {
            open: true,
            props: {
              fname: 'Milos',
            },
          });
        }}
      >
        OPEN PERSON MODAL
      </button>

      <button
        onClick={() => {
          emit('companyModal', {
            open: true,
            props: {
              companyName: 'Sony',
            },
          });
        }}
      >
        OPEN COMPANY MODAL
      </button>

      <button
        onClick={() => {
          setCounter((prev) => prev + 1);
        }}
      >
        counter {counter}
      </button>
      <Row>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={20}>
          <TableWrapper />
        </Col>
      </Row>
    </>
  );
};

export { HomePage };
