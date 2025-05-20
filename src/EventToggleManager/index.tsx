import { useEffect, useState } from 'react';
import { dispatch, subscribe } from 'scoped-observer';
import { EventToggleManager } from './EventToggleManager';

const eventToggleManager = new EventToggleManager();

const OnOffManagerWrapper = ({
  name,
  children,
}: {
  name: string;
  children: (params: { status: boolean; payload: any }) => JSX.Element;
}) => {
  const [state, setState] = useState({
    status: false,
    payload: undefined,
  });
  const [__, _] = useState(init);
  function init() {
    eventToggleManager.addItem({
      [name]: state.status,
    });
  }
  useEffect(() => {
    const unsubscribe = subscribe({
      scope: `onOff:${name}`,
      eventName: 'updateStatus',
      callback(eventData: { payload: { status: boolean; data: any } }) {
        const { status, data } = eventData.payload;
        eventToggleManager.updateStatus(name, status);
        setState((prev) => {
          return {
            ...prev,
            status,
            payload: data,
          };
        });
      },
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <>{children(state)}</>;
};

function onOffMutate({
  name,
  payload = undefined,
}: {
  name: string;
  payload?: any;
}) {
  dispatch({
    scope: `onOff:${name}`,
    eventName: 'updateStatus',
    payload: {
      status: !eventToggleManager.getItem(name),
      data: payload,
    },
  });
}

export { OnOffManagerWrapper, onOffMutate };
