import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
   CTSA_ONE,
   CTSA_THREE,
   CTSA_TWO,
   KANSAS_FIVE,
   KANSAS_FOUR,
   KANSAS_ONE,
   KANSAS_SEVEN,
   KANSAS_SIX,
   KANSAS_THREE,
   KANSAS_TWO,
   MISSOURI_FIVE,
   MISSOURI_FOUR,
   MISSOURI_ONE,
   MISSOURI_SEVEN,
   MISSOURI_SIX,
   MISSOURI_THREE,
   MISSOURI_TWO,
   NEW_YORK_FOUR,
   NEW_YORK_ONE,
   NEW_YORK_THREE,
   NEW_YORK_TWO,
} from "utils/allSkill";
import { SkillDetails } from "../types/interfaces";

const initialState: SkillDetails[] = CTSA_ONE;

const skillsSlice = createSlice({
   name: "skills",
   initialState,
   reducers: {
      updateSkills: (
         state: SkillDetails[],
         action: PayloadAction<{
            skillType: string;
            grade: string;
         }>
      ) => {
         const grade = action.payload.grade;
         const skillType = action.payload.skillType;
         switch (skillType) {
            case "CTSA":
               if (grade === "Kindergarden" || grade === "Grade 1" || grade === "Grade 2") {
                  return CTSA_ONE;
               } else if (grade === "Grade 3" || grade === "Grade 4" || grade === "Grade 5") {
                  return CTSA_TWO;
               } else if (grade === "Grade 6" || grade === "Grade 7" || grade === "Grade 8") {
                  return CTSA_THREE;
               }
               break;
            case "Kansas":
               if (grade === "Kindergarden") {
                  return KANSAS_ONE;
               } else if (grade === "Grade 1") {
                  return KANSAS_TWO;
               } else if (grade === "Grade 2") {
                  return KANSAS_THREE;
               } else if (grade === "Grade 3") {
                  return KANSAS_FOUR;
               } else if (grade === "Grade 4") {
                  return KANSAS_FIVE;
               } else if (grade === "Grade 5") {
                  return KANSAS_SIX;
               } else if (grade === "Grade 6" || grade === "Grade 7" || grade === "Grade 8") {
                  return KANSAS_SEVEN;
               }
               break;
            case "New York":
               if (grade === "Kindergarden" || grade === "Grade 1") {
                  return NEW_YORK_ONE;
               } else if (grade === "Grade 2" || grade === "Grade 3") {
                  return NEW_YORK_TWO;
               } else if (grade === "Grade 4" || grade === "Grade 5" || grade === "Grade 6") {
                  return NEW_YORK_THREE;
               } else if (grade === "Grade 7" || grade === "Grade 8") {
                  return NEW_YORK_FOUR;
               }
               break;
            case "Missouri":
               if (grade === "Kindergarden") {
                  return MISSOURI_ONE;
               } else if (grade === "Grade 1") {
                  return MISSOURI_TWO;
               } else if (grade === "Grade 2") {
                  return MISSOURI_THREE;
               } else if (grade === "Grade 3") {
                  return MISSOURI_FOUR;
               } else if (grade === "Grade 4") {
                  return MISSOURI_FIVE;
               } else if (grade === "Grade 5") {
                  return MISSOURI_SIX;
               } else if (grade === "Grade 6" || grade === "Grade 7" || grade === "Grade 8") {
                  return MISSOURI_SEVEN;
               }
               break;
            default:
               break;
         }
      },
      searchSkills: (
         state: SkillDetails[],
         action: PayloadAction<{
            params: string;
            grade: string;
            skillType: string;
         }>
      ) => {
         let mainState: SkillDetails[] = CTSA_ONE;
         const grade = action.payload.grade;
         const skillType = action.payload.skillType;
         switch (skillType) {
            case "CTSA":
               if (grade === "Kindergarden" || grade === "Grade 1" || grade === "Grade 2") {
                  mainState = CTSA_ONE;
               } else if (grade === "Grade 3" || grade === "Grade 4" || grade === "Grade 5") {
                  mainState = CTSA_TWO;
               } else if (grade === "Grade 6" || grade === "Grade 7" || grade === "Grade 8") {
                  mainState = CTSA_THREE;
               }
               break;
            case "Kansas":
               if (grade === "Kindergarden") {
                  mainState = KANSAS_ONE;
               } else if (grade === "Grade 1") {
                  mainState = KANSAS_TWO;
               } else if (grade === "Grade 2") {
                  mainState = KANSAS_THREE;
               } else if (grade === "Grade 3") {
                  mainState = KANSAS_FOUR;
               } else if (grade === "Grade 4") {
                  mainState = KANSAS_FIVE;
               } else if (grade === "Grade 5") {
                  mainState = KANSAS_SIX;
               } else if (grade === "Grade 6" || grade === "Grade 7" || grade === "Grade 8") {
                  mainState = KANSAS_SEVEN;
               }
               break;
            case "New York":
               if (grade === "Kindergarden" || grade === "Grade 1") {
                  mainState = NEW_YORK_ONE;
               } else if (grade === "Grade 2" || grade === "Grade 3") {
                  mainState = NEW_YORK_TWO;
               } else if (grade === "Grade 4" || grade === "Grade 5" || grade === "Grade 6") {
                  mainState = NEW_YORK_THREE;
               } else if (grade === "Grade 7" || grade === "Grade 8") {
                  mainState = NEW_YORK_FOUR;
               }
               break;
            case "Missouri":
               if (grade === "Kindergarden") {
                  mainState = MISSOURI_ONE;
               } else if (grade === "Grade 1") {
                  mainState = MISSOURI_TWO;
               } else if (grade === "Grade 2") {
                  mainState = MISSOURI_THREE;
               } else if (grade === "Grade 3") {
                  mainState = MISSOURI_FOUR;
               } else if (grade === "Grade 4") {
                  mainState = MISSOURI_FIVE;
               } else if (grade === "Grade 5") {
                  mainState = MISSOURI_SIX;
               } else if (grade === "Grade 6" || grade === "Grade 7" || grade === "Grade 8") {
                  mainState = MISSOURI_SEVEN;
               }
               break;
            default:
               break;
         }
         const filteredState: SkillDetails[] = mainState?.filter((item) => {
            let testNames = "";
            item.tests.forEach((test) => {
               testNames = `${testNames} ${test.testTitle}`.trim();
            });
            return (
               item.categoryTitle.includes(action.payload.params) ||
               item.categoryTitle.toLowerCase().includes(action.payload.params) ||
               testNames.includes(action.payload.params) ||
               testNames.toLowerCase().includes(action.payload.params) ||
               item.categoryId.includes(action.payload.params) ||
               item.categoryId.toLowerCase().includes(action.payload.params.toLowerCase())
            );
         });
         return filteredState;
      },
   },
});

export default skillsSlice.reducer;
export const { updateSkills, searchSkills } = skillsSlice.actions;
