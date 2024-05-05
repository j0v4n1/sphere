import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface ExtendedRequest extends Request {
  user: string | JwtPayload;
}

declare global {
  namespace Express {
    interface Request {
      user: string | JwtPayload;
    }
  }
}

export {};
