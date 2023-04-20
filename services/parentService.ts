import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { errorResolver } from "utils/errorResolver";
import { getAccessToken } from "utils/getTokens";

export const getAllParents: any = createAsyncThunk("parents/getAll", async (_, thunkApi) => {
   try {
      const { data } = await http.get("/parent/parent-friend-list/", {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      });
      return data;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});
