import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";
import {
  closePreloader,
  openErrorModal,
  openPreloader,
} from "store/fetchSlice";

export const getNotes: any = createAsyncThunk(
  "notesSlice/getNotes",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;
    try {
      const { data } = await http.get("/academics/notes", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      dispatch(closePreloader());
      return data;
    } catch (error: any) {
      console.log(error);
      dispatch(closePreloader());
      if (error.response.status !== 401) {
        dispatch(openErrorModal({ errorText: [error.message] }));
      }
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateNotes: any = createAsyncThunk(
  "notesSlice/updateNotes",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;
    const { html } = state.notes;
    dispatch(openPreloader({ loadingText: "Updating Note" }));
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
      if (error.response.status !== 401) {
        dispatch(openErrorModal({ errorText: [error.message] }));
      }
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
