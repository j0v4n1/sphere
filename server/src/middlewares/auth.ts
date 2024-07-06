import { Response, Request, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { responseData } from '../utils/common';
import { User } from 'types/express';

const { JWT_SECRET } = process.env;

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next();
  }
  const token = authorization.replace('Bearer ', '');
  let payload: string | JwtPayload | User;
  if (!JWT_SECRET) {
    return responseData(res, 'failure', { message: 'Проблема с секретным ключом' });
  }
  try {
    payload = verify(token, JWT_SECRET);
    req.user = payload as User;
    next();
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'Непредвиденная ошибка при проверке токена';
    return responseData(res, 'failure', { message: errorMessage });
  }
};
