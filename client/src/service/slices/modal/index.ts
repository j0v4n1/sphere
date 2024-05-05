import { createSlice } from '@reduxjs/toolkit';
import { TAction, ModalState, ModalType } from './index.types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ModalState = {
  isOpen: false,
  type: null,
  action: null,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalType>) {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
    },
    setAction(state, action: PayloadAction<TAction>) {
      state.action = action.payload;
    },
  },
});

export const { openModal, closeModal, setAction } = modal.actions;
export default modal.reducer;
