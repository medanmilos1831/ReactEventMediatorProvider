import HomePage from '../pages/HomePage';
import { configEventManager } from '../scoped-observer';
configEventManager({
  logger: false,
});

export const App = () => {
  return <HomePage />;
};
