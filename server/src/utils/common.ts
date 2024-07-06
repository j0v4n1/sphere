import { Response } from 'express';
export const responseData = (res: Response, status: 'success' | 'failure', data?: any) => {
  setTimeout(() => {
    res.json({ status, data });
  }, 3000);
};
