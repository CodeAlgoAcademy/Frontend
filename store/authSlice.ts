import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserData } from "../types/interfaces";
import { RootState } from "./store";
import { loginUser, signUpUser, loginWithGoogle } from "services/authService";

const initialState: IUser = {
  id: 0,
  firstname: "",
  lastname: "",
  email: "",
  isActive: false,
  createdAt: "",
  updatedAt: "",
  access_token: "",
  refresh_token: "",
  // sign up stuffs
  country: "",
  // peculiar to students
  grade: "Change Grade",
  // peculiar to teachers
  schoolCountry: "",
  schoolName: "",
  is_parent: false,
  is_student: false,
  is_teacher: false,
  auth: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    // peculiar to students
    grade: "Change Grade",
    // peculiar to teachers
    schoolCountry: "",
    schoolName: "",
    is_parent: false,
    is_student: false,
    is_teacher: false,
    country: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: () => {
      localStorage.removeItem("token");
    },
    clearFields: (state: IUser) => {
      return { ...state, auth: initialState.auth };
    },
    updateUser: (
      state: IUser | any,
      action: PayloadAction<{
        key: string;
        value: string;
      }>
    ) => {
      if (action.payload.key === "accountType") {
        state.auth.is_parent = action.payload.value === "Parent" ? true : false;
        state.auth.is_teacher =
          action.payload.value === "Teacher" ? true : false;
        state.auth.is_student =
          action.payload.value === "Student" ? true : false;
      } else {
        state.auth[action.payload.key as keyof typeof state.auth] =
          action.payload.value;
      }
    },
    resetAuthUser: (state: IUser) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, () => {
      console.log("pending");
    }),
      builder.addCase(
        loginUser.fulfilled,
        (state: IUser, action: PayloadAction<IUser>) => {
          localStorage.setItem(
            "token",
            JSON.stringify({
              access_token: action.payload.access_token,
              refresh_token: action.payload.refresh_token,
            })
          );

          return {
            ...state,
            ...action.payload,
          };
        }
      ),
      builder.addCase(
        loginUser.rejected,
        (state: IUser, action: PayloadAction) => {
          console.log(action.payload);
        }
      ),
      builder.addCase(signUpUser.pending, () => {
        console.log("pending");
      }),
      builder.addCase(
        signUpUser.fulfilled,
        (state: IUser, action: PayloadAction<IUser>) => {
          localStorage.setItem(
            "token",
            JSON.stringify({
              access_token: action.payload.access_token,
              refresh_token: action.payload.refresh_token,
            })
          );
          return {
            ...state,
            ...action.payload,
          };
        }
      ),
      builder.addCase(
        signUpUser.rejected,
        (state: IUser, action: PayloadAction) => {
          console.log(action.payload);
        }
      );
    builder.addCase(loginWithGoogle.pending, () => {
      console.log("pending");
    }),
      builder.addCase(
        loginWithGoogle.fulfilled,
        (state: IUser, action: PayloadAction<IUser>) => {
          localStorage.setItem(
            "token",
            JSON.stringify({
              access_token: action.payload.access_token,
              refresh_token: action.payload.refresh_token,
            })
          );
          return {
            ...state,
            ...action.payload,
          };
        }
      ),
      builder.addCase(
        loginWithGoogle.rejected,
        (state: IUser, action: PayloadAction) => {
          console.log(action.payload);
        }
      );
  },
});

// Action creators are generated for each case reducer function
export const { logOut, clearFields, updateUser, resetAuthUser } =
  userSlice.actions;

export default userSlice.reducer;
