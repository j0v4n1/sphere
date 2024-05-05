import { Request, Response } from 'express';
import Brand from '../models/brands';

export const createBrand = (req: Request, res: Response) => {
  Brand.create(req.body)
    .then((brand) => {
      if (brand) {
        setTimeout(() => {
          res.json({
            status: 'success',
            brand,
          });
        }, 3000);
      } else {
        console.log('error');
      }
    })
    .catch((err) => console.log(err));
};

export const getAllBrands = (req: Request, res: Response) => {
  Brand.find()
    .then((brands) => {
      if (brands) {
        res.json({
          brands,
        });
      } else {
        console.log('error');
      }
    })
    .catch((err) => console.log(err));
};
