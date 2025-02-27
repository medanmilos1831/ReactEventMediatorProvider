import { Button } from 'antd';
import { dispatch } from '../../eventService/event.service';

export const One = () => {
  return (
    <div>
      <Button
        onClick={() => {
          dispatch({
            eventName: 'openPersonModal',
            payload: {
              open: true,
            },
          });
        }}
      >
        click me
      </Button>
    </div>
  );
};
