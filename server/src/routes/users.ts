import { registration, getUsers, login, deleteUser, logout, authenticate } from '../controllers/users';
import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/users/registration', registration);
usersRouter.post('/users/login', login);
usersRouter.post('/users/auth', authenticate);
usersRouter.post('/users/logout', logout);
usersRouter.delete('/users/:id', deleteUser);
usersRouter.get('/users', getUsers);
export default usersRouter;
