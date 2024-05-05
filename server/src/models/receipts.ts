import { Schema, model } from 'mongoose';

type Receipt = {
  number: number;
  type: string;
  vendor: string;
  date: string;
  author: string;
  contract: string;
  document: string;
  invoice: string;
  vat: number;
  total: number;
  store: string;
  time: string;
};

const ReceiptSchema = new Schema<Receipt>({
  number: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
  },
  vat: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

export default model<Receipt>('receipt', ReceiptSchema);
