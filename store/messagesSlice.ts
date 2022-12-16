import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserConversation, User } from "types/interfaces";
import messageService from "services/messagesService";

const initialState: IUserConversation = {
    conversations: [],
    openedMessageStudent: null,
    openedStudentMessages: []
}

export const getConversations: any = createAsyncThunk('teacher/conversations', async(_, thunkAPI) => {
    try {
        return await messageService.getConversations();
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getOpenMesssages: any = createAsyncThunk('teacher/student/messages', async(_, thunkAPI) => {
    try {
        const state: any = thunkAPI.getState();
        const student = state.messages.openedMessageStudent;
        return await messageService.getMessages(student);
    } catch (error: any) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const messageSlice = createSlice({
    initialState,
    name: 'messages',
    reducers: {
        reset: (state: IUserConversation | any) => initialState,
        setOpenStudent: (state: IUserConversation, action: PayloadAction<number>) => {
            state.openedMessageStudent = action.payload
        },
        resetOpenStudent: (state: IUserConversation | any) => {
            state.openedMessageStudent = initialState.openedMessageStudent
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getConversations.pending, () => {
                console.log("Loading...");
            })
            .addCase(getConversations.rejected, (state: IUserConversation | any) => {
                state.conversations = initialState.conversations
                console.log('Error......')
            })
            .addCase(getConversations.fulfilled, (state: IUserConversation | any, action: PayloadAction<IUserConversation>) => {
                state.conversations = action.payload;
            })
            .addCase(getOpenMesssages.pending, () => {
                console.log('Loading...')
            })
            .addCase(getOpenMesssages.rejected, (_, action) => {
                console.log(`Error: ${action.payload}`)
            })
            .addCase(getOpenMesssages.fulfilled, (state, action) => {
                state.openedStudentMessages = action.payload
            })
    },
})

export const { reset, setOpenStudent, resetOpenStudent } = messageSlice.actions;
export default messageSlice.reducer;