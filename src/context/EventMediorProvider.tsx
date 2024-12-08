import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Observer } from './observer';
import { EventMediorContext } from './EventMediorContext';
import { shouldUpdateType } from './types';

const EventMediorProvider = ({ children }: PropsWithChildren) => {
  const [observer, _] = useState(init);
  function init() {
    return new Observer();
  }
  return (
    <EventMediorContext.Provider value={observer}>
      {children}
    </EventMediorContext.Provider>
  );
};

EventMediorProvider.Subscriber = ({
  event,
  children,
  shouldUpdate = true,
}: {
  event: string;
  children: ({ payload, event }: any) => JSX.Element;
  shouldUpdate?: shouldUpdateType;
}) => {
  const observer = useContext(EventMediorContext)!;
  const init = useRef<boolean | (() => void)>(false);
  const [payload, setPayload] = useState<any>(undefined);
  if (init.current === false) {
    init.current = observer.subscribe(event, setPayload, shouldUpdate);
  }

  useEffect(() => {
    return () => {
      (init.current as () => void)();
    };
  }, []);
  return (
    <>
      {children({
        payload,
        event,
      })}
    </>
  );
};

function useNotify() {
  const observer = useContext(EventMediorContext)!;
  return observer.notify;
}

function useSubscribe(event: string, callback: Function) {
  const observer = useContext(EventMediorContext)!;
  useEffect(() => {
    let unsubscirbe = observer.subscribe(event, callback, true);
    return () => {
      unsubscirbe();
    };
  });
  return observer.notify;
}

export { EventMediorProvider, useNotify, useSubscribe };
