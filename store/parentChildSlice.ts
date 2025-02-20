import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import parentService from "services/parentChildService";
import { IChildSkill, IParentChild, IParentChildren, screentimeTypes } from "types/interfaces";
import { errorResolver } from "utils/errorResolver";
import { closePreloader, openErrorModal, openPreloader } from "./fetchSlice";
import { RootState } from "./store";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";
import { setTimeLimit } from "utils/useMultiForm";

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
      level: 0,
      progress: {
         current: {
            title: "",
            level: 0,
            progress: 0,
         },
         topic: [],
      },
      skills: [],
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
      { dayOfTheWeek: "Monday", timeLimit: "No Limit" },
      { dayOfTheWeek: "Tuesday", timeLimit: "No Limit" },
      { dayOfTheWeek: "Wednesday", timeLimit: "No Limit" },
      { dayOfTheWeek: "Thursday", timeLimit: "No Limit" },
      { dayOfTheWeek: "Friday", timeLimit: "No Limit" },
      { dayOfTheWeek: "Saturday", timeLimit: "No Limit" },
      { dayOfTheWeek: "Sunday", timeLimit: "No Limit" },
   ],
};

export const addChild: any = createAsyncThunk("parent/child/new", async (_, thunkAPI) => {
   const state = thunkAPI.getState() as RootState;
   const dispatch = thunkAPI.dispatch;
   const { fullName, password, username, codingExperience, dob, timeLimits } = state.parentChild;
   const timeLimitsFormatted = timeLimits.map((timeInfo: screentimeTypes, index: number) => {
      return {
         ...timeInfo,
         timeLimit: setTimeLimit(timeInfo.timeLimit as string),
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
   const state = <RootState>thunkAPI.getState();
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
   const state = <RootState>thunkAPI.getState();
   const dispatch = thunkAPI.dispatch;

   try {
      const children = await parentService.getAllChildren();

      return children;
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data);
   }
});

export const getChildProgress: any = createAsyncThunk("parent/child/progress", async (_, thunkAPI) => {
   const state = thunkAPI.getState() as RootState;
   const dispatch = thunkAPI.dispatch;
   try {
      return await parentService.getChildProgress(state.parentChild.currentChild.id);
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
   }
});

export const getChildSkills: any = createAsyncThunk("/parent/child/skills", async (_, thunkApi) => {
   const state = <RootState>thunkApi.getState();
   const dispatch = thunkApi.dispatch;
   const childId = <number>state.parentChild.currentChild.id;

   try {
      return await parentService.getChildSkills(childId);
   } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
   }
});

export const editScreentime: any = createAsyncThunk(
   "parent/child/edit-screentime",
   async ({ id, data }: { id: string | number; data: screentimeTypes }, thunkAPI) => {
      const dispatch = thunkAPI.dispatch;

      data.timeLimit = setTimeLimit(data.timeLimit as string);

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

export const updateChildPassword: any = createAsyncThunk(
   "parent/update-child-password",
   async (
      data: {
         child_id: number;
         password: string;
      },
      thunkApi
   ) => {
      const dispatch = thunkApi.dispatch;
      dispatch(openPreloader({ loadingText: "Updating Child's Password" }));

      try {
         const response = await parentService.updateChildPassword(data.child_id, data.password);

         dispatch(closePreloader());

         return response;
      } catch (error) {
         const errorMessage = errorResolver(error);

         return thunkApi.rejectWithValue(errorMessage);
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
         let child = action.payload?.find((student) => student?.id === state.currentChild?.id) as IParentChild;

         if (child) {
            // do not update skills and progress since they're fetched seperately
            const { progress, skills, ...rest } = child;
            child = rest;
            state.currentChild = { ...state.currentChild, ...child };
         } else {
            state.currentChild = action.payload?.[0];
         }
      });
      builder.addCase(getChildProgress.fulfilled, (state, action) => {
         state.currentChild.progress = action.payload;
      });
      builder.addCase(getChildSkills.fulfilled, (state, action: PayloadAction<IChildSkill[]>) => {
         state.currentChild.skills = action.payload;
      });
   },
});

export const { resetChild, updateChild, updateScreentime, resetScreenTime, changeCurrentChild } = parentSlice.actions;
export default parentSlice.reducer;
