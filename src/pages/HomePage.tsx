import { Modal } from 'antd';
import {
  EventToggleManagerWrapper,
  eventToggleHandler,
} from 'scoped-observer-toggle-manager-react';

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
                });
              }}
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
