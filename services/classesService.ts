import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import {
  closePreloader,
  openErrorModal,
  openPreloader,
} from "store/fetchSlice";
import { RootState } from "store/store";
import { getAccessToken } from "utils/getTokens";

export const getAllClasses: any = createAsyncThunk(
  "allClassesSlice/getAllClasses",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;
    dispatch(openPreloader({ loadingText: "Fetching Classes" }));
    try {
      const { data } = await http.get("/academics/class", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      dispatch(closePreloader());
      return data;
    } catch (error: any) {
      dispatch(closePreloader());
      dispatch(openErrorModal({ errorText: error.response.data.detail }));
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const addClass: any = createAsyncThunk(
  "allClassesSlice/addClass",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;

    const {
      student,
      class: { className, grade, subject, coTeachers, roomNumber, color },
    } = state.addClass;

    dispatch(openPreloader({ loadingText: "Adding Class" }));
    try {
      const { data } = await http.post(
        "/academics/class/",
        {
          className,
          grade,
          subject,
          roomNumber,
          color,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      dispatch(closePreloader());
      return { ...data };
    } catch (error: any) {
      dispatch(closePreloader());
      console.log(error, "error");
      dispatch(openErrorModal({ errorText: error.response.data.detail }));
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const addStudents: any = createAsyncThunk(
  "allClassesSlice/addStudents",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;
    dispatch(openPreloader({ loadingText: "Adding Student(s)" }));
    const { firstName, lastName, email } = state.addClass.student;

    try {
      const { data } = await http.post(
        "/academics/class/1/student",
        {
          firstName,
          lastName,
          email,
        },
        {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        }
      );
      dispatch(closePreloader());
      return data;
    } catch (error: any) {
      dispatch(closePreloader());
      dispatch(openErrorModal({ errorText: error.response.data.detail }));
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
