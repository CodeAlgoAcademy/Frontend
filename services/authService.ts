import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearFields } from "store/authSlice";
import http from "../axios.config";
import {
  closePreloader,
  openErrorModal,
  openPreloader,
} from "store/fetchSlice";

export const loginUser: any = createAsyncThunk(
  "authSlice/loginUser",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;
    const { email, password } = state.user.auth;
    dispatch(openPreloader({ loadingText: "Logging You in" }));
    try {
      const { data } = await http.post("/auth/login/", {
        email: email,
        password,
      });
      dispatch(clearFields());
      dispatch(closePreloader());
      return {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        ...data.user,
      };
    } catch (error: any) {
      dispatch(closePreloader());

      if (error.response.data.non_field_errors) {
        dispatch(
          openErrorModal({ errorText: error.response.data.non_field_errors[0] })
        );
      }

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
      grade: is_student ? grade : "",
      is_parent,
      is_student,
      is_teacher,
    };
    dispatch(openPreloader({ loadingText: "Creating Account" }));
    try {
      const { data } = await http.post("/auth/registration/", { ...options });
      dispatch(clearFields());
      dispatch(closePreloader());
      return {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        ...data?.user,
      };
    } catch (error: any) {
      dispatch(closePreloader());
      if (error.response.data.non_field_errors) {
        dispatch(
          openErrorModal({ errorText: error.response.data.non_field_errors[0] })
        );
      }
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const loginWithGoogle: any = createAsyncThunk(
  "authSlice/loginWithGoogle",
  async (access_token: string, thunkApi) => {
    try {
      const { data } = await http.post("/auth/google/", {
        access_token,
      });
      return {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        ...data.user,
      };
    } catch (err) {
      console.log(err);
    }
  }
);
