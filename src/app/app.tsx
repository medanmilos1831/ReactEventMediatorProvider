import { useState } from 'react';
import { configEventManager, logging } from '../event-pulse';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
configEventManager({
  logger: false,
});
// new ApiModule();

export const App = () => {
  const [page, setPage] = useState('home');
  // if (page === 'about') {
  //   return <AboutPage />;
  // }
  // return <HomePage />;
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setPage('home');
          }}
        >
          home
        </button>
        <button
          onClick={() => {
            setPage('about');
          }}
        >
          about
        </button>
      </div>
      <div>{page === 'home' ? <HomePage /> : <AboutPage />}</div>
      <button
        onClick={() => {
          logging();
        }}
      >
        logging
      </button>
    </div>
  );
};
