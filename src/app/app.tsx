import { useState } from 'react';
import { configEventManager, logging } from '../event-pulse';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
configEventManager({
  logger: false,
});

export const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};
