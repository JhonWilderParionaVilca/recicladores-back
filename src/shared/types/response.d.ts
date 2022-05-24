export type SuccesResponse = {
  data: any;
  msg: string;
  status: true;
};

export type ErrorResponse = {
  type: string;
  msg: string;
  status: false;
};
