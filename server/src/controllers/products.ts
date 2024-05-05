import { Response, Request } from 'express';
import Product from '../models/products';

export const createProduct = (req: Request, res: Response) => {
  Product.create(req.body).then((product) => {
    if (product) {
      setTimeout(() => {
        res.json({
          status: 'success',
          product,
        });
      }, 3000);
    } else {
      console.log('error');
    }
  });
};

export const getProducts = (req: Request, res: Response) => {
  Product.find().then((data) => {
    Product.aggregate([
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brand',
        },
      },
      {
        $unwind: '$brand',
      },
    ]).then((products) => {
      if (data) {
        res.json({ products });
      } else {
        console.log('error');
      }
    });
  });
};
