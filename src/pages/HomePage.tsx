import { Modal } from 'antd';
import {
  EventToggleManagerWrapper,
  eventToggleHandler,
} from '../EventToggleManager';

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
      <EventToggleManagerWrapper name="two">
        {({ status, payload, toggle }) => {
          return (
            <Modal
              open={status}
              onCancel={() => {
                toggle();
              }}
              onOk={() => {
                console.log('okkkk');
              }}
            >
              <>
                <h1>Two modal</h1>
              </>
            </Modal>
          );
        }}
      </EventToggleManagerWrapper>
      <DeepNestedComponent />
      <button
        onClick={() => {
          eventToggleHandler({
            name: 'two',
          });
        }}
      >
        click me two
      </button>
    </div>
  );
}
