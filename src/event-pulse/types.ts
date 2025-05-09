export type actionType = {
  scope?: string;
  eventName: string;
  payload?: any;
};

export type subscribeType = {
  scope?: string;
  eventName: string;
  callback: (data: { payload: any }) => void;
};
