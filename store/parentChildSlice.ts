import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import parentService from "services/parentChildService";
import { IParentChild, IParentChildren, screentimeTypes } from "types/interfaces";
import { closePreloader, openErrorModal, openPreloader } from "./fetchSlice";
import { RootState } from "./store";

const initialState: IParentChildren = {
   // child: {
   children: [],
   currentChild: {
      id: "",
      codingExperience: "",
      dob: "",
      fullName: "",
      fullname: "",
      password: "",
      username: "",
      friend: "",
      timeLimits: [
         { dayOfTheWeek: "Monday", timeLimit: "" },
         { dayOfTheWeek: "Tuesday", timeLimit: "" },
         { dayOfTheWeek: "Wednesday", timeLimit: "" },
         { dayOfTheWeek: "Thursday", timeLimit: "" },
         { dayOfTheWeek: "Friday", timeLimit: "" },
         { dayOfTheWeek: "Saturday", timeLimit: "" },
         { dayOfTheWeek: "Sunday", timeLimit: "" },
      ],
   },
   codingExperience: "experienced",
   id: "",
   dob: "",
   fullName: "",
   fullname: "",
   password: "",
   username: "",
   friend: "",
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
   const { fullname, password, username, codingExperience, dob, timeLimits } = state.parentChild;
   const timeLimitsFormatted = timeLimits.map((timeInfo: screentimeTypes, index: number) => {
      return {
         ...timeInfo,
         timeLimit: timeInfo.timeLimit === "No Limit" ? `24:00:00` : timeInfo.timeLimit === "" ? "00:00:00" : `${timeInfo.timeLimit}:00:00`,
      };
   });
   const data = { fullname, password, username, codingExperience, dob, timeLimits: timeLimitsFormatted };
   dispatch(openPreloader({ loadingText: "Adding Child" }));

   try {
      const child = await parentService.addChild(data);
      dispatch(closePreloader());
      // dispatch(resetChild());
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

export const addChildFriend: any = createAsyncThunk("parent/child-friend/new", async (child_name: string, thunkAPI) => {
   const state: any = thunkAPI.getState();
   const dispatch = thunkAPI.dispatch;
   const { friend, username } = state.parentChild;

   dispatch(openPreloader({ loadingText: "Sending friend request" }));

   try {
      const newFriend = await parentService.addChildFriends({
         student_username: child_name || username,
         username_or_email: friend,
      });
      dispatch(closePreloader());
      dispatch(resetChild());
      return newFriend;
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

export const getChildren: any = createAsyncThunk("parent/children", async (_, thunkAPI) => {
   const state: any = thunkAPI.getState();
   const dispatch = thunkAPI.dispatch;

   try {
      const children = await parentService.getAllChildren();
      console.log(children);
      return children;
   } catch (error: any) {
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

export const editScreentime: any = createAsyncThunk(
   "parent/child/edit-screentime",
   async ({ id, data }: { id: string | number; data: any }, thunkAPI) => {
      const state: any = thunkAPI.getState();
      const dispatch = thunkAPI.dispatch;

      // const timeLimitsFormatted = data.map((timeInfo: screentimeTypes, index: number) => {
      //    return {
      //       ...timeInfo,
      //       timeLimit: timeInfo.timeLimit === "No Limit" ? `24:00:00` : timeInfo.timeLimit === "" ? "00:00:00" : `${timeInfo.timeLimit}:00:00`,
      //    };
      // });
      data.timeLimit = data.timeLimit === "No Limit" ? `12:00:00` : data.timeLimit === "" ? "00:00:00" : `${data.timeLimit}:00:00`;
      console.log(data);
      dispatch(openPreloader({ loadingText: "Editing Child Screentime" }));

      try {
         const child = await parentService.updateChildScreentime({ ...data }, id);
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
   }
);

export const parentSlice = createSlice({
   name: "parentChild",
   initialState,
   reducers: {
      updateChild: (
         state: IParentChildren | any,
         action: PayloadAction<{
            key: string;
            value: string;
         }>
      ) => {
         state[action.payload.key as keyof typeof state] = action.payload.value;
      },
      resetChild: (state: IParentChildren) => {
         return initialState;
      },
      resetScreenTime: (state: IParentChildren) => {
         return { ...state, timeLimits: initialState.timeLimits };
      },
      updateScreentime: (state: IParentChildren, action: PayloadAction<{ day: string; hour: number | "No Limit" }>) => {
         state.timeLimits = state?.timeLimits?.map((time) => {
            if (time.dayOfTheWeek === action.payload.day) {
               time.timeLimit = action.payload.hour;
            }
            return time;
         });
      },
      changeCurrentChild: (state: IParentChildren, action: PayloadAction<IParentChild>) => {
         state.currentChild = action.payload;
      },
   },
   extraReducers(builder) {
      builder
         .addCase(addChild.fulfilled, () => {
            console.log("Successful");
         })
         .addCase(addChild.rejected, (_, { payload }: PayloadAction) => {
            console.error(payload);
         })
         .addCase(addChildFriend.fulfilled, () => {
            console.log("Successful");
         })
         .addCase(addChildFriend.rejected, (_, { payload }: PayloadAction) => {
            console.error(payload);
         })
         .addCase(getChildren.fulfilled, (state, action: PayloadAction<IParentChild[]>) => {
            state.children = action.payload;
            // if its another parent child or if it's the first time fetching the students, set them to first parent child else find the student id, (incase of updates!)
            const child = action.payload.find((student) => student?.id === state.currentChild?.id) as IParentChild;
            if (child) {
               state.currentChild = child;
            } else {
               state.currentChild = action.payload[0];
            }
         })
         .addCase(editScreentime.pending, () => {
            console.log("Editing Screentime...");
         });
   },
});

export const { resetChild, updateChild, updateScreentime, resetScreenTime, changeCurrentChild } = parentSlice.actions;
export default parentSlice.reducer;
