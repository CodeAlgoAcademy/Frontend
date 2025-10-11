import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import teachersClassBaseServices from "services/teachersClassServices";
import { errorResolver } from "utils/errorResolver";
import { closePreloader, openPreloader } from "./fetchSlice";
import { setClassBaseTimeLimit, setTimeLimit } from "utils/useMultiForm";
import { LevelThresholdInputProps } from "@/components/parents/UI/levelthreshold";
import { screentimeTypes } from "types/interfaces/parent.interface";
import { CurrentClassState } from "types/interfaces/classes.interface";

interface IClassBaseState {
  levelThresholds: LevelThresholdInputProps[];
  timeLimits: screentimeTypes[];
  isLoading: boolean;
  error: string | undefined;
  CurrentClass: CurrentClassState
}

const initialState: IClassBaseState = {
  timeLimits: [
    { dayOfTheWeek: "Monday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Tuesday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Wednesday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Thursday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Friday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Saturday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Sunday", timeLimit: "No Limit" },
  ],
  levelThresholds: [],
  isLoading: false,
  error: undefined,
  CurrentClass: {
    className: "",
    color: "",
    id: "",
    timeLimits: [
    { dayOfTheWeek: "Monday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Tuesday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Wednesday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Thursday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Friday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Saturday", timeLimit: "No Limit" },
    { dayOfTheWeek: "Sunday", timeLimit: "No Limit" },
  ],
  },
};

export const bulkUpdateClassLevelThreshold: any = createAsyncThunk(
  "classBase/bulkUpdateLevelThreshold",
  async (
    { 
      class_id, 
      data 
    }: { 
      class_id: number; 
      data: { level: number; grade: string } 
    }, 
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch as any;
    dispatch(openPreloader({ loadingText: "Bulk updating level thresholds" }));

    try {
      const response = await teachersClassBaseServices.bulkUpdateClassLevelThreshold(class_id, data);
      dispatch(closePreloader());
      return response;
    } catch (error: any) {
      const errorMessage = errorResolver(error);
      dispatch(closePreloader());
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const bulkUpdateClassScreenTime = createAsyncThunk(
  "classBase/bulkUpdateScreenTime",
  async (
    {
      class_id,
      data,
    }: {
      class_id: string | number;
      data: screentimeTypes;
    },
    thunkAPI
  ) => {
    const dispatch = thunkAPI.dispatch;
      data.timeLimit = setClassBaseTimeLimit(data.timeLimit as string);
      dispatch(openPreloader({ loadingText: "Editing student Screentime" }));

      try {
         const response = await teachersClassBaseServices.bulkUpdateClassScreenTime(class_id, data)
         dispatch(closePreloader());
         return response;
      } catch (error: any) {
         const errorMessage = errorResolver(error);
         dispatch(closePreloader());
         return thunkAPI.rejectWithValue(errorMessage);
      }
   }
);

const teacherClassSlice = createSlice({
  name: "teacherClass",
  initialState,
  reducers: {
    updateClassLevelThreshold: (state, action: PayloadAction<LevelThresholdInputProps>) => {
      const existingIndex = state.levelThresholds.findIndex(
        (threshold) => threshold.grade === action.payload.grade
      );
      if (existingIndex >= 0) {
        state.levelThresholds[existingIndex] = action.payload;
      } else {
        state.levelThresholds.push(action.payload);
      }
    },
    updateClassScreenTime: (state, action: PayloadAction<{ day: string; hour: number | "No Limit" }>) => {
      state.timeLimits = state.timeLimits.map((time) => {
        if (time.dayOfTheWeek === action.payload.day) {
          return { ...time, timeLimit: action.payload.hour };
        }
        return time;
      });
    },
    resetClassSettings: (state) => {
      state.timeLimits = [...initialState.timeLimits];
      state.levelThresholds = [...initialState.levelThresholds];
      state.isLoading = false;
      state.error = undefined;
    },
    setClassLevelThresholds: (state, action: PayloadAction<LevelThresholdInputProps[]>) => {
      state.levelThresholds = action.payload;
    },
    setClassTimeLimits: (state, action: PayloadAction<screentimeTypes[]>) => {
      state.timeLimits = action.payload;
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bulkUpdateClassLevelThreshold.fulfilled, (state, action: PayloadAction<LevelThresholdInputProps>) => {
        state.isLoading = false;
        const existingIndex = state.levelThresholds.findIndex(
          (threshold) => threshold.grade === action.payload.grade
        );
        if (existingIndex >= 0) {
          state.levelThresholds[existingIndex] = action.payload;
        } else {
          state.levelThresholds.push(action.payload);
        }
      })

      .addCase(bulkUpdateClassScreenTime.fulfilled, (state, action: PayloadAction<screentimeTypes[]>) => {
        state.isLoading = false;
        state.timeLimits = action.payload;
      })

  },
});

export const {
  updateClassLevelThreshold,
  updateClassScreenTime,
  resetClassSettings,
  setClassLevelThresholds,
  setClassTimeLimits,
  clearError,
} = teacherClassSlice.actions;

export default teacherClassSlice.reducer;