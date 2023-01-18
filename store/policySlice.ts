import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  checked: false,
};

const policySlice = createSlice({
  name: 'policyCheck',
  initialState,
  reducers: {
    checkPolicy: (state: any) => {
      state.checked = true;
    },
    unCheckPolicy: (state: any) => {
      state.checked = false;
    },
  },
});

export const { checkPolicy, unCheckPolicy } = policySlice.actions;

export default policySlice.reducer;
