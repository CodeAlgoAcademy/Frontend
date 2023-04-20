import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";
import { closePreloader, openErrorModal } from "store/fetchSlice";
import { errorResolver } from "utils/errorResolver";

export const getNotes: any = createAsyncThunk("notesSlice/getNotes", async (name, thunkApi) => {
   const state: any = thunkApi.getState();
   const dispatch = thunkApi.dispatch;
   try {
      const { data } = await http.get("/academics/notes", {
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

export const updateNotes: any = createAsyncThunk("notesSlice/updateNotes", async (name, thunkApi) => {
   const state: any = thunkApi.getState();
   const dispatch = thunkApi.dispatch;
   const { html } = state.notes;
   try {
      const { data } = await http.put(
         "/academics/notes",
         {
            text: html,
         },
         {
            headers: {
               Authorization: `Bearer ${getAccessToken()}`,
            },
         }
      );
      return { ...data };
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});
