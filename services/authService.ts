import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearFields, updateUser } from "store/authSlice";
import http from "../axios.config";
import {
  closePreloader,
  openErrorModal,
  openPreloader,
} from "store/fetchSlice";
import { getAccessToken } from "utils/getTokens";
import { RootState } from "store/store";

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
          openErrorModal({
            errorText: [error.response.data.non_field_errors[0]],
          })
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
          openErrorModal({
            errorText: [error.response.data.non_field_errors[0]],
          })
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
      console.log(data);
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

export const updateFirstname: any = createAsyncThunk(
  "authSlice/updateFirstname",
  async (_, thunkApi) => {
    const state: any = thunkApi.getState();
    const { firstname } = state.user.auth;
    const dispatch = thunkApi.dispatch;
    const {
      lastname,
      email,
      country,
      schoolCountry,
      schoolName,
      is_student,
      is_teacher,
      is_parent,
      grade,
    } = state.user;
    try {
      const { data } = await http.put(
        "/auth/user",
        {
          firstname,
          lastname,
          email,
          country,
          schoolCountry,
          schoolName,
          is_student,
          is_teacher,
          is_parent,
          grade,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      dispatch(updateUser({ key: "firstname", value: "" }));
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateLastname: any = createAsyncThunk(
  "authSlice/updateLastname",
  async (_, thunkApi) => {
    const state: any = thunkApi.getState();
    const { lastname } = state.user.auth;
    const dispatch = thunkApi.dispatch;
    const {
      firstname,
      email,
      country,
      schoolCountry,
      schoolName,
      is_student,
      is_teacher,
      is_parent,
      grade,
    } = state.user;
    try {
      const { data } = await http.put(
        "/auth/user",
        {
          lastname,
          firstname,
          email,
          country,
          schoolCountry,
          schoolName,
          is_student,
          is_teacher,
          is_parent,
          grade,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      dispatch(updateUser({ key: "lastname", value: "" }));
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateEmail: any = createAsyncThunk(
  "authSlice/updateEmail",
  async (_, thunkApi) => {
    const state: any = thunkApi.getState();
    const { email } = state.user.auth;
    const dispatch = thunkApi.dispatch;
    const {
      lastname,
      firstname,
      country,
      schoolCountry,
      schoolName,
      is_student,
      is_teacher,
      is_parent,
      grade,
    } = state.user;
    try {
      const { data } = await http.put(
        "/auth/user",
        {
          email,
          lastname,
          firstname,
          country,
          schoolCountry,
          schoolName,
          is_student,
          is_teacher,
          is_parent,
          grade,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      dispatch(updateUser({ key: "email", value: "" }));
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
