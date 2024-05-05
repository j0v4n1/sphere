import { Response, Request } from 'express';
import Receipt from '../models/receipts';

export const createReceipt = (req: Request, res: Response) => {
  Receipt.create(req.body).then((receipt) => {
    if (receipt) {
      res.json({
        status: 'success',
        data: {
          receipt,
        },
      });
    } else {
      console.log('error');
    }
  });
};

export const getReceipts = (req: Request, res: Response) => {
  Receipt.find().then((data) => {
    Receipt.aggregate([
      {
        $lookup: {
          from: 'providers',
          localField: 'provider',
          foreignField: '_id',
          as: 'provider',
        },
      },
      {
        $unwind: '$provider',
      },
    ]).then((result) => {
      if (data) {
        res.json({
          status: 'success',
          result,
        });
      } else {
        console.log('error');
      }
    });
  });
};
