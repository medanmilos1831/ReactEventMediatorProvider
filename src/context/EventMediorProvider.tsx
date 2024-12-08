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
  event: string[];
  children: ({ payload, event }: any) => JSX.Element;
  shouldUpdate?: shouldUpdateType;
}) => {
  const observer = useContext(EventMediorContext)!;
  const init = useRef<(boolean | (() => void))[]>(
    Array(event.length).fill(false)
  );
  const [_, render] = useState<number>(0);
  const payload = useRef<any>({
    payload: undefined,
    event: undefined,
  });
  const activeEvent = useRef<any>(undefined);
  event.forEach((event, index) => {
    if (init.current[index] === false) {
      init.current[index] = observer.subscribe(
        event,
        (eventDetail: any) => {
          payload.current = {
            ...payload.current,
            ...eventDetail,
          };
          render((prev) => prev + 1);
        },
        shouldUpdate
      );
    }
  });

  useEffect(() => {
    return () => {
      init.current.forEach((item) => {
        (item as () => void)();
      });
    };
  }, []);
  return (
    <>
      {children({
        ...payload.current,
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
