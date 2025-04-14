import { useEffect, useState } from 'react';
import { dispatch, subscribe, logging } from '../event-pulse';
import { ComponentOne } from './components/ComponentOne';
import { user } from '../modules/user.module';
const HomePage = () => {
  useEffect(() => {
    subscribe({
      eventName: 'pera',
      callback(data) {
        // execute on event;
      },
    });
    logging();
    return () => {};
  }, []);
  return (
    <div>
      <h1>home page</h1>
    </div>
  );
};

export { HomePage };
