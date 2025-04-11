import { autoBindListeners, dispatch } from '../event-pulse';

class User {
  someData = 'milos';
  constructor() {
    autoBindListeners(this, {
      fetchUser: [
        {
          eventName: 'fetchUser',
        },
      ],
    });
  }
  fetchUser = (params: any) => {
    dispatch({
      scope: 'ApiModule',
      dispatch: {
        eventName: 'fetching',
        payload: {
          id: 1213,
        },
      },
    });
  };

  setSomeData = (data: string) => {
    this.someData = data;
  };
}

export const user = new User();
