import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { RootState } from "store/store";
import { getAccessToken } from "utils/getTokens";

export const getAllClasses: any = createAsyncThunk(
  "allClassesSlice/getAllClasses",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    try {
      const { data } = await http.get("/academics/class", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const addClass: any = createAsyncThunk(
  "allClassesSlice/addClass",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const {
      student,
      class: { className, grade, subject, coTeachers, roomNumber, color },
    } = state.addClass;
    console.log(className, grade, subject, coTeachers, roomNumber, color);
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
      return { ...data };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const addStudents: any = createAsyncThunk(
  "allClassesSlice/addStudents",
  async (name, thunkAPi) => {
    const state: any = thunkAPi.getState();
    const { firstName, lastName, email } = state.addClass.student;
    console.log("params", { firstName, lastName, email });
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
      console.log(data);
      return data;
    } catch (error: any) {
      return thunkAPi.rejectWithValue(error.response.data);
    }
  }
);
