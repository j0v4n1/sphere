import { Schema, model } from 'mongoose';

type Brand = {
  name: string;
};

const BrandSchema = new Schema<Brand>({
  name: {
    type: String,
    required: true,
  },
});

export default model<Brand>('brand', BrandSchema);
