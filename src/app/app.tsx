import { RouterProvider } from 'react-router-dom';
import { configEventManager } from '../event-pulse';
import { router } from '../router/router';
configEventManager({
  logger: false,
});

export const App = () => {
  return (
    <>
      <RouterProvider router={router()} />
    </>
  );
};
