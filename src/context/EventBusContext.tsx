import { createContext } from 'react';
import { IObserver } from './types';

const EventBusContext = createContext<IObserver | undefined>(undefined);

export { EventBusContext };
