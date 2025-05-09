import HomePage from '../pages/HomePage';
import { configEventManager } from '../event-pulse';
configEventManager({
  logger: false,
});

export const App = () => {
  return <HomePage />;
};
