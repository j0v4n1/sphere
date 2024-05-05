import { Schema, model } from 'mongoose';

export type User = {
  name: string;
  role: 'user' | 'admin' | 'superuser';
  email: string;
  passport: string;
  password: string;
};

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<User>('user', UserSchema);
