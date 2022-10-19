import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IStore } from '../types/interfaces';

const initialState: IStore = {
  user: {
    id: 0,
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    role: {
      id: 1,
      role_name: '',
      description: '',
    },
    isActive: false,
    createdAt: '',
    updatedAt: '',
  },
  access_token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state: IStore, action: PayloadAction<IStore>) => {
      localStorage.setItem('token', action.payload.access_token);
      return {
        ...state,
        token: action.payload.access_token,
      };
    },
    logOut: () => {
      localStorage.removeItem('token');
    },
  },
});

// Action creators are generated for each case reducer function
export const { logOut, setLogin } = userSlice.actions;

export default userSlice.reducer;
