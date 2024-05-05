import { createProduct, getProducts } from '../controllers/products';
import { Router } from 'express';

const productsRouter = Router();

productsRouter.post('/products', createProduct);
productsRouter.get('/products', getProducts);

export default productsRouter;
