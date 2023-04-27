import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";
import { closePreloader, openErrorModal, openPreloader } from "store/fetchSlice";
import { Icurriculum } from "types/interfaces";
import { getDate } from "utils/getDate";
import { errorResolver } from "utils/errorResolver";

export const addUnits: any = createAsyncThunk("unitsSlice/addUnits", async (name, thunkApi) => {
   const state: any = thunkApi.getState();
   const dispatch = thunkApi.dispatch;
   const { levels, standard, chosenGrades, unitsWithError } = state.unit.addUnit;
   let { rearrangedUnits } = state.unit.addUnit;
   const { id } = state.currentClass;
   const units = rearrangedUnits.map((unit: any) => {
      return { ...unit, class_model: id };
   });
   const errors = [];

   if (standard === "") {
      errors.push("Please Select a standard");
   }
   if (levels === "") {
      errors.push("Please Select a level");
   }
   if (rearrangedUnits.length === 0) {
      errors.push("Please Select one or more units");
   }
   if (chosenGrades.length === 0) {
      errors.push("Please Select one or more grades");
   }
   unitsWithError.forEach((error: string) => errors.push(error));
   dispatch(openPreloader({ loadingText: "Adding Curriculum" }));
   try {
      if (errors.length === 0) {
         const { data } = await http.post("/academics/curriculums/units/", JSON.stringify(units), {
            headers: { Authorization: "Bearer " + getAccessToken() },
         });
         dispatch(closePreloader());
         return data;
      } else {
         dispatch(closePreloader());

         dispatch(openErrorModal({ errorText: [...errors] }));
      }
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const getAllCurriculums: any = createAsyncThunk("curriculumSlice/fetchCurriculum", async (name, thunkApi) => {
   const dispatch = thunkApi.dispatch;
   try {
      const { data } = await http.get("/academics/curriculums/units/", {
         headers: { Authorization: "Bearer " + getAccessToken() },
      });
      return data;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const deleteCurriculum: any = createAsyncThunk("curriculumSlice/deleteCurriculum", async (id: string, thunkApi) => {
   const dispatch = thunkApi.dispatch;
   dispatch(openPreloader({ loadingText: "Deleting Curriculum" }));
   try {
      const { data } = await http.delete(`/academics/curriculums/units/${id}`, {
         headers: {
            Authorization: "Bearer " + getAccessToken(),
         },
      });
      dispatch(closePreloader());
      dispatch(getAllCurriculums());
   } catch (error: any) {
      // const errorMessage = errorResolver(error);
      // return thunkApi.rejectWithValue(errorMessage);
   }
});

export const updateCurriculumToPast: any = createAsyncThunk(
   "curriculumSlice/updateCurriculum",
   async (params: { curriculum: Icurriculum; id: number }, thunkApi) => {
      const rearrangedUnit: Icurriculum = {
         ...params.curriculum,
         is_current: false,
         is_finished: true,
         end_date: getDate(),
      };
      const dispatch = thunkApi.dispatch;
      dispatch(openPreloader({ loadingText: `Moving ${params.curriculum.title} to past` }));
      try {
         const { data } = await http.put("/academics/curriculums/units/" + params.id, rearrangedUnit, {
            headers: { Authorization: "Bearer " + getAccessToken() },
         });
         dispatch(closePreloader());
      } catch (error: any) {
         const errorMessage = errorResolver(error);
         return thunkApi.rejectWithValue(errorMessage);
      }
   }
);

export const updateCurriculumToCurrent: any = createAsyncThunk(
   "curriculumSlice/updateCurriculum",
   async (params: { curriculum: Icurriculum; id: number }, thunkApi) => {
      const date = new Date();
      const rearrangedUnit: Icurriculum = {
         ...params.curriculum,
         is_current: true,
         is_finished: false,
         start_date: getDate(),
      };
      const dispatch = thunkApi.dispatch;
      dispatch(openPreloader({ loadingText: `Moving ${params.curriculum.title} to current` }));

      try {
         const { data } = await http.put("/academics/curriculums/units/" + params.id, rearrangedUnit, {
            headers: { Authorization: "Bearer " + getAccessToken() },
         });
         dispatch(closePreloader());
      } catch (error: any) {
         const errorMessage = errorResolver(error);
         return thunkApi.rejectWithValue(errorMessage);
      }
   }
);
