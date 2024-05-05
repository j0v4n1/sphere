import { Role } from '../../../components/navbar/index.types';

export type TContract = {
  _id: string;
  name: string;
};

export type TProduct = {
  _id: string;
  uniqueListId: string;
  name: string;
  brand: TBrand;
  sku: string;
  unit: string;
};

export type TProvider = {
  _id: string;
  name: string;
  taxid: number;
  crr: number;
  registered: string;
  contracts: TContract[];
};

export type TBrand = {
  _id: string;
  name: string;
};

export type InitialState = {
  request: boolean;
  loading: boolean;
  failed: boolean;
  providers: TProvider[];
  brands: TBrand[];
  products: TProduct[];
  role: Role;
  error: string | undefined;
};
