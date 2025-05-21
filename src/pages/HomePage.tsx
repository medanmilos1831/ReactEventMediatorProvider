import { Modal } from 'antd';
import {
  eventToggleHandler,
  EventToggleManagerWrapper,
} from '../EventToggleManager';
import { logging } from 'scoped-observer';

logging();
const DeepNestedComponent = () => {
  return (
    <>
      <button
        onClick={() => {
          eventToggleHandler({
            name: 'one',
            payload: 1,
          });
        }}
      >
        click me
      </button>
    </>
  );
};

const ModalComponent = () => {
  console.log('RENDER', logging());
  return <>ModalComponent</>;
};

export default function HomePage() {
  return (
    <div>
      <EventToggleManagerWrapper name="one">
        {({ status, payload, toggle }) => {
          return (
            <Modal
              open={status}
              onCancel={() => {
                toggle();
              }}
              onOk={() => {
                eventToggleHandler({
                  name: 'two',
                  payload: 2,
                });
              }}
            >
              <ModalComponent />
            </Modal>
          );
        }}
      </EventToggleManagerWrapper>
      <EventToggleManagerWrapper name="two">
        {({ status, payload, toggle }) => {
          return (
            <Modal
              open={status}
              onCancel={() => {
                toggle();
              }}
              onOk={() => {}}
            >
              <ModalComponent />
            </Modal>
          );
        }}
      </EventToggleManagerWrapper>
      <DeepNestedComponent />
    </div>
  );
}
