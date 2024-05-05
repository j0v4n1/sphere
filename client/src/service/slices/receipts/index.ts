import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchReceipts } from '../../../utils';
import {
  TReceipt,
  TReceiptsState,
  ReceiptType,
  TNomenclatureProduct,
  TProductDetails,
} from './index.types';
import { TContract, TProduct, TProvider } from '../general/index.types';

export const getReceipts = createAsyncThunk('receipt_list/fetchReceipts', async () => {
  const res = await fetchReceipts();
  return res.result;
});

const initialState: TReceiptsState = {
  receiptId: '',
  receiptType: ReceiptType.NEW,
  receiptsRequest: false,
  loading: false,
  receiptsFailed: false,
  receipts: [],
  error: undefined,
  newReceipt: {
    temporaryData: {
      provider: {
        activeProvider: null,
        isActive: false,
      },
      contract: {
        activeContract: null,
      },
      product: {
        activeProduct: null,
        isActive: false,
        productDetails: {
          amount: '',
          price: '',
          country: '',
          customDeclaration: '',
          location: '',
        },
      },
    },
    _id: '',
    number: null,
    provider: {
      _id: '',
      name: '',
      taxid: 0,
      crr: 0,
      registered: '',
      contracts: [],
    },
    products: [],
    date: '',
    vendor: '',
    contract: '',
    document: '',
    invoice: '',
    docdate: '',
    author: '',
    vat: 0,
    total: 0,
    store: '',
    time: '',
  },
};

const receipts = createSlice({
  name: 'receipts',
  initialState,
  reducers: {
    setProvider: (state, action: PayloadAction<TProvider>) => {
      state.newReceipt.provider = action.payload;
    },
    setContract: (state, action: PayloadAction<string>) => {
      state.newReceipt.contract = action.payload;
    },
    setReceiptId: (state, action: PayloadAction<string>) => {
      state.receiptId = action.payload;
    },
    setReceiptType: (state, action: PayloadAction<ReceiptType>) => {
      state.receiptType = action.payload;
    },
    setProduct: (state, action: PayloadAction<TNomenclatureProduct>) => {
      state.newReceipt.products.push(action.payload);
    },
    setActiveProvider: (state, action: PayloadAction<TProvider | null>) => {
      state.newReceipt.temporaryData.provider.activeProvider = action.payload;
    },
    setIsActiveProvider: (state, action: PayloadAction<boolean>) => {
      state.newReceipt.temporaryData.provider.isActive = action.payload;
    },
    setActiveContract: (state, action: PayloadAction<TContract>) => {
      state.newReceipt.temporaryData.contract.activeContract = action.payload;
    },
    setActiveProduct: (state, action: PayloadAction<TProduct>) => {
      state.newReceipt.temporaryData.product.activeProduct = action.payload;
    },
    setProductDetails: (state, action: PayloadAction<TProductDetails>) => {
      state.newReceipt.temporaryData.product.productDetails = action.payload;
    },
    updateProductDetails: (state, action: PayloadAction<TNomenclatureProduct>) => {
      const index = state.newReceipt.products.findIndex(
        (product) => product._id === action.payload._id
      );
      state.newReceipt.products[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<TNomenclatureProduct>) => {
      state.newReceipt.products = state.newReceipt.products.filter(
        (product) => product.uniqueListId !== action.payload.uniqueListId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReceipts.pending, (state) => {
      state.loading = true;
      state.receiptsRequest = true;
    });
    builder.addCase(getReceipts.fulfilled, (state, action: PayloadAction<TReceipt[]>) => {
      const receipts = action.payload;
      state.receipts = receipts.map((receipt) => receipt);
      state.loading = false;
    });
    builder.addCase(getReceipts.rejected, (state) => {
      state.loading = false;
      state.receiptsFailed = true;
      state.receiptsRequest = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { reducer, actions } = receipts;

export const {
  setProvider,
  setContract,
  setReceiptId,
  setProduct,
  setReceiptType,
  setActiveProvider,
  setIsActiveProvider,
  setActiveContract,
  setActiveProduct,
  setProductDetails,
  updateProductDetails,
  deleteProduct,
} = actions;

export default reducer;
