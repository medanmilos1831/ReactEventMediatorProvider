import {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { EventBusContext } from './EventBusContext';
import { Observer } from '../observer';

const EventBusProvider = ({ children }: PropsWithChildren) => {
  const [observer, _] = useState(init);
  function init() {
    return new Observer();
  }
  return (
    <EventBusContext.Provider value={observer}>
      {children}
    </EventBusContext.Provider>
  );
};

EventBusProvider.Subscriber = ({
  event,
  children,
}: {
  event: string;
  children: ({ payload, event }: any) => JSX.Element;
}) => {
  const observer = useContext(EventBusContext)!;
  const init = useRef<boolean | (() => void)>(false);
  const [payload, setPayload] = useState<any>(undefined);
  if (init.current === false) {
    init.current = observer.subscribe(event, setPayload);
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
  const observer = useContext(EventBusContext)!;
  return observer.notify;
}

function useSubscribe(event: string, callback: Function) {
  const observer = useContext(EventBusContext)!;
  useEffect(() => {
    let unsubscirbe = observer.subscribe(event, callback);
    return () => {
      unsubscirbe();
    };
  });
  return observer.notify;
}

export { EventBusProvider, useNotify, useSubscribe };
