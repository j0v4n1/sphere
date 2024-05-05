import { Response } from 'express';
export const responseData = (res: Response, status: 'success' | 'failure', data?: any) => {
  res.json({ status, data });
};
