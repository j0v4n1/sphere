import ApiError from '../errors/api-error';
import { Response, Request, NextFunction } from 'express';

export default function (err: ApiError, req: Request, res: Response, next: NextFunction) {
  return res.status(err.statusCode).send(err.message);
}
