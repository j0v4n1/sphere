import { Response, Request, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { responseData } from 'utils/common';

const { JWT_SECRET } = process.env;

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next();
  }
  const token = authorization.replace('Bearer ', '');
  let payload: string | JwtPayload;
  try {
    if (!JWT_SECRET) {
      return responseData(res, 'failure', { message: 'Проблема с секретным ключом' });
    }
    payload = verify(token, JWT_SECRET);
  } catch (error) {
    return next(error);
  }
  req.user = payload;
  return next();
};
