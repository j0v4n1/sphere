import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../errors/not-found-error';
import { error } from 'winston';
import userService from '../service/user-service';
import ServerSideError from '../errors/server-side-error';
import { DELETE_USER_ERROR, FIND_USERS_ERROR, FIND_USER_ERROR, REGISTRATION_ERROR } from '../constants/messages';
import { responseData } from '../utils/common';
import { ExtendedRequest } from 'types/express';

export const registration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, passport } = req.body;
    const user = await userService.registration(req.body, { name, email, passport });
    if (!user) {
      throw new ServerSideError(REGISTRATION_ERROR);
    }
    return responseData(res, 'success', user);
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
    if (!users) {
      throw new NotFoundError(FIND_USERS_ERROR);
    }
    return responseData(res, 'success', users);
  } catch (err) {
    next(error);
  }
};

export const login = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const authId = req.body._id;
    const password = req.body._id;
    const authTokenId = req.user;
    if (authId) {
      const user = await userService.login(authId);
      if (!user) {
        throw new NotFoundError(FIND_USER_ERROR);
      }
      return responseData(res, 'success', user);
    }
    if (authTokenId) {
      const user = await userService.login({ id: authTokenId, password });
      if (!user) {
        throw new NotFoundError(FIND_USER_ERROR);
      }
      return responseData(res, 'success', user);
    }
    return responseData(res, 'failure', { message: 'не пройдена ни одна проверка' });
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.deleteUser(req.params.id);
    if (!users) {
      throw new ServerSideError(DELETE_USER_ERROR);
    }
    responseData(res, 'success', users);
  } catch (error) {}
};
export const logout = (req: Request, res: Response, next: NextFunction) => {};
export const refresh = (req: Request, res: Response, next: NextFunction) => {};
