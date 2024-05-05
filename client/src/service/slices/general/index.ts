import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TBrand, InitialState, TProduct, TProvider } from './index.types';
import { getAllData } from '../../../utils/';
import { Role } from '../../../components/navbar/index.types';

export const getData = createAsyncThunk('data/getData', async () => {
  return await getAllData();
});

const initialState: InitialState = {
  request: false,
  loading: false,
  failed: false,
  providers: [],
  brands: [],
  products: [],
  role: Role.ADMIN,
  error: undefined,
};

const general = createSlice({
  name: 'general',
  initialState,
  reducers: {
    updateProviderDocument: (state, action: PayloadAction<TProvider>) => {
      const index = state.providers.findIndex((provider) => provider._id === action.payload._id);
      state.providers[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
      state.request = true;
    });
    builder.addCase(
      getData.fulfilled,
      (
        state,
        action: PayloadAction<
          [{ providers: TProvider[] }, { brands: TBrand[] }, { products: TProduct[] }]
        >
      ) => {
        const { providers } = action.payload[0];
        const { brands } = action.payload[1];
        const { products } = action.payload[2];
        state.providers = providers.map((provider) => provider);
        state.brands = brands.map((brand) => brand);
        state.products = products.map((product) => product);
        state.loading = false;
      }
    );
    builder.addCase(getData.rejected, (state) => {
      state.loading = false;
      state.failed = true;
      state.request = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { reducer, actions } = general;

export const { updateProviderDocument } = actions;

export default reducer;
