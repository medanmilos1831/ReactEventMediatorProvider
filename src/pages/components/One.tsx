import { Button } from 'antd';

export const One = () => {
  return (
    <div>
      <Button
        onClick={() => {
          // dispatch({
          //   eventName: 'openPersonModal',
          //   payload: {
          //     open: true,
          //   },
          // });
        }}
      >
        click me
      </Button>
    </div>
  );
};
