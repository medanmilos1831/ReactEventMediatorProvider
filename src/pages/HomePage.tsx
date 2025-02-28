import { PersonModal } from '../modals/PersonModal';
import { One } from './components/One';
import { Three } from './components/Three';
import { Two } from './components/Two';

const HomePage = () => {
  return (
    <>
      <h1>Home page</h1>
      <PersonModal />
      <One />
      <Two />
      <Three />
    </>
  );
};

export { HomePage };
