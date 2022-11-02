import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/interfaces";

const initialState: IUser = {
  id: 0,
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  role: {
    id: 1,
    role_name: "",
    description: "",
  },
  isActive: false,
  createdAt: "",
  updatedAt: "",
  access_token: "",
  // sign up stuffs
  country: "",
  // peculiar to students
  grade: "Change Grade",
  // peculiar to teachers
  schoolCountry: "",
  schoolName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state: IUser, action: PayloadAction<IUser>) => {
      localStorage.setItem("token", action.payload.access_token);
      return {
        ...state,
        token: action.payload.access_token,
      };
    },
    logOut: () => {
      localStorage.removeItem("token");
    },
    updateUser: (
      state: IUser | any,
      action: PayloadAction<{
        key: string;
        value: string;
      }>
    ) => {
      state[action.payload.key as keyof IUser] = action.payload.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logOut, setLogin, updateUser } = userSlice.actions;

export default userSlice.reducer;
