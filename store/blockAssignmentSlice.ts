import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assignmentServices from "services/block_assignments";
import {
  AssignmentListItem,
  BlockStandardWithTopics,
  CreateAssignmentPayload,
} from "types/interfaces/assignments";

interface AssignmentState {
  assignments: AssignmentListItem[];
  skillPickerStandards: BlockStandardWithTopics[];
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentState = {
  assignments: [],
  skillPickerStandards: [],
  loading: false,
  error: null,
};

export const fetchSkillPicker = createAsyncThunk(
  "assignments/fetchSkillPicker",
  async ({ classId, grade }: { classId: string | number; grade?: string }) => {
    return await assignmentServices.getSkillPicker(classId, grade);
  }
);

export const fetchClassAssignments = createAsyncThunk(
  "assignments/fetchClassAssignments",
  async (classId: string | number) => {
    return await assignmentServices.getClassAssignments(classId);
  }
);

export const createAssignment = createAsyncThunk(
  "assignments/createAssignment",
  async ({
    classId,
    data,
  }: {
    classId: string | number;
    data: CreateAssignmentPayload;
  }) => {
    return await assignmentServices.createAssignment(classId, data);
  }
);

export const archiveAssignment = createAsyncThunk(
  "assignments/archiveAssignment",
  async ({
    classId,
    assignmentId,
  }: {
    classId: string | number;
    assignmentId: string | number;
  }) => {
    await assignmentServices.archiveAssignment(classId, assignmentId);
    return assignmentId;
  }
);

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillPicker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillPicker.fulfilled, (state, action) => {
        state.loading = false;
        state.skillPickerStandards = action.payload;
      })
      .addCase(fetchSkillPicker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch skills";
      })
      .addCase(fetchClassAssignments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchClassAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch assignments";
      })
      .addCase(createAssignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments.unshift(action.payload);
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create assignment";
      })
      .addCase(archiveAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter(
          (a) => a.id !== action.payload
        );
      });
  },
});

export const { clearError, resetState } = assignmentSlice.actions;
export default assignmentSlice.reducer;