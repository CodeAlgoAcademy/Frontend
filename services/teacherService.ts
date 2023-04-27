import { getAccessToken } from "utils/getTokens";
import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../axios.config";
import { openErrorModal } from "store/fetchSlice";
import { errorResolver } from "utils/errorResolver";

export const getTeachers: any = createAsyncThunk("teacherSlice/fetchTeacher", async (name, thunkApi) => {
   const state: any = thunkApi.getState();
   const dispatch = thunkApi.dispatch;
   try {
      const { data } = await http.get("/academics/teacher/", {
         headers: {
            Authorization: "Bearer " + getAccessToken(),
         },
      });
      return data;
   } catch (error: any) {
      // const errorMessage = errorResolver(error);
      // return thunkApi.rejectWithValue(errorMessage);
   }
});
