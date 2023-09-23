import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import parentService from "services/parentChildService";
import { IParentChild, IParentChildren, screentimeTypes } from "types/interfaces";
import { errorResolver } from "utils/errorResolver";
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
      progress: {
         title: "",
         level: 0,
         progress: 0,
      },
   },
   codingExperience: "experienced",
   id: "",
   dob: "",
   fullName: "",
   password: "",
   confirmPassword: "",
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
};

export const addChild: any = createAsyncThunk("parent/child/new", async (_, thunkAPI) => {
   const state = thunkAPI.getState() as RootState;
   const dispatch = thunkAPI.dispatch;
   const { fullName, password, username, codingExperience, dob, timeLimits } = state.parentChild;
   const timeLimitsFormatted = timeLimits.map((timeInfo: screentimeTypes, index: number) => {
      return {
         ...timeInfo,
         timeLimit: timeInfo.timeLimit === "No Limit" ? `24:00:00` : timeInfo.timeLimit === "" ? "00:00:00" : `${timeInfo.timeLimit}:00:00`,
      };
   });
   const data = { fullname: fullName, password, username, codingExperience, dob, timeLimits: timeLimitsFormatted };
   dispatch(openPreloader({ loadingText: "Adding Child" }));

   try {
      const child = await parentService.addChild(data);
      dispatch(closePreloader());
      // dispatch(resetChild());
      return child;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkAPI.rejectWithValue(errorMessage);
   }
});

export const addChildFriend: any = createAsyncThunk("parent/child-friend/new", async (child_name: string, thunkAPI) => {
   const state: any = thunkAPI.getState();
   const dispatch = thunkAPI.dispatch;
   const { friend } = state.parentChild;

   dispatch(openPreloader({ loadingText: "Sending friend request" }));

   try {
      const newFriend = await parentService.addChildFriends({
         student_username: child_name || state.parentChild.currentChild.username || state.parentChild.username,
         username_or_email: friend,
      });
      dispatch(closePreloader());
      dispatch(resetChild());
      return newFriend;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkAPI.rejectWithValue(errorMessage);
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
      const errorMessage = errorResolver(error);
      return thunkAPI.rejectWithValue(errorMessage);
   }
});

export const getChildProgress: any = createAsyncThunk("parent/child/progress", async (_, thunkAPI) => {
   const state: any = thunkAPI.getState();
   const dispatch = thunkAPI.dispatch;

   console.log(state.parentSlice.currentChild.id);

   try {
      const childProgress = await parentService.getChildProgress(state.parentSlice.currentChild.id);

      return childProgress;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkAPI.rejectWithValue(errorMessage);
   }
});

export const editScreentime: any = createAsyncThunk(
   "parent/child/edit-screentime",
   async ({ id, data }: { id: string | number; data: any }, thunkAPI) => {
      const state: any = thunkAPI.getState();
      const dispatch = thunkAPI.dispatch;

      data.timeLimit = data.timeLimit === "No Limit" ? `12:00:00` : data.timeLimit === "" ? "00:00:00" : `${data.timeLimit}:00:00`;

      dispatch(openPreloader({ loadingText: "Editing Child Screentime" }));

      try {
         const child = await parentService.updateChildScreentime({ ...data }, id);
         dispatch(closePreloader());
         return child;
      } catch (error: any) {
         const errorMessage = errorResolver(error);
         return thunkAPI.rejectWithValue(errorMessage);
      }
   }
);

export const acceptFriendRequest: any = createAsyncThunk("friendRequest/reply", async (id: number, thunkAPI) => {
   const dispatch = thunkAPI.dispatch;
   try {
      const data = await parentService.replyFriendRequest({ accepted: true, rejected: false }, id);
   } catch (error: any) {
      dispatch(openErrorModal({ errorText: [JSON.stringify(error.response.data)] }));
      return thunkAPI.rejectWithValue(error);
   }
});

export const rejectFriendRequest: any = createAsyncThunk("friendRequest/reply", async (id: number, thunkAPI) => {
   const dispatch = thunkAPI.dispatch;
   try {
      const data = await parentService.replyFriendRequest({ accepted: false, rejected: true }, id);
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkAPI.rejectWithValue(errorMessage);
   }
});

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
         return { ...initialState, children: state.children, currentChild: state.currentChild };
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
      builder.addCase(getChildren.fulfilled, (state, action: PayloadAction<IParentChild[]>) => {
         state.children = action.payload;
         // if its another parent child or if it's the first time fetching the students, set them to first parent child else find the student id, (incase of updates!)
         const child = action.payload?.find((student) => student?.id === state.currentChild?.id) as IParentChild;
         if (child) {
            state.currentChild = child;
         } else {
            state.currentChild = action.payload?.[0];
         }
      });
      builder.addCase(getChildProgress.fulfilled, (state, action) => {
         console.log(action.payload);
         state.currentChild.progress = action.payload;
      });
   },
});

export const { resetChild, updateChild, updateScreentime, resetScreenTime, changeCurrentChild } = parentSlice.actions;
export default parentSlice.reducer;
