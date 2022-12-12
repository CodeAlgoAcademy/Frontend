import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetch } from "types/interfaces";

const initialState: IFetch = {
  errorModalOpen: true,
  errorText: "",
  loading: false,
  loadingText: "",
};

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {
    closeErrorModal: (state: IFetch) => {
      state.errorModalOpen = false;
      state.errorText = "";
    },
    openErrorModal: (
      state: IFetch,
      action: PayloadAction<{
        errorText: string;
      }>
    ) => {
      state.errorModalOpen = true;
      state.errorText = action.payload.errorText;
    },
    openPreloader: (
      state: IFetch,
      action: PayloadAction<{
        loadingText: string;
      }>
    ) => {
      state.loading = true;
      state.loadingText = action.payload.loadingText;
    },
    closePreloader: (state: IFetch) => {
      state.loadingText = "";
      state.loading = false;
    },
  },
});

export const {
  closeErrorModal,
  openErrorModal,
  openPreloader,
  closePreloader,
} = fetchSlice.actions;
export default fetchSlice.reducer;
