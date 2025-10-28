import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersStudentServices from "services/usersservices";
import { StudentProfile } from "types/interfaces/users.interface";


export interface StudentInfoState {
  student: StudentProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: StudentInfoState = {
  student: null,
  loading: false,
  error: null,
};


export const fetchStudentInfo = createAsyncThunk(
  "studentInfo/fetchStudentInfo",
  async (_, { rejectWithValue }) => {
    try {
      const data = await usersStudentServices.getUserStudentInfo();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch student info");
    }
  }
);

const studentInfoSlice = createSlice({
  name: "studentInfo",
  initialState,
  reducers: {
    clearStudentInfo: (state) => {
      state.student = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(fetchStudentInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearStudentInfo } = studentInfoSlice.actions;
export default studentInfoSlice.reducer;
