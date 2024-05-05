import { TNomenclatureProduct } from '../receipts/index.types';
export enum ModalType {
  PROVIDER = 'provider',
  PRODUCT = 'product',
  USER = 'user',
  CONTRACT = 'contract',
  PRODUCT_DETAILS = 'details',
  WARNING = 'warning',
  SAVING = 'saving',
}

export type TAction = { payload: TNomenclatureProduct; type: string } | null;

export type ModalState = {
  isOpen: boolean;
  type: ModalType | null;
  action: TAction;
};
