import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";

export const addUnits: any = createAsyncThunk(
  "unitsSlice/addUnits",
  async (name, thunkApi) => {
    const state: any = thunkApi.getState();
    const { rearrangedUnits } = state.unit.addUnit;
    console.log(rearrangedUnits);
    try {
      const { data } = await http.post(
        "/academics/curriculums/units/",
        JSON.stringify(rearrangedUnits),
        {
          headers: { Authorization: "Bearer " + getAccessToken() },
        }
      );
      console.log(data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);


export const getAllCurriculums:any = createAsyncThunk('curriculumSlice/fetchCurriculum', 
async (name, thunkApi) => {
  try {
    const {data} = await http.get(
      "/academics/curriculums/units/",
      {
        headers: { Authorization: "Bearer " + getAccessToken() },
      }
    );
      return data
  } catch (error:any) {
    return thunkApi.rejectWithValue(error.response.data);
  }
}
)