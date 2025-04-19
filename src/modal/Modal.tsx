import { Modal as ANTDModal, ModalProps } from 'antd';
import { OverlayController } from '../overlayManager/OverlayController';
import { ON_OFF_ENTITIES, STATUS_ENUM } from '../overlayManager/types';

type ModalChildrenArg = {
  modalPayload: any;
  onClose: () => void;
};

type ModalPropsWithChildren = {
  modalName: string;
  modalProps?: (payload: any) => ModalProps;
  children: React.ReactNode | ((args: ModalChildrenArg) => React.ReactNode);
};

export const Modal = ({
  modalName: eventName,
  modalProps,
  children,
}: ModalPropsWithChildren) => {
  return (
    <></>
    // <OverlayController eventName={eventName} scope={ON_OFF_ENTITIES.MODAL}>
    //   {({ data, changeStatus, status }) => {
    //     const props = modalProps ? modalProps(data) : {};
    //     return (
    //       <ANTDModal
    //         {...props}
    //         open={status === STATUS_ENUM.ON}
    //         onCancel={() => {
    //           changeStatus(STATUS_ENUM.OFF);
    //         }}
    //         destroyOnClose
    //       >
    //         {typeof children === 'function'
    //           ? children({
    //               modalPayload: data,
    //               onClose: () => changeStatus(STATUS_ENUM.OFF),
    //             })
    //           : children}
    //       </ANTDModal>
    //     );
    //   }}
    // </OverlayController>
  );
};
