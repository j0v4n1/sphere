import { TContract, TProduct, TProvider } from '../general/index.types';

export type TNomenclatureProduct = TProduct & {
  price: number;
  amount: number;
  country: string;
  customDeclaration: string;
  location: string;
};

export type TReceipt = {
  _id: string;
  number: number | null;
  provider: TProvider;
  products: TNomenclatureProduct[];
  date: string;
  vendor: string;
  contract: string;
  document: string;
  invoice: string;
  docdate: string;
  author: string;
  vat: number;
  total: number;
  store: string;
  time: string;
};

export type TProductDetails = {
  amount: string;
  price: string;
  country: string;
  customDeclaration: string;
  location: string;
};

export type TReceiptWithTempData = TReceipt & {
  temporaryData: {
    provider: {
      activeProvider: TProvider | null;
      isActive: boolean;
    };
    contract: {
      activeContract: TContract | null;
    };
    product: {
      activeProduct: TProduct | null;
      isActive: boolean;
      productDetails: TProductDetails;
    };
  };
};

export type jsonDataReceipts = {
  status: 'success' | 'failure';
  result: TReceipt[];
};

export enum ReceiptType {
  NEW = 'new',
  DETAILS = 'details',
}

export type TReceiptsState = {
  receiptId: string;
  receiptType: ReceiptType;
  receiptsRequest: boolean;
  loading: boolean;
  receiptsFailed: boolean;
  receipts: TReceipt[];
  error: string | undefined;
  newReceipt: TReceiptWithTempData;
};
