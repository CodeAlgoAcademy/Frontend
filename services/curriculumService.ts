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
    const { levels, standard, chosenGrades, unitsWithError } =
      state.unit.addUnit;
    let { rearrangedUnits } = state.unit.addUnit;
    const { id } = state.currentClass;
    const units = rearrangedUnits.map((unit: any) => {
      return { ...unit, class_model: id };
    });
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
    try {
      if (errors.length === 0) {
        const { data } = await http.post(
          "/academics/curriculums/units/",
          JSON.stringify(units),
          {
            headers: { Authorization: "Bearer " + getAccessToken() },
          }
        );
        return data;
      } else {
        dispatch(openErrorModal({ errorText: [...errors] }));
      }
    } catch (error: any) {
      if (error.response.status !== 401) {
        dispatch(openErrorModal({ errorText: [error.message] }));
      }
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getAllCurriculums: any = createAsyncThunk(
  "curriculumSlice/fetchCurriculum",
  async (name, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    try {
      const { data } = await http.get("/academics/curriculums/units/", {
        headers: { Authorization: "Bearer " + getAccessToken() },
      });
      return data;
    } catch (error: any) {
      if (error.response.status !== 401) {
        dispatch(openErrorModal({ errorText: [error.message] }));
      }
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
