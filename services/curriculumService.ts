import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";
import {
  closePreloader,
  openErrorModal,
  openPreloader,
} from "store/fetchSlice";

export const addUnits: any = createAsyncThunk(
  "unitsSlice/addUnits",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const dispatch = thunkApi.dispatch;
    const { rearrangedUnits } = state.unit.addUnit;
    dispatch(openPreloader({ loadingText: "Adding units" }));
    try {
      const { data } = await http.post(
        "/academics/curriculums/units/",
        JSON.stringify(rearrangedUnits),
        {
          headers: { Authorization: "Bearer " + getAccessToken() },
        }
      );
      dispatch(closePreloader());
      return data;
    } catch (error: any) {
      dispatch(closePreloader());
      console.log(error);
      dispatch(openErrorModal({ errorText: error.response.data.detail }));
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getAllCurriculums: any = createAsyncThunk(
  "curriculumSlice/fetchCurriculum",
  async (name, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    dispatch(openPreloader({ loadingText: "Fetching Curriculums" }));
    try {
      const { data } = await http.get("/academics/curriculums/units/", {
        headers: { Authorization: "Bearer " + getAccessToken() },
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
