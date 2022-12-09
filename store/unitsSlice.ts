import {
  availableLevels,
  availableUnits,
} from "@/components/curriculum/addUnit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUnitsSlice } from "types/interfaces";
import { addUnits } from "services/curriculumService";

const initialState: IUnitsSlice = {
  addUnit: {
    standard: "",
    units: [],
    rearrangedUnits: [],
    levels: [],
    grades: [],
    chosenGrades: [],
  },
};

const getDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  }`;
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
        if (state.addUnit.levels.includes(level.title)) {
          grades = [...grades, ...level.grades];

          // find the units from availableUnits
          const unitFromAvailableUnits = level.unitsId.map((unitId: string) =>
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
            unit.startDate = getDate();
          } else if (action.payload.type === "upcoming") {
            if (unit.isCurrent && unit.isChosen) {
              unit.isChosen = true;
              unit.startDate = getDate();
            } else if (unit.isCurrent && !unit.isChosen) {
              unit.isChosen = true;
              unit.startDate = getDate();
            } else if (!unit.isCurrent && unit.isChosen) {
              unit.isChosen = false;
              unit.startDate = "";
            } else if (!unit.isCurrent && !unit.isChosen) {
              unit.isChosen = true;
              // format: yyyy-mm-dd just like a normal date input element
              unit.startDate = getDate();
            }
            unit.isCurrent = false;
          } else if (action.payload.type === "start date") {
            unit.isChosen = true;
            unit.isCurrent = false;
            unit.startDate = `${action.payload.value}`;
          } else if (action.payload.type === "end date") {
            unit.isChosen = true;
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
    rearrangeUnits: (state: IUnitsSlice) => {
      let units: any = [];
      state.addUnit.units
        .filter((unit) => unit.isChosen)
        .forEach((unit) => {
          const unitObject: any = {};
          unitObject.title = unit.title;
          unitObject.standard = state.addUnit.standard;
          unitObject.is_current = unit.isCurrent;
          unitObject.is_finished = false;
          unitObject.start_date = unit.startDate;
          unitObject.end_date = unit.endDate;
          unitObject.description = unit.hoverText;
          unitObject.teacher = "alisjjex@gmail.com";
          // check the levels that have that unit and get their grades
          const levelsWithUnit = availableLevels.filter((level) =>
            level.unitsId.includes(`${unit.id}`)
          );
          const levelsGrade: string[] = [];
          levelsWithUnit.forEach((level) => {
            level.grades.forEach((grade: string) => {
              levelsGrade.push(grade);
            });
          });
          let grades: string[] = levelsGrade.filter((grade) =>
            state.addUnit.chosenGrades.includes(grade)
          );

          unitObject.grades = grades.map((grade) => grade);

          // check how many levels it exists and make requests for each level
          const levels = availableLevels.filter(
            (level) =>
              level.unitsId.includes(`${unit.id}`) &&
              state.addUnit.levels.includes(level.title)
          );

          levels.forEach((level) => {
            const tempObject = { ...unitObject };
            tempObject.level = level.title.toLowerCase();
            units.push(tempObject);
          });
        });
      state.addUnit.rearrangedUnits = units;
    },
  },
  extraReducers: {
    [addUnits.pending]: (state: IUnitsSlice) => {
      console.log("pending");
    },
    [addUnits.fulfilled]: (state: IUnitsSlice, action: PayloadAction) => {
      console.log(action.payload);
    },
    [addUnits.rejected]: (state: IUnitsSlice, action: PayloadAction) => {
      console.log(action.payload);
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
  rearrangeUnits,
} = unitsSlice.actions;
export default unitsSlice.reducer;
