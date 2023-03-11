import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";

export const getAllParents: any = createAsyncThunk("parents/getAll", async (_, thunkApi) => {
   try {
      const { data } = await http.get("/parent", {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      });
      return data;
   } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
   }
});
