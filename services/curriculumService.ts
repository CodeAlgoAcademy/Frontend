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
    const { rearrangedUnits, levels, standard, chosenGrades, unitsWithError } =
      state.unit.addUnit;
    const errors = [];

    if (standard === "") {
      errors.push("Please Select a standard");
    }
    if (levels === "") {
      errors.push("Please Select a level");
    }
    if (rearrangedUnits.length === 0) {
      errors.push("Please Select one or more units");
    }
    if (chosenGrades.length === 0) {
      errors.push("Please Select one or more grades");
    }
    unitsWithError.forEach((error: string) => errors.push(error));
    dispatch(openPreloader({ loadingText: "Adding units" }));
    try {
      if (errors.length === 0) {
        const { data } = await http.post(
          "/academics/curriculums/units/",
          JSON.stringify(rearrangedUnits),
          {
            headers: { Authorization: "Bearer " + getAccessToken() },
          }
        );
        dispatch(closePreloader());
        return data;
      } else {
        dispatch(openErrorModal({ errorText: [...errors] }));
        dispatch(closePreloader());
      }
    } catch (error: any) {
      dispatch(closePreloader());
      dispatch(openErrorModal({ errorText: [error.message] }));
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
      dispatch(closePreloader());
      dispatch(openErrorModal({ errorText: [error.message] }));
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
