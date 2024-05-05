import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUserState } from '../new_user/index.types';
import { UserWithTokens } from '../users/index.types';
import { Role } from '../../../components/navbar/index.types';

const initialState: AuthUserState = {
  _id: '',
  accessToken: '',
  name: '',
  email: '',
  passport: '',
  role: null,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserWithTokens>) => {
      state._id = action.payload._id;
      state.accessToken = action.payload.accessToken;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.passport = action.payload.passport;
      switch (action.payload.role) {
        case 'admin':
          state.role = Role.ADMIN;
          break;
        case 'user':
          state.role = Role.USER;
          break;
        case 'superuser':
          state.role = Role.SUPER_USER;
          break;
        default:
          state.role = state.role;
          break;
      }
    },
  },
});

const { reducer, actions } = user;

export const { setUser } = actions;

export default reducer;
