import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mathFactsService from "services/mathfact";
import { MathFactAnalyticsPair, StudentMathOverview } from "types/interfaces/mathfact";

interface MathFactState {
  overview: StudentMathOverview[];
  analytics: MathFactAnalyticsPair[];
  loading: boolean;
  analyticsLoading: boolean;
  error: string | null;
}

const initialState: MathFactState = {
  overview: [],
  analytics: [],
  loading: false,
  analyticsLoading: false,
  error: null,
};

export const fetchMathOverview = createAsyncThunk<StudentMathOverview[], string | number>(
  "mathFacts/fetchOverview",
  async (classId) => {
    return await mathFactsService.getAssignments(classId);
  }
);

export const fetchMathAnalytics = createAsyncThunk(
  "mathFacts/fetchAnalytics",
  async ({
    classId,
    studentId = "all",
    operation = "all",
  }: {
    classId: string | number;
    studentId?: string | number;
    operation?: string;
  }) => {
    return await mathFactsService.getAnalytics(classId, studentId, operation);
  }
);

const mathFactSlice = createSlice({
  name: "mathFacts",
  initialState,
  reducers: {
    resetMathState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMathOverview.pending, (state) => { state.loading = true; })
      .addCase(fetchMathOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(fetchMathOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load overview";
      })
      .addCase(fetchMathAnalytics.pending, (state) => { state.analyticsLoading = true; })
      .addCase(fetchMathAnalytics.fulfilled, (state, action) => {
        state.analyticsLoading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchMathAnalytics.rejected, (state) => { state.analyticsLoading = false; });
  },
});

export const { resetMathState } = mathFactSlice.actions;
export default mathFactSlice.reducer;