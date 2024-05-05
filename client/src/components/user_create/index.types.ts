export type UserState = {
  name: string;
  email: string;
  password: string;
  passport: string;
  role: string;
};

export type Payload<T> = {
  key: keyof T;
  value: string;
};
