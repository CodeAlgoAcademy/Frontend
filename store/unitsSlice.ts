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
    levels: "",
    grades: [],
    chosenGrades: [],
    unitsWithError: [],
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
    },
    updateLevels: (
      state: IUnitsSlice,
      action: PayloadAction<{ value: string; type: string }>
    ) => {
      state.addUnit.levels = action.payload.value;
    },
    displayUnitsAndGradesBasedOnLevels: (state: IUnitsSlice) => {
      let grades: string[] = [];
      let units: any = [];
      availableLevels.map((level) => {
        if (state.addUnit.levels === level.title) {
          grades = [...grades, ...level.grades];

          // find the units from availableUnits
          const unitFromAvailableUnits = level.unitsId.map((unitId: string) =>
            availableUnits.find((availableUnit) => availableUnit.id === unitId)
          );
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
          const level = availableLevels.find(
            (level) =>
              level.unitsId.includes(`${unit.id}`) &&
              state.addUnit.levels === level.title
          );

          unitObject.level = level?.title.toLowerCase();
          units.push(unitObject);
        });
      state.addUnit.rearrangedUnits = units;
    },
    verifyUnits: (state: IUnitsSlice, action: PayloadAction) => {
      state.addUnit.unitsWithError = [];
      // check the end date, start date and compare with todays date
      const today: { day: number; month: number; year: number } = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      };
      const errors: string[] = [];
      state.addUnit.units
        .filter((unit) => unit.isChosen)
        .forEach((unit) => {
          if (unit.startDate && unit.endDate) {
            const startDate: string[] = unit.startDate.split("-");
            const endDate: string[] = unit.endDate.split("-");
            const startDateDetails: {
              day: number;
              month: number;
              year: number;
            } = {
              day: parseInt(startDate[2]),
              month: parseInt(startDate[1]),
              year: parseInt(startDate[0]),
            };
            const endDateDetails: { day: number; month: number; year: number } =
              {
                day: parseInt(endDate[2]),
                month: parseInt(endDate[1]),
                year: parseInt(endDate[0]),
              };

            // if start date === end date
            // if it is current and start date isn't today
            if (
              (startDateDetails.year !== today.year ||
                startDateDetails.month !== today.month ||
                startDateDetails.day !== today.day) &&
              unit.isCurrent
            ) {
              errors.push(
                `${unit.title} unit start date should be today's date`
              );
            }
            // if upcoming and start date is today
            if (
              startDateDetails.year === today.year &&
              startDateDetails.month === today.month &&
              startDateDetails.day === today.day &&
              !unit.isCurrent
            ) {
              errors.push(
                `${unit.title} unit start date should be a future date since it is upcoming`
              );
            }
            // if start date is less than today's date and it is upcoming
            if (
              startDateDetails.year < today.year ||
              (startDateDetails.year === today.year &&
                startDateDetails.month > today.month) ||
              (startDateDetails.year === today.year &&
                startDateDetails.month === today.month &&
                startDateDetails.day < today.day)
            ) {
              if (!unit.isCurrent) {
                errors.push(
                  `${unit.title} unit start date should be after today's date`
                );
              }
            }
            // if end date is less than or is today's date
            if (
              endDateDetails.year < today.year ||
              (endDateDetails.year === today.year &&
                endDateDetails.month > today.month) ||
              (endDateDetails.year === today.year &&
                endDateDetails.month === today.month &&
                endDateDetails.day <= today.day)
            ) {
              errors.push(
                `${unit.title} unit end date should be after it's start date and after today's date`
              );
            }
            //  if start date is greater than end date
            if (
              startDateDetails.year > endDateDetails.year ||
              (startDateDetails.year === endDateDetails.year &&
                startDateDetails.month > endDateDetails.month) ||
              (startDateDetails.year === endDateDetails.year &&
                startDateDetails.month === endDateDetails.month &&
                startDateDetails.day > endDateDetails.day)
            ) {
              errors.push(
                `${unit.title} unit end date should be after it's start date and after today's date`
              );
            }
          } else {
            errors.push(`${unit.title} unit does not have a start/end date`);
          }
        });
      state.addUnit.unitsWithError = errors;
    },
  },
  extraReducers: {
    [addUnits.pending]: (state: IUnitsSlice) => {
      console.log("pending");
    },
    [addUnits.fulfilled]: (state: IUnitsSlice, action: PayloadAction) => {
      console.log("fulfilled");
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
  verifyUnits,
} = unitsSlice.actions;
export default unitsSlice.reducer;
