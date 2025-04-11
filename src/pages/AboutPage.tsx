import React from 'react';
import { dispatch } from '../event-pulse';

export const AboutPage = () => {
  return (
    <div>
      AboutPage
      <button
        onClick={() => {
          dispatch({
            scope: 'User',
            dispatch: {
              eventName: 'fetchUser',
              payload: {
                id: 1,
              },
            },
          });
          dispatch({
            scope: 'user',
            dispatch: {
              eventName: 'pera',
              payload: {
                id: 1,
              },
            },
          });
        }}
      >
        click me
      </button>
    </div>
  );
};
