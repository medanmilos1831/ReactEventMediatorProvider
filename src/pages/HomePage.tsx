import { Modal } from 'antd';
import { toggleHandler, ToggleController } from '../EventToggleManager';
import { logging } from 'scoped-observer';

logging();
const DeepNestedComponent = () => {
  return (
    <>
      <button
        onClick={() => {
          toggleHandler({
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
      <ToggleController name="one" initStatus={true}>
        {({ status, payload, toggle }) => {
          return (
            <Modal
              open={status}
              onCancel={() => {
                toggle();
              }}
              onOk={() => {
                toggleHandler({
                  name: 'two',
                  payload: 2,
                });
              }}
            >
              <ModalComponent />
            </Modal>
          );
        }}
      </ToggleController>
      <ToggleController name="two">
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
      </ToggleController>
      <DeepNestedComponent />
    </div>
  );
}
