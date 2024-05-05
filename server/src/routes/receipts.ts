import { createReceipt, getReceipts } from '../controllers/receipts';
import { Router } from 'express';

const receiptsRouter = Router();

receiptsRouter.post('/receipts', createReceipt);
receiptsRouter.get('/receipts', getReceipts);
export default receiptsRouter;
