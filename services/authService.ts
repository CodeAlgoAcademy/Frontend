import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearFields } from "store/authSlice";
import http from "../axios.config";

export const loginUser: any = createAsyncThunk(
  "authSlice/loginUser",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;
    const { email, password } = state.user.auth;
    try {
      const { data } = await http.post("/auth/login/", {
        email: email,
        password,
      });
      dispatch(clearFields());
      return {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        ...data.user,
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const signUpUser: any = createAsyncThunk(
  "authSlice/signUpUser",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;
    const {
      email,
      firstname,
      lastname,
      schoolName,
      grade,
      is_parent,
      is_student,
      is_teacher,
      schoolCountry,
      country,
    } = state.user.auth;
    const options = {
      email,
      password1: state.user.auth.password,
      password2: state.user.auth.password,
      firstname,
      lastname,
      schoolName,
      country,
      schoolCountry,
      grade,
      is_parent,
      is_student,
      is_teacher,
    };

    try {
      const { data } = await http.post("/auth/registration/", { ...options });
      dispatch(clearFields());
      return {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        ...data?.user,
      };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
