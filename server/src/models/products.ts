import { Schema, model } from 'mongoose';

type Product = {
  name: string;
  brand: Schema.Types.ObjectId;
  sku: string;
  unit: string;
};

const ProductSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

export default model<Product>('product', ProductSchema);
