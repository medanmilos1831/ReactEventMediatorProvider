import { OverlayController } from '../overlayManager/OverlayController';
import { Drawer } from '../drawer';
// import { Modal } from '../modal';
import { ModalOne } from '../modal/modals/ModalOne';
import { ComponentOne } from './components/ComponentOne';
import { Modal } from 'antd';

const HomePage = () => {
  return (
    <div>
      <h1>home page</h1>
      <OverlayController scope="modal" eventName="modalOne">
        {({ data, off, status }) => {
          return (
            <Modal
              open={status === 'on' ? true : false}
              onCancel={() => {
                off();
              }}
              destroyOnClose
            >
              <>some element</>
            </Modal>
          );
        }}
      </OverlayController>
      {/* <Modal
        modalName="modalOne"
        modalProps={(data: any) => {
          return {
            title: data?.id ? 'iame' : 'nema',
          };
        }}
      >
        <ModalOne fname={'John'}></ModalOne>
      </Modal>

      <Drawer drawerName={'drawerOne'}>
        {(props: any) => {
          return <>pera</>;
        }}
      </Drawer> */}
      <ComponentOne />
    </div>
  );
};

export { HomePage };
