import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccessibilityFeatures, AccessibilitySlice } from "types/interfaces/accessibility.interface";

const initialState: AccessibilitySlice = {
   features: [],
};

export const accessibilitySlice = createSlice({
   name: "accessibilitySlice",
   initialState,
   reducers: {
      reset(state) {
         state.features = initialState.features;
      },

      addFeature(state, action: PayloadAction<AccessibilityFeatures>) {
         if (!state.features.includes(action.payload)) {
            state.features = [...state.features, action.payload];
         }
      },

      removeFeature(state, action: PayloadAction<AccessibilityFeatures>) {
         if (state.features.includes(action.payload)) {
            state.features = [...state.features.filter((feat) => feat != action.payload)];
         }
      },
   },
});

export default accessibilitySlice.reducer;

export const accessibilityActions = accessibilitySlice.actions;
