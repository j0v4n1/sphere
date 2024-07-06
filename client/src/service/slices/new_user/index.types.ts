import { Role } from 'components/navbar/index.types';

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  passport: string;
  role: string;
};

export type AuthUserState = Omit<User, 'role' | 'password'> & {
  accessToken: string;
  role: Role | null;
};
