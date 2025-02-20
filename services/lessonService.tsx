import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { getAccessToken } from "utils/getTokens";
import { closePreloader, openErrorModal, openPreloader } from "store/fetchSlice";
import { newLesson } from "types/interfaces";
import { RootState } from "store/store";
import { errorResolver } from "utils/errorResolver";

export const getAllLessons: any = createAsyncThunk("lessonSlice/getLessons", async (_, thunkApi) => {
   const state: any = thunkApi.getState();
   const { currentUnitInView } = state.unit;
   const dispatch = thunkApi.dispatch;

   try {
      const { data } = await http.get(`/academics/curriculums/units/${currentUnitInView.id}/lessons`, {
         headers: { Authorization: "Bearer " + getAccessToken() },
      });
      return data;
   } catch (error: any) {
      // const errorMessage = errorResolver(error);
      // return thunkApi.rejectWithValue(errorMessage);
   }
});

export const addLessons: any = createAsyncThunk("lesson/add", async (lessonDetails: newLesson, thunkApi) => {
   const state: any = thunkApi.getState();
   const { currentUnitInView } = state.unit;
   const dispatch = thunkApi.dispatch;
   dispatch(openPreloader({ loadingText: "Adding Lesson" }));
   try {
      const { data } = await http.post(`/academics/curriculums/units/${currentUnitInView.id}/lessons/`, lessonDetails, {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      });
      dispatch(closePreloader());
      return data;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const editLesson: any = createAsyncThunk("edit/lesson", async (data: any, thunkApi) => {
   const state: any = thunkApi.getState();
   const { lessonOpened } = state.allLessons;
   const { currentUnitInView } = state.unit;
   const dispatch = thunkApi.dispatch;
   dispatch(openPreloader({ loadingText: "Editing Lesson" }));
   try {
      const { data: lesson } = await http.put(
         `academics/curriculums/units/${currentUnitInView.id}/lessons/${lessonOpened.id}/`,
         {
            ...data,
         },
         {
            headers: {
               Authorization: `Bearer ${getAccessToken()}`,
            },
         }
      );
      dispatch(closePreloader());
      return lesson;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});
