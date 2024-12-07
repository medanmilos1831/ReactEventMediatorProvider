import { EventMediorProvider } from '../context';
import { HomePage } from '../pages/HomePage';

export function App() {
  return (
    <EventMediorProvider>
      <HomePage />
    </EventMediorProvider>
  );
}
