import {
  availableLevels,
  availableUnits,
} from "@/components/curriculum/addUnit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUnitsSlice } from "types/interfaces";

const initialState: IUnitsSlice = {
  addUnit: {
    standard: "",
    units: [],
    levels: [],
    grades: [],
    chosenGrades: [],
  },
};

const unitsSlice = createSlice({
  name: "unitsSlice",
  initialState,
  reducers: {
    updateStandard: (
      state: IUnitsSlice,
      action: PayloadAction<{ value: string }>
    ) => {
      state.addUnit.standard = action.payload.value;
    },
    updateLevels: (
      state: IUnitsSlice,
      action: PayloadAction<{ value: string; type: string }>
    ) => {
      if (action.payload.type === "remove") {
        state.addUnit.levels = state.addUnit.levels.filter(
          (level) => level !== action.payload.value
        );
      } else if (action.payload.type === "add") {
        state.addUnit.levels = [...state.addUnit.levels, action.payload.value];
      }
    },
    displayUnitsAndGradesBasedOnLevels: (state: IUnitsSlice) => {
      let grades: string[] = [];
      let units: any = [];
      availableLevels.map((level) => {
        if (state.addUnit.levels.includes(level.level)) {
          grades = [...grades, ...level.grades];

          // find the units from availableUnits
          const unitFromAvailableUnits = level.units.map((unit) =>
            availableUnits.find((availableUnit) => availableUnit.unit === unit)
          );
          units = [...units, ...unitFromAvailableUnits];
        }
      });
      console.log(units);
      state.addUnit.grades = grades;
      state.addUnit.units = units;
    },
    updateUnits: (
      state: IUnitsSlice,
      action: PayloadAction<{ id: string; type: string; value?: string }>
    ) => {
      state.addUnit.units = state.addUnit.units.map((unit) => {
        const date = new Date();
        if (action.payload.id === unit.id) {
          if (action.payload.type === "current") {
            unit.isCurrent = true;
            unit.date = "";
          } else {
            unit.isCurrent = false;
            // format: yyyy-mm-dd just like a normal date input element
            unit.date = action.payload.value
              ? (action.payload.value as string)
              : `${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`;
          }
        }
        return unit;
      });
    },
    updateGrades: (
      state: IUnitsSlice,
      action: PayloadAction<{ value: string; type: string }>
    ) => {
      if (action.payload.type === "remove") {
        state.addUnit.chosenGrades = state.addUnit.chosenGrades.filter(
          (grade) => grade !== action.payload.value
        );
      } else if (action.payload.type === "add") {
        state.addUnit.chosenGrades = [
          ...state.addUnit.chosenGrades,
          action.payload.value,
        ];
      }
    },
    clearAddUnitsParams: (state: IUnitsSlice) => {
      state.addUnit = initialState.addUnit;
    },
  },
});

export const {
  updateStandard,
  displayUnitsAndGradesBasedOnLevels,
  updateLevels,
  updateUnits,
  updateGrades,
  clearAddUnitsParams,
} = unitsSlice.actions;
export default unitsSlice.reducer;
