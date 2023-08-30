import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearFields, updateUser } from "store/authSlice";
import http from "../axios.config";
import { closePreloader, openErrorModal, openPreloader } from "store/fetchSlice";
import { getAccessToken } from "utils/getTokens";
import { RootState } from "store/store";
import { errorResolver } from "utils/errorResolver";

export const loginUser: any = createAsyncThunk("authSlice/loginUser", async (name, thunkApi) => {
   const state: any = thunkApi.getState();
   const dispatch = thunkApi.dispatch;
   const { email, password } = state.user.auth;
   dispatch(openPreloader({ loadingText: "Logging You in" }));

   const body: { password: string; email?: string; username?: string } = { password };

   // We're using the email property in the state for the input to control both username and email for the login!!!!!!
   if (email.includes("@")) {
      body.email = email;
   } else {
      body.username = email;
   }
   try {
      const { data } = await http.post("/auth/login/", body);
      dispatch(clearFields());
      dispatch(closePreloader());
      return {
         access_token: data.access_token,
         refresh_token: data.refresh_token,
         ...data.user,
      };
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const signUpUser: any = createAsyncThunk("authSlice/signUpUser", async (name, thunkApi) => {
   const state: any = thunkApi.getState();
   const dispatch = thunkApi.dispatch;

   const policyChecked = state.policyCheck.checked;

   if (!policyChecked) {
      dispatch(openErrorModal({ errorText: ["You have not accepted the terms and conditions"] }));

      return thunkApi.rejectWithValue("Accept privacy policy");
   } else {
      const {
         email,
         organization_code,
         firstname,
         lastname,
         schoolName,
         grade,
         is_parent,
         is_organizer,
         is_student,
         is_teacher,
         dob,
         schoolCountry,
         country,
         username,
      } = state?.user?.auth;

      // General Options
      let options: typeof state.user.auth = {
         email,
         password1: state.user.auth.password,
         password2: state.user.auth.password,
         firstname,
         lastname,
         is_parent,
         is_organizer,
         is_student,
         is_teacher,
         username,
         organization_code,
      };

      if (is_teacher) {
         options = { ...options, country: schoolCountry, schoolCountry, schoolName, grade: "" };
      }

      if (is_student) {
         options = { ...options, country, grade, schoolCountry: "", schoolName: "", dob };
      }

      if (is_parent) {
         options = { ...options, country: country, grade: "", schoolCountry: "", schoolName: "" };
      }

      if (is_organizer) {
         options = { ...options, country: country, schoolCountry: "", schoolName: "", grade: "" };
      }

      dispatch(openPreloader({ loadingText: "Creating Account" }));
      try {
         const { data } = await http.post("/auth/registration/", { ...options });
         dispatch(clearFields());
         dispatch(closePreloader());

         return data;
      } catch (error: any) {
         const errorMessage = errorResolver(error);
         return thunkApi.rejectWithValue(errorMessage);
      }
   }
});

export const loginWithGoogle: any = createAsyncThunk("authSlice/loginWithGoogle", async (access_token: string, thunkApi) => {
   try {
      const { data } = await http.post("/auth/google/", {
         access_token,
         action: "signin",
      });
      return {
         access_token: data.access_token,
         refresh_token: data.refresh_token,
         ...data.user,
      };
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const signUpWithGoogle: any = createAsyncThunk("authSlice/signUpWithGoogle", async (access_token: string, thunkApi) => {
   try {
      const { data } = await http.post("/auth/google/", {
         access_token,
         action: "signup",
      });
      return {
         access_token: data.access_token,
         refresh_token: data.refresh_token,
         ...data.user,
      };
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const updateAccountType: any = createAsyncThunk("authSlice/updateAccountType", async (accountType: string, thunkApi) => {
   const is_parent: boolean = accountType === "Parent";
   const is_teacher: boolean = accountType === "Teacher";
   const is_student: boolean = accountType === "Student";
   const is_organizer: boolean = accountType === "Organizer";
   const state: any = thunkApi.getState();
   const { firstname, lastname, email, country, schoolCountry, schoolName, grade, username } = state.user;
   try {
      const { data } = await http.put(
         "/auth/user",
         {
            firstname,
            lastname,
            email,
            country: country ? country : "Canada",
            schoolCountry,
            schoolName,
            is_student,
            is_teacher,
            is_parent,
            is_organizer,
            grade,
            username,
         },
         {
            headers: {
               Authorization: `Bearer ${getAccessToken()}`,
            },
         }
      );
      return data;
   } catch (error) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const updateFirstname: any = createAsyncThunk("authSlice/updateFirstname", async (_, thunkApi) => {
   const state: any = thunkApi.getState();
   const { firstname } = state.user.auth;
   const dispatch = thunkApi.dispatch;
   const { lastname, email, country, schoolCountry, schoolName, is_student, is_teacher, is_parent, is_organizer, grade, username } = state.user;
   try {
      const { data } = await http.put(
         "/auth/user",
         {
            firstname,
            lastname,
            email,
            country,
            schoolCountry,
            schoolName,
            is_student,
            is_teacher,
            is_parent,
            is_organizer,
            grade,
            username,
         },
         {
            headers: {
               Authorization: `Bearer ${getAccessToken()}`,
            },
         }
      );
      dispatch(updateUser({ key: "firstname", value: "" }));
      return data;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const updateLastname: any = createAsyncThunk("authSlice/updateLastname", async (_, thunkApi) => {
   const state: any = thunkApi.getState();
   const { lastname } = state.user.auth;
   const dispatch = thunkApi.dispatch;
   const { firstname, email, country, schoolCountry, schoolName, is_student, is_teacher, is_parent, is_organizer, grade, username } = state.user;
   try {
      const { data } = await http.put(
         "/auth/user",
         {
            lastname,
            firstname,
            email,
            country,
            schoolCountry,
            schoolName,
            is_student,
            is_teacher,
            is_parent,
            is_organizer,
            grade,
            username,
         },
         {
            headers: {
               Authorization: `Bearer ${getAccessToken()}`,
            },
         }
      );
      dispatch(updateUser({ key: "lastname", value: "" }));
      return data;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const updateEmail: any = createAsyncThunk("authSlice/updateEmail", async (_, thunkApi) => {
   const state: any = thunkApi.getState();
   const { email } = state.user.auth;
   const dispatch = thunkApi.dispatch;
   const { lastname, firstname, country, schoolCountry, schoolName, is_student, is_teacher, is_parent, is_organizer, grade, username } = state.user;
   try {
      const { data } = await http.put(
         "/auth/user",
         {
            email,
            lastname,
            firstname,
            country,
            schoolCountry,
            schoolName,
            is_student,
            is_teacher,
            is_organizer,
            is_parent,
            grade,
            username,
         },
         {
            headers: {
               Authorization: `Bearer ${getAccessToken()}`,
            },
         }
      );
      dispatch(updateUser({ key: "email", value: "" }));
      return data;
   } catch (error: any) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});
