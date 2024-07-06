import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants';
import { User } from '../service/slices/new_user/index.types';
import { removeUser } from '../service/slices/users';
import { AppDispatch } from 'service/store';
import { UserWithTokens } from '../service/slices/users/index.types';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('refreshToken'),
  },
});

export const createUser = (data: Omit<User, '_id'>) =>
  axiosInstance.post(`users/registration`, data).then(({ data }) => data);

export const getUsers = () => axiosInstance.get(`users`).then(({ data }) => data);

export const loginUser = (data: {
  _id: string;
  name: string;
  email: string;
  passport: string;
  password: string;
}): Promise<AxiosResponse<{ status: String; data: UserWithTokens }>> =>
  axiosInstance.post('users/login', data);

export const deleteUser = (id: string, refreshToken: string, dispatch: AppDispatch) => {
  axiosInstance.delete(`users/${id}`, { data: { refreshToken } }).then(() => {
    dispatch(removeUser(id));
  });
};

export const authenticate = async (): Promise<
  AxiosResponse<{ status: String; data: UserWithTokens }>
> => {
  return await axiosInstance.get('users/auth').then((data) => data);
};

export const logoutUser = async (refreshToken: string) => {
  return await axiosInstance.post('users/logout', { refreshToken });
};
