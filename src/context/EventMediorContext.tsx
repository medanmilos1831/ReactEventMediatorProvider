import { createContext } from 'react';
import { IObserver } from './types';

const EventMediorContext = createContext<IObserver | undefined>(undefined);

export { EventMediorContext };
