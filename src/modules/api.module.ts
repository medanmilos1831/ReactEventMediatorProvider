import { autoBindListeners } from '../event-pulse';

export class ApiModule {
  constructor() {
    autoBindListeners(this, {
      axiosGet: [
        {
          eventName: 'fetching',
        },
      ],
      axiosPost: [
        {
          eventName: 'update',
        },
      ],
    });
  }
  axiosGet(params: any) {
    console.log('GET', params);
  }

  axiosPost() {
    console.log('POST');
  }
}

// export const api = new ApiModule();
