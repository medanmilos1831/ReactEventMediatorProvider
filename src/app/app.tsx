import { EventBusProvider } from '../context';
import { HomePage } from '../pages/HomePage';

export function App() {
  return (
    <EventBusProvider>
      <HomePage />
    </EventBusProvider>
  );
}
