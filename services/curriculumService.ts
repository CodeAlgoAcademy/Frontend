import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";

export const addUnits: any = createAsyncThunk(
  "unitsSlice/addUnits",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const { rearrangedUnits } = state.unit.addUnit;
    console.log(JSON.stringify(rearrangedUnits));
    try {
      const { data } = await http.post(
        "/academics/curriculums/units/",
        JSON.stringify(rearrangedUnits),
        {
          headers: { Authorization: "Bearer " + getAccessToken() },
        }
      );
      console.log(data);
      return data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
