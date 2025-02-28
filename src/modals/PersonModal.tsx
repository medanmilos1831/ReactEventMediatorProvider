import { Modal } from 'antd';
import { useState } from 'react';
import { subscribe } from './../eventService/event.service';

export const PersonModal = (props: any) => {
  const [open, setOpen] = useState(false);
  subscribe('openPersonModal', (data) => {
    console.log('data', data);
  });
  return (
    <Modal title="Ant Design Modal" open={open}>
      <p>Ovo je sadržaj modala.</p>
    </Modal>
  );
};
