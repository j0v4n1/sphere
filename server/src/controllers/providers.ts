import { Response, Request } from 'express';
import Provider from '../models/providers';

export const createProvider = (req: Request, res: Response) => {
  Provider.create(req.body).then((provider) => {
    if (provider) {
      res.json({
        status: 'success',
        data: {
          provider,
        },
      });
    } else {
      console.log('error');
    }
  });
};

export const getProviders = (req: Request, res: Response) => {
  Provider.find().then((providers) => {
    if (providers) {
      res.json({
        providers,
      });
    } else {
      console.log('error');
    }
  });
};

export const updateProviderContract = (req: Request, res: Response) => {
  const providerId = req.params.id;
  const contract = req.body;
  Provider.findByIdAndUpdate(providerId, { $addToSet: { contracts: contract } }, { new: true }).then((data) => {
    res.json(data);
  });
};
