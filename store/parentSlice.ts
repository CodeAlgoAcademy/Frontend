import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import parentService from "services/parentService";
import { IParentChild, screentimeTypes } from "types/interfaces";
import { closePreloader, openErrorModal, openPreloader } from "./fetchSlice";
import { RootState } from "./store";

const initialState: IParentChild = {
   // child: {
   codingExperience: "experienced",
   dob: "",
   fullname: "",
   password: "",
   username: "",
   timeLimits: [
      { dayOfTheWeek: "Monday", timeLimit: "" },
      { dayOfTheWeek: "Tuesday", timeLimit: "" },
      { dayOfTheWeek: "Wednesday", timeLimit: "" },
      { dayOfTheWeek: "Thursday", timeLimit: "" },
      { dayOfTheWeek: "Friday", timeLimit: "" },
      { dayOfTheWeek: "Saturday", timeLimit: "" },
      { dayOfTheWeek: "Sunday", timeLimit: "" },
   ],
   // }
};

export const addChild: any = createAsyncThunk("parent/child/new", async (_, thunkAPI) => {
   const state: any = thunkAPI.getState();
   const dispatch = thunkAPI.dispatch;
   const { fullname, password, username, codingExperience, dob, timeLimits } = state.parent;
   const timeLimitsFormatted = timeLimits.map((timeInfo: screentimeTypes, index: number) => {
      return { ...timeInfo, timeLimit: typeof timeInfo.timeLimit === "number" ? `${timeInfo.timeLimit}:00:00` : timeInfo.timeLimit };
   });
   console.log(timeLimitsFormatted);

   const data = { fullname, password, username, codingExperience, dob, timeLimits: timeLimitsFormatted };
   dispatch(openPreloader({ loadingText: "Adding Child" }));

   try {
      const child = await parentService.addChild(data);
      dispatch(closePreloader());
      return child;
   } catch (error: any) {
      dispatch(closePreloader());
      console.log(error);

      if (error.response.data.non_field_errors) {
         dispatch(
            openErrorModal({
               errorText: [error.response.data.non_field_errors[0]],
            })
         );
      } else if (error.response.data.email) {
         dispatch(
            openErrorModal({
               errorText: [...error.response.data.email],
            })
         );
      } else if (error.response.data.username) {
         dispatch(
            openErrorModal({
               errorText: [...error.response.data.username],
            })
         );
      } else {
         dispatch(openErrorModal({ errorText: [error.message] }));
      }
      return thunkAPI.rejectWithValue(error.message);
   }
});

export const parentSlice = createSlice({
   name: "parents",
   initialState,
   reducers: {
      updateChild: (
         state: IParentChild | any,
         action: PayloadAction<{
            key: string;
            value: string;
         }>
      ) => {
         state[action.payload.key as keyof typeof state] = action.payload.value;
      },
      resetChild: (state: IParentChild) => {
         return initialState;
      },
      resetScreenTime: (state: IParentChild) => {
         return { ...state, timeLimits: initialState.timeLimits };
      },
      updateScreentime: (state: IParentChild, action: PayloadAction<{ day: string; hour: number | "No Limit" }>) => {
         state.timeLimits = state?.timeLimits?.map((time) => {
            if (time.dayOfTheWeek === action.payload.day) {
               time.timeLimit = action.payload.hour;
            }
            return time;
         });
      },
   },
   extraReducers(builder) {
      builder
         .addCase(addChild.fulfilled, () => {
            console.log("Successful");
         })
         .addCase(addChild.rejected, (_, { payload }: PayloadAction) => {
            console.error(payload);
         });
   },
});

export const { resetChild, updateChild, updateScreentime, resetScreenTime } = parentSlice.actions;
export default parentSlice.reducer;
