import { configEventManager } from '../event-pulse';
import { HomePage } from '../pages/HomePage';
configEventManager({
  logger: false,
});

export const App = () => {
  return <HomePage />;
};
