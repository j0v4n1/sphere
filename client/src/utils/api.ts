import axios from 'axios';
import { BASE_URL } from '../constants';
import { User } from '../service/slices/new_user/index.types';
import { removeUser } from '../service/slices/users';
import { AppDispatch } from 'service/store';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const sendUserData = (data: User) =>
  axiosInstance.post(`users/registration`, data).then(({ data }) => data);

export const getUsers = () => axiosInstance.get(`users`).then(({ data }) => data);

export const loginUser = (data: { _id: string; password: string }) =>
  axiosInstance.post('users/login', data);

export const deleteUserInDb = (id: string, dispatch: AppDispatch) => {
  axiosInstance.delete(`users/${id}`).then(() => {
    dispatch(removeUser(id));
  });
};
