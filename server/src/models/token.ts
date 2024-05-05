import { Schema, Types, model } from 'mongoose';

type Token = {
  user: Schema.Types.ObjectId;
  refreshToken: string;
};

const TokenSchema = new Schema<Token>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

export default model<Token>('token', TokenSchema);
