import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import parentService from "services/parentService";
import { IParentChild } from "types/interfaces";
import { closePreloader, openErrorModal, openPreloader } from "./fetchSlice";
import { RootState } from "./store";

const initialState: IParentChild = {
   // child: {
   codingExperience: "",
   dob: "",
   fullname: "",
   password: "",
   username: "",
   screentime: [
      { day: "Monday", time: "" },
      { day: "Tuesday", time: "" },
      { day: "Wednesday", time: "" },
      { day: "Thursday", time: "" },
      { day: "Friday", time: "" },
      { day: "Saturday", time: "" },
      { day: "Sunday", time: "" },
   ],
   // }
};

export const addChild: any = createAsyncThunk("parent/child/new", async (_, thunkAPI) => {
   const state: any = thunkAPI.getState();
   const dispatch = thunkAPI.dispatch;
   const { fullname, password, username, codingExperience, dob } = state.parent;
   const data = { fullname, password, username, codingExperience, dob };
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

export const addChildScreentimeDetails: any = createAsyncThunk("parentSlice/addChildScreentime", async (data, thunkApi) => {
   const state: any = thunkApi.getState();
   const dispatch = thunkApi.dispatch;
   const { screentime } = state.parent;
   dispatch(openPreloader({ loadingText: "Adding child's screentime details" }));
   try {
      const data = await parentService.addChildScreentime({ screentime });
      console.log(data);
      dispatch(closePreloader());

      return data;
   } catch (error) {
      dispatch(closePreloader());

      console.log(error);
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
      updateScreentime: (state: IParentChild, action: PayloadAction<{ day: string; hour: number | "No Limit" }>) => {
         state.screentime = state?.screentime?.map((time) => {
            if (time.day === action.payload.day) {
               time.time = action.payload.hour;
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

export const { resetChild, updateChild, updateScreentime } = parentSlice.actions;
export default parentSlice.reducer;
