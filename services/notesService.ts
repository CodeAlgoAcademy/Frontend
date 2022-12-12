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
    dispatch(openPreloader({ loadingText: "Fetching Notes" }));
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
      dispatch(openErrorModal({ errorText: error.response.data.detail }));
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
      dispatch(closePreloader());
      return { ...data };
    } catch (error: any) {
      dispatch(closePreloader());
      console.log(error);
      dispatch(openErrorModal({ errorText: error.response.data.detail }));
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
