import { NextFunction, Request, Response } from 'express';
import userService from '../service/user-service';
import { responseData } from '../utils/common';
import { ExtendedRequest } from 'types/express';
import tokenService from '../service/token-service';

export const registration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.registration(req.body);
    return responseData(res, 'success', user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getUsers();
    return responseData(res, 'success', users);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, passport, password } = req.body;
    const user = await userService.login(req.body._id, password, { name, email, passport });
    return responseData(res, 'success', user);
  } catch (err) {
    next(err);
  }
};

export const authenticate = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.json({ status: 'failure', data: {} });
    }
    const user = await userService.auth(req.user.id);
    return responseData(res, 'success', user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;
  const { id } = req.params;
  try {
    const userAndToken = await userService.deleteUser(id, refreshToken);
    responseData(res, 'success', userAndToken);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.refreshToken;
    await tokenService.deleteToken(token);
    return responseData(res, 'success');
  } catch (error) {
    next(error);
  }
};

export const refresh = (req: Request, res: Response, next: NextFunction) => {};
