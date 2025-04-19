import { Drawer as ANTDDrawer, DrawerProps } from 'antd';
import { ON_OFF_ENTITIES, STATUS_ENUM } from '../overlayManager/types';
import { OverlayController } from '../overlayManager/OverlayController';

type DrawerChildrenArg = {
  drawerPayload: any;
  onClose: () => void;
  status: STATUS_ENUM;
};

type DrawerPropsWithChildren = {
  drawerName: string;
  drawerProps?: (payload: any) => DrawerProps;
  children: React.ReactNode | ((args: DrawerChildrenArg) => React.ReactNode);
};

export const Drawer = ({
  drawerName: eventName,
  drawerProps,
  children,
}: DrawerPropsWithChildren) => {
  return (
    <OverlayController eventName={eventName} scope={ON_OFF_ENTITIES.DRAWER}>
      {({ changeStatus, data, status }) => {
        const props = drawerProps ? drawerProps(data) : {};
        return (
          <ANTDDrawer
            {...props}
            open={status === STATUS_ENUM.ON}
            onClose={() => {
              changeStatus(STATUS_ENUM.OFF);
            }}
            destroyOnClose
          >
            {typeof children === 'function'
              ? children({
                  drawerPayload: data,
                  onClose: () => changeStatus(STATUS_ENUM.OFF),
                  status,
                })
              : children}
          </ANTDDrawer>
        );
      }}
    </OverlayController>
  );
};
