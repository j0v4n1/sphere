import { User } from '../new_user/index.types';

export type UserWithTokens = Omit<User, 'password'> & {
  accessToken: string;
  refreshToken: string;
};

export type UserItem = Omit<User, 'password'>;

export type UsersState = {
  request: boolean;
  loading: boolean;
  failed: boolean;
  users: UserItem[];
};
