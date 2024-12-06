import { Button } from 'antd';
import { useNotify } from '../context';

const SideBar = () => {
  const emit = useNotify();
  return (
    <>
      <div>
        <h1>Sidebar</h1>
      </div>
      <div>
        <Button
          type="primary"
          htmlType="button"
          onClick={() => {
            emit('pera', {
              fname: 'pera',
            });
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};
export { SideBar };
