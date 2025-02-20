import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFetch } from 'types/interfaces/modal.interface';

const initialState: IFetch = {
  errorModalOpen: false,
  errors: [],
  loading: false,
  loadingText: '',
};

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    closeErrorModal: (state: IFetch) => {
      state.errorModalOpen = false;
      state.errors = [];
    },
    openErrorModal: (
      state: IFetch,
      action: PayloadAction<{
        errorText: string[];
      }>,
    ) => {
      state.errorModalOpen = true;
      state.errors = action.payload.errorText;
    },
    openPreloader: (
      state: IFetch,
      action: PayloadAction<{
        loadingText: string;
      }>,
    ) => {
      state.loading = true;
      state.loadingText = action.payload.loadingText;
    },
    closePreloader: (state: IFetch) => {
      state.loadingText = '';
      state.loading = false;
    },
  },
});

export const { closeErrorModal, openErrorModal, openPreloader, closePreloader } =
  fetchSlice.actions;
export default fetchSlice.reducer;
