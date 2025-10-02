import { defaultTimeLimits } from "@/components/Teachers/students/AddStudentModal";
import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { closePreloader, openErrorModal, openPreloader } from "store/fetchSlice";
import { RootState } from "store/store";
import { errorResolver } from "utils/errorResolver";
import { getAccessToken } from "utils/getTokens";

export const getAllClasses: any = createAsyncThunk("allClassesSlice/getAllClasses", async (name, thunkApi) => {
   const state = <RootState>thunkApi.getState();
   const dispatch = thunkApi.dispatch;

   try {
      const { data } = await http.get("/academics/class", {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      });
      return data;
   } catch (error: any) {
      // const errorMessage = errorResolver(error);
      // return thunkApi.rejectWithValue(errorMessage);
   }
});

export const deleteClass: any = createAsyncThunk(
  "allClassesSlice/deleteClass",
  async (classId: string | number, thunkApi) => {
    const dispatch = thunkApi.dispatch;
    
    try {
      dispatch(openPreloader({ loadingText: "Deleting Class" }));
      
      const response = await http.delete(`/academics/class/${classId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      
      dispatch(closePreloader());
      return response.data;
      
    } catch (error: any) {
      dispatch(closePreloader());
    }
  }
);

export const addClass: any = createAsyncThunk("allClassesSlice/addClass", async (name, thunkApi) => {
   const state = thunkApi.getState() as RootState;
   const dispatch = thunkApi.dispatch;
   dispatch(openPreloader({ loadingText: "Adding Class" }));
   const {
      student,
      class: { className, grade, subject, coTeachers, roomNumber, color, organization },
      file,
   } = state.addClass;
   const { firstName, lastName, email, username, dob } = state.addClass.student;
   let method: "Class Only" | "Class & Student" | "Class & File" | "Class & Student & File" = "Class Only";

   const formData = new FormData();
   let options: any = {};
   if (firstName && lastName && email) {
      method = "Class & Student";
      options = {
         className,
         grade,
         subject,
         roomNumber,
         color,
         student: {
            firstName,
            lastName,
            email,
            username,
            dob,
            timeLimits: defaultTimeLimits,
         },
      };

      if (organization) {
         options.organization = organization;
      }
   } else if (file?.name) {
      method = "Class & File";
      formData.append("className", className);
      formData.append("grade", grade);
      formData.append("subject", subject);
      formData.append("color", color);
      formData.append("roomNumber", roomNumber as string);
      formData.append("file", file, "student file");
      if (organization) {
         formData.append("organization", (organization || "") as string);
      }
   } else {
      method = "Class Only";
      formData.append("className", className);
      formData.append("grade", grade);
      formData.append("subject", subject);
      formData.append("color", color);
      formData.append("roomNumber", roomNumber as string);
      if (organization) {
         formData.append("organization", (organization || "") as string);
      }
   }

   try {
      const { data } = await http.post("/academics/class/", method === "Class & Student" ? options : formData, {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            "Content-Type": method === "Class & Student" ? "application/json" : "multipart/form-data",
         },
      });
      dispatch(closePreloader());

      // return { ...data };
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});
