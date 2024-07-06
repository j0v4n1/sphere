import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import receiptsRouter from './routes/receipts';
import providersRouter from './routes/provider';
import productsRouter from './routes/products';
import brandRouter from './routes/brands';
import errorMiddleware from './middlewares/errors';
import usersRouter from './routes/users';
import authMiddleware from './middlewares/auth';
import { authenticate } from './controllers/users';

const { PORT, PORT_DB, DB_NAME } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', receiptsRouter);
app.use('/api', providersRouter);
app.use('/api', productsRouter);
app.use('/api', brandRouter);
app.use('/api', usersRouter);
app.get('/api/users/auth', authMiddleware, authenticate);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${PORT_DB}/${DB_NAME}`).then(() => {
      console.log('Соединение с базой данных установлено');
    });
    app.listen(PORT, () => {
      console.log(`Сервер запущен на 8080 порту!`);
    });
  } catch (err) {
    console.log(err);
  }
};

start().then();
