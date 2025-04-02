import { configEventManager } from '../event-pulse';
import { HomePage } from '../pages/HomePage';

export const App = configEventManager(
  () => {
    return <HomePage />;
  },
  {
    logger: false,
  }
);
