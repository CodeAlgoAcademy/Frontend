import { LevelThresholdInputProps } from "@/components/parents/UI/levelthreshold";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { screentimeTypes } from "types/interfaces/parent.interface";
import { BaseStudent, ITeacherStudentsState } from "types/interfaces/teacherstudent.interface";
import { getStudents } from "./studentSlice";
import teachersStudentServices from "services/teachersStudentservices";
import { errorResolver } from "utils/errorResolver";
import { closePreloader, openPreloader } from "./fetchSlice";
import { setTimeLimit } from "utils/useMultiForm";
import { SkillData } from "@/components/parents/student/Skills";

interface FetchStudentBlockGameProgressArgs {
   classId: string | number;
   studentId: string | number;
}

const initialState: ITeacherStudentsState = {
   students: [],
   currentStudent: {
      id: "",
      codingExperience: "",
      classId: "",
      dob: "",
      fullName: "",
      firstName: "",
      lastName: "",
      username: "",
      timeLimits: [
         {
            dayOfTheWeek: "Monday",
            timeLimit: "",
            id: "",
         },
         {
            dayOfTheWeek: "Tuesday",
            timeLimit: "",
            id: "",
         },
         {
            dayOfTheWeek: "Wednesday",
            timeLimit: "",
            id: "",
         },
         {
            dayOfTheWeek: "Thursday",
            timeLimit: "",
            id: "",
         },
         {
            dayOfTheWeek: "Friday",
            timeLimit: "",
            id: "",
         },
         {
            dayOfTheWeek: "Saturday",
            timeLimit: "",
            id: "",
         },
         {
            dayOfTheWeek: "Sunday",
            timeLimit: "",
            id: "",
         },
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
      levelThresholds: [],
      student_id: "",
   },
   codingExperience: "experienced",
   id: "",
   dob: "",
   firstName: "",
   lastName: "",
   fullName: "",
   username: "",
   friend: "",
   timeLimits: [
      {
         dayOfTheWeek: "Monday",
         timeLimit: "No Limit",
         id: "",
      },
      {
         dayOfTheWeek: "Tuesday",
         timeLimit: "No Limit",
         id: "",
      },
      {
         dayOfTheWeek: "Wednesday",
         timeLimit: "No Limit",
         id: "",
      },
      {
         dayOfTheWeek: "Thursday",
         timeLimit: "No Limit",
         id: "",
      },
      {
         dayOfTheWeek: "Friday",
         timeLimit: "No Limit",
         id: "",
      },
      {
         dayOfTheWeek: "Saturday",
         timeLimit: "No Limit",
         id: "",
      },
      {
         dayOfTheWeek: "Sunday",
         timeLimit: "No Limit",
         id: "",
      },
   ],
   levelThresholds: [],
   classId: "",
   isLoading: false,
   error: undefined,
   student_id: "",
};

export const createOrUpdateLevelThreshold: any = createAsyncThunk(
   "class/student/createOrUpdateLevelThreshold",
   async ({ class_id, student_id, data }: { class_id: number; student_id: number; data: { level: number; grade: string } }, thunkAPI) => {
      try {
         const response = await teachersStudentServices.createStudentLevelThresHold(data, class_id, student_id);
         return response;
      } catch (error: any) {
         const errorMessage = errorResolver(error);
         return thunkAPI.rejectWithValue(errorMessage);
      }
   }
);

export const editSudentsScreentime = createAsyncThunk(
   "teacher/student/edit-screentime",
   async (
      {
         class_id,
         student_id,
         id,
         data,
      }: {
         class_id: string | number;
         student_id: string | number;
         id: string | number;
         data: screentimeTypes;
      },
      thunkAPI
   ) => {
      const dispatch = thunkAPI.dispatch;
      data.timeLimit = setTimeLimit(data.timeLimit as string);
      dispatch(openPreloader({ loadingText: "Editing student Screentime" }));

      try {
         const response = await teachersStudentServices.editStudentScreentimeteachers(data, class_id, student_id, id);
         dispatch(closePreloader());
         return response;
      } catch (error: any) {
         const errorMessage = errorResolver(error);
         dispatch(closePreloader());
         return thunkAPI.rejectWithValue(errorMessage);
      }
   }
);

export const fetchStudentBlockGameProgress = createAsyncThunk(
   "blockGame/getProgress",
   async ({ classId, studentId }: FetchStudentBlockGameProgressArgs, thunkAPI) => {
      try {
         return await teachersStudentServices.getStudentBlockGameProgress(classId, studentId);
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
   }
);
export const fetchStudentBlockGameSkill = createAsyncThunk(
   "blockGame/getProgressSkill",
   async ({ classId, studentId }: FetchStudentBlockGameProgressArgs, thunkAPI) => {
      try {
         return await teachersStudentServices.getStudentBlockGameSkill(classId, studentId);
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
   }
);

export const getStudentBlockGameStandard = createAsyncThunk(
   "blockGame/getProgressStandard",
   async ({ classId, studentId }: FetchStudentBlockGameProgressArgs, thunkAPI) => {
      try {
         return await teachersStudentServices.getStudentBlockGameStandard(classId, studentId);
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
   }
);

export const deleteStudent = createAsyncThunk(
   "teacher/student/delete",
   async ({ classId, studentId }: { classId: string | number; studentId: string | number }, thunkAPI) => {
      const dispatch = thunkAPI.dispatch;
      dispatch(openPreloader({ loadingText: "Deleting student..." }));

      try {
         const response = await teachersStudentServices.deleteStudent(classId, studentId);
         dispatch(closePreloader());
         return { studentId };
      } catch (error: any) {
         const errorMessage = errorResolver(error);
         dispatch(closePreloader());
         return thunkAPI.rejectWithValue(errorMessage);
      }
   }
);

export const teacherStudentSlice = createSlice({
   name: "teacherStudent",
   initialState,
   reducers: {
      updateStudent: (state, action: PayloadAction<{ key: keyof BaseStudent; value: any }>) => {
         if (state.currentStudent) {
            state.currentStudent[action.payload.key] = action.payload.value as never;
         }
      },
      resetStudent: (state) => {
         return { ...initialState, students: state.students, currentStudent: state.currentStudent };
      },
      resetScreenTime: (state) => {
         if (state.currentStudent && initialState.currentStudent) {
            state.currentStudent.timeLimits = [...initialState.currentStudent.timeLimits];
         }
      },
      updateScreenTime: (state, action: PayloadAction<{ day: string; hour: number | "No Limit" }>) => {
         if (state.currentStudent) {
            state.currentStudent.timeLimits = state.currentStudent.timeLimits.map((time) => {
               if (time.dayOfTheWeek === action.payload.day) {
                  time.timeLimit = action.payload.hour;
               }
               return time;
            });
         }
      },
      changeCurrentStudent: (state: ITeacherStudentsState, action: PayloadAction<BaseStudent>) => {
         state.currentStudent = action.payload;
      },
   },
   extraReducers(builder) {
      builder
         .addCase(getStudents.fulfilled, (state, action: PayloadAction<BaseStudent[]>) => {
            state.students = action.payload;
            const student = action.payload.find((s) => s.id === state.currentStudent?.id);
            state.currentStudent = student || action.payload[0] || null;
         })
         .addCase(fetchStudentBlockGameSkill.fulfilled, (state, action: PayloadAction<SkillData[]>) => {
            if (state.currentStudent) {
               state.currentStudent.skills = action.payload.map((skill, index) => ({
                  id: index,
                  title: skill.name,
                  level: skill.value,
               }));
            }
            state.isLoading = false;
         })
         .addCase(editSudentsScreentime.fulfilled, (state, action: PayloadAction<screentimeTypes[]>) => {
            if (state.currentStudent) state.currentStudent.timeLimits = action.payload;
         })
         .addCase(createOrUpdateLevelThreshold.fulfilled, (state, action: PayloadAction<LevelThresholdInputProps>) => {
            if (state.currentStudent) {
               if (!state.currentStudent.levelThresholds) state.currentStudent.levelThresholds = [];
               const idx = state.currentStudent.levelThresholds.findIndex((t) => t.grade === action.payload.grade);
               if (idx >= 0) {
                  state.currentStudent.levelThresholds[idx] = action.payload;
               } else {
                  state.currentStudent.levelThresholds.push(action.payload);
               }
            }
         })
       .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
  (student) => String(student.id) !== String(action.payload.studentId)
);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.error = action.payload as string;
      });
   },
});

export const { updateStudent, resetStudent, updateScreenTime, resetScreenTime, changeCurrentStudent } = teacherStudentSlice.actions;
export default teacherStudentSlice.reducer;
