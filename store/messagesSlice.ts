import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserConversation } from "types/interfaces";
import messageService from "services/messagesService";
import { RootState } from "./store";
import { errorResolver } from "utils/errorResolver";
import { User } from "types/interfaces/auth.interface";

const initialState: IUserConversation = {
   conversations: [],
   openedMessageStudent: null,
   openedStudentMessages: [],
   openedMessageOwner: {
      firstName: "",
      lastName: "",
      email: "",
      id: 0,
   },
   openedMessage: [],
};

export const getTeacherConversations: any = createAsyncThunk("teacher/conversations", async (_, thunkAPI) => {
   try {
      return await messageService.getTeacherConversations();
   } catch (error: any) {
      // const errorMessage = errorResolver(error);
      // return thunkAPI.rejectWithValue(errorMessage);
   }
});

export const getTeacherOpenMesssages: any = createAsyncThunk("teacher/student/messages", async (_, thunkAPI) => {
   try {
      const state: any = thunkAPI.getState();
      const { openedMessageOwner } = state.messages;
      return await messageService.getTeacherMessages(openedMessageOwner.id);
   } catch (error: any) {
      // const errorMessage = errorResolver(error);
      // return thunkAPI.rejectWithValue(errorMessage);
   }
});
export const getParentOpenMesssages: any = createAsyncThunk("teacher/student/messages", async (_, thunkAPI) => {
   try {
      const state: any = thunkAPI.getState();
      const { openedMessageOwner } = state.messages;
      return await messageService.getParentMessages(openedMessageOwner.id);
   } catch (error: any) {
      // const errorMessage = errorResolver(error);
      // return thunkAPI.rejectWithValue(errorMessage);
   }
});

export const messageSlice = createSlice({
   initialState,
   name: "messages",
   reducers: {
      reset: (state: IUserConversation | any) => initialState,
      setOpenStudent: (state: IUserConversation, action: PayloadAction<number>) => {
         state.openedMessageStudent = action.payload;
      },
      resetOpenStudent: (state: IUserConversation | any) => {
         state.openedMessageStudent = initialState.openedMessageStudent;
      },
      open_a_message: (state: IUserConversation, action: PayloadAction<User>) => {
         state.openedMessageOwner = action.payload;
      },
   },
   extraReducers(builder) {
      builder
         .addCase(getTeacherConversations.fulfilled, (state: IUserConversation | any, action: PayloadAction<IUserConversation>) => {
            state.conversations = action.payload;
         })
         .addCase(getTeacherOpenMesssages.fulfilled, (state, action) => {
            state.openedMessage = action.payload;
         });
   },
});

export const { reset, setOpenStudent, resetOpenStudent, open_a_message } = messageSlice.actions;
export default messageSlice.reducer;
