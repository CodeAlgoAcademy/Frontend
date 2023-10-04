import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "axios.config";
import studentService from "services/studentService";
import { IUserStudent, ISingleStudent } from "types/interfaces";
import { errorResolver } from "utils/errorResolver";
import { getAccessToken } from "utils/getTokens";
import { closePreloader, openErrorModal, openPreloader } from "./fetchSlice";
import { RootState } from "./store";
import { setTimeLimit } from "utils/useMultiForm";

const initialState: IUserStudent = {
   newStudent: null,
   students: [],
   studentComments: [],
   currentStudent: undefined,
};

export const addStudent: any = createAsyncThunk("new/student", async (data: ISingleStudent, thunkAPI) => {
   const state = <RootState>thunkAPI.getState();
   const { id } = state.currentClass;
   const dispatch = thunkAPI.dispatch;
   dispatch(openPreloader({ loadingText: "Adding Student(s)" }));

   data.timeLimits = data.timeLimits?.map((timeInfo) => ({ ...timeInfo, timeLimit: setTimeLimit(timeInfo.timeLimit as string) }));

   try {
      const student = await studentService.addStudent(data, id as string);
      dispatch(closePreloader());
      return student;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkAPI.rejectWithValue(errorMessage);
   }
});

export const editStudent: any = createAsyncThunk("edit/student", async (student: any, thunkApi) => {
   const state = <RootState>thunkApi.getState();
   const { id } = state.currentClass;
   const dispatch = thunkApi.dispatch;
   dispatch(openPreloader({ loadingText: "Editing Student's Details" }));
   try {
      const response = await http.put(
         `/academics/class/${id}/student/${student.id}`,
         {
            student: {
               firstName: student.firstName,
               lastName: student.lastName,
               email: student.email,
            },
         },
         {
            headers: {
               Authorization: `Bearer ${getAccessToken()}`,
            },
         }
      );
      dispatch(closePreloader());
      return response;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const getStudents: any = createAsyncThunk("get/students", async (_, thunkAPI) => {
   const state = <RootState>thunkAPI.getState();
   const { id } = state.currentClass;
   try {
      return await studentService.getStudents(id as string);
   } catch (error: any) {
      // const errorMessage = errorResolver(error);
      // return thunkAPI.rejectWithValue(errorMessage);
   }
});

export const getSingleStudent: any = createAsyncThunk(
   "get/single-student",
   async ({ classId, studentId }: { classId: number; studentId: number }, thunkApi) => {
      const state = <RootState>thunkApi.getState();

      try {
         const data = await studentService.getSingleStudent(classId, studentId);

         return data;
      } catch (error: any) {
         return thunkApi.rejectWithValue(error.message);
      }
   }
);

export const getStudentComment: any = createAsyncThunk("get/student/comment", async (params: { id: string; comment: string }, thunkApi) => {
   const dispatch = thunkApi.dispatch;
   try {
      const { data } = await http.get("/academics/comment/student/" + params.id, {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      });
      return data;
   } catch (error: any) {
      // const errorMessage = errorResolver(error);
      // return thunkApi.rejectWithValue(errorMessage);
   }
});

export const addStudentComment: any = createAsyncThunk("add/student/comment", async (params: { id: string; comment: string }, thunkApi) => {
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
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const updateStudentComment: any = createAsyncThunk("add/student/comment", async (params: { id: string; comment: string }, thunkApi) => {
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
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const deleteStudentComment: any = createAsyncThunk("add/student/comment", async (params: { id: string }, thunkApi) => {
   const dispatch = thunkApi.dispatch;
   try {
      const { data } = await http.delete("/academics/comment/" + params.id, {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      });
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});
export const studentsBulkImport: any = createAsyncThunk("newStudents/bulkImport", async (formData, thunkApi) => {
   const state = <RootState>thunkApi.getState();
   const dispatch = thunkApi.dispatch;
   const { id } = state.currentClass;
   dispatch(openPreloader({ loadingText: "Adding Student" }));
   try {
      const { data } = await http.post(`/academics/class/${id}/student/file`, formData, {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": "multipart/form-data",
         },
      });
      dispatch(closePreloader());
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const studentSlice = createSlice({
   name: "students",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder
         .addCase(getStudents.fulfilled, (state, action) => {
            state.students = action.payload;
         })
         .addCase(getStudentComment.fulfilled, (state, action) => {
            state.studentComments = action.payload;
         })
         .addCase(getSingleStudent.fulfilled, (state, action: PayloadAction<ISingleStudent>) => {
            state.currentStudent = action.payload;
         });
   },
});

export default studentSlice.reducer;
