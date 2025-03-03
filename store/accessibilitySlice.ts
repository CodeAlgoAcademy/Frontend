import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { accessibility_functions } from "public/data";
import { AccessibilityFeatures, AccessibilitySlice } from "types/interfaces/accessibility.interface";

const initialState: AccessibilitySlice = {
   features: {
      "bigger text": 0,
      "contrast +": 0,
      cursor: 0,
      dictionary: 0,
      "hide images": 0,
      "highlight links": 0,
      "line height": 0,
      "pause animations": 0,
      saturation: 0,
      "screen reader": 0,
      "text align": 0,
      "text spacing": 0,
      "legible fonts": 0,
   },
   oversizedWidgets: false,
};

export const accessibilitySlice = createSlice({
   name: "accessibilitySlice",
   initialState,
   reducers: {
      reset(state) {
         state.features = initialState.features;
         state.oversizedWidgets = false;
      },
      toggleWidgetsSize(state) {
         state.oversizedWidgets = !state.oversizedWidgets;
      },
      increaseFeatureCount(state, action: PayloadAction<AccessibilityFeatures>) {
         const maxCount = accessibility_functions[action.payload].length - 1;

         if (state.features[action.payload] === maxCount) {
            state.features[action.payload] = 0;
         } else {
            state.features[action.payload] += 1;
         }
      },
      setProfileFeatures(state, action: PayloadAction<Partial<AccessibilitySlice["features"]>>) {
         state.features = { ...initialState.features, ...action.payload };
      },
   },
});

export default accessibilitySlice.reducer;

export const accessibilityActions = accessibilitySlice.actions;
