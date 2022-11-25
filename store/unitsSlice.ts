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
    // units: [...availableUnits]
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
      state.addUnit.levels = [];
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
          const unitFromAvailableUnits = level.unitsId.map((unitId) =>
            availableUnits.find((availableUnit) => availableUnit.id === unitId)
          );
          console.log(unitFromAvailableUnits);
          units = [...units, ...unitFromAvailableUnits];
        }
      });
      state.addUnit.grades = grades;
      state.addUnit.units = units.reduce((acc: any, currentUnit: any) => {
        if (!acc.find((accUnit: any) => accUnit.id === currentUnit.id)) {
          const unit: any = availableUnits.find(
            (availableUnit) => availableUnit.id == currentUnit.id
          );
          acc.push(unit);
        }
        return acc;
      }, []);
      state.addUnit.chosenGrades = [];
    },
    updateUnits: (
      state: IUnitsSlice,
      action: PayloadAction<{ id: string; type: string; value?: string }>
    ) => {
      state.addUnit.units = state.addUnit.units.map((unit) => {
        const date = new Date();
        if (action.payload.id === unit.id) {
          if (action.payload.type === "current") {
            if (unit.isCurrent && unit.isChosen) {
              unit.isChosen = false;
            } else if (
              (unit.isCurrent && !unit.isChosen) ||
              (!unit.isCurrent && !unit.isChosen)
            ) {
              unit.isChosen = true;
            }
            unit.isCurrent = true;
            unit.startDate = "";
          } else if (action.payload.type === "upcoming") {
            if (unit.isCurrent && unit.isChosen) {
              unit.isChosen = true;
              unit.startDate = `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`;
            } else if (unit.isCurrent && !unit.isChosen) {
              unit.isChosen = true;
              unit.startDate = `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`;
            } else if (!unit.isCurrent && unit.isChosen) {
              unit.isChosen = false;
              unit.startDate = "";
            } else if (!unit.isCurrent && !unit.isChosen) {
              unit.isChosen = true;
              // format: yyyy-mm-dd just like a normal date input element
              unit.startDate = `${date.getFullYear()}-${
                date.getMonth() + 1
              }-${date.getDate()}`;
            }
            unit.isCurrent = false;
          } else if (action.payload.type === "start date") {
            unit.isChosen = true;
            unit.isCurrent = false;
            unit.startDate = `${action.payload.value}`;
          } else if (action.payload.type === "end date") {
            unit.isChosen = true;
            unit.isCurrent = false;
            unit.endDate = `${action.payload.value}`;
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
