import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "axios.config";
import studentService from "services/studentService";
import { IUserStudent, Student } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";
import { openErrorModal } from "./fetchSlice";
import { RootState } from "./store";

const initialState: IUserStudent = {
  newStudent: null,
  students: [],
  studentComments: [],
};

export const addStudent: any = createAsyncThunk(
  "new/student",
  async (data: Student, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const { id } = state.currentClass;
    try {
      return await studentService.addStudent(data, id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getStudents: any = createAsyncThunk(
  "get/students",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const { id } = state.currentClass;
    try {
      return await studentService.getStudents(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getStudentComment: any = createAsyncThunk(
  "get/student/comment",
  async (params: { id: string; comment: string }, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    try {
      const { data } = await http.get(
        "/academics/comment/student/" + params.id,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(openErrorModal({ errorText: [message] }));
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const addStudentComment: any = createAsyncThunk(
  "add/student/comment",
  async (params: { id: string; comment: string }, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    try {
      const { data } = await http.post(
        "/academics/comment/student/" + params.id,
        { text: params.comment },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(openErrorModal({ errorText: [message] }));
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateStudentComment: any = createAsyncThunk(
  "add/student/comment",
  async (params: { id: string; comment: string }, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    try {
      const { data } = await http.put(
        "/academics/comment/" + params.id,
        { text: params.comment },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(openErrorModal({ errorText: [message] }));
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteStudentComment: any = createAsyncThunk(
  "add/student/comment",
  async (params: { id: string }, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    try {
      const { data } = await http.delete("/academics/comment/" + params.id, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch(openErrorModal({ errorText: [message] }));
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addStudent.pending, () => {
        console.log("Loading...");
      })
      .addCase(addStudent.rejected, (_, action) => {
        console.log(`Error: ${action.payload}`);
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getStudents.pending, () => {
        console.log("Loading...");
      })
      .addCase(getStudents.rejected, (_, action) => {
        console.log(`Error: ${action.payload}`);
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        console.log(action.payload);
        state.students = action.payload;
      })
      .addCase(getStudentComment.pending, (_, action) => {
        console.log("Loading...");
      })
      .addCase(getStudentComment.rejected, (_, action) => {
        console.log(`Error: ${action.payload}`);
      })
      .addCase(getStudentComment.fulfilled, (state, action) => {
        state.studentComments = action.payload;
      })
      .addCase(updateStudentComment.pending, (_, action) => {
        console.log("updating comment...");
      });
  },
});

export const {} = studentSlice.actions;
export default studentSlice.reducer;
