import { combineReducers } from '@reduxjs/toolkit';
import receipts from '../slices/receipts';
import modal from '../slices/modal';
import general from '../slices/general';
import newUser from '../slices/new_user';
import users from '../slices/users';
import user from '../slices/user';

const rootReducer = combineReducers({ receipts, modal, general, newUser, users, user });

export default rootReducer;
