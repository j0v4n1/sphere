import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../../utils/api';
import { UserItem, UsersState } from './index.types';

export const getUsersThunk = createAsyncThunk('users/getUsers', async () => {
  return await getUsers();
});

const initialState: UsersState = {
  request: false,
  loading: false,
  failed: false,
  users: [],
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<UserItem>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.pending, (state) => {
      state.loading = true;
      state.request = true;
    });
    builder.addCase(
      getUsersThunk.fulfilled,
      (state, action: PayloadAction<{ status: string; data: UserItem[] }>) => {
        state.loading = false;
        state.request = false;
        state.users = action.payload.data;
      }
    );
    builder.addCase(getUsersThunk.rejected, (state) => {
      state.loading = false;
      state.failed = true;
      state.request = false;
    });
  },
});

const { reducer, actions } = users;

export const { addNewUser, removeUser } = actions;

export default reducer;
