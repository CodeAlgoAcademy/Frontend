import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { closePreloader, openPreloader } from "store/fetchSlice";
import { RootState } from "store/store";
import { IOrganization } from "types/interfaces/organization.interface";
import { errorResolver } from "utils/errorResolver";
import { getAccessToken } from "utils/getTokens";

export const fetchOrganiztions: any = createAsyncThunk("organzer/fetch-organizations", async (name, thunkApi) => {
   try {
      const response = await http.get("/organization/admin", { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error: any) {
      //   error = errorResolver(error);
      return thunkApi.rejectWithValue(error.message);
   }
});

export const addOrganization: any = createAsyncThunk(
   "organizer/add-organization",
   async ({ name, description, invite_code }: { name: string; description: string; invite_code: string }, thunkApi) => {
      const dispatch = thunkApi.dispatch;

      dispatch(openPreloader({ loadingText: "Creating Organization" }));

      try {
         const response = await http.post(
            "/organization/admin",
            { name, description, invite_code },
            {
               headers: {
                  Authorization: `Bearer ${getAccessToken()}`,
               },
            }
         );

         dispatch(closePreloader());

         return response?.data;
      } catch (error) {
         error = errorResolver(error);
         return thunkApi.rejectWithValue(error);
      }
   }
);

// ============ ROLES

export const createRole: any = createAsyncThunk(
   "organzier/create-role",
   async ({ name, description }: { name: string; description: string }, thunkApi) => {
      const dispatch = thunkApi.dispatch;
      dispatch(openPreloader({ loadingText: "Creating Role" }));

      try {
         const response = await http.post("/organization/role/", { name, description }, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

         dispatch(closePreloader());

         return response?.data;
      } catch (error) {
         error = errorResolver(error);
         return thunkApi.rejectWithValue(error);
      }
   }
);

export const getAllRoles: any = createAsyncThunk("organizer/get-all-roles", async (_, thunkApi) => {
   try {
      const response = await http.get("/organization/role", { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
   }
});

export const deleteRole = createAsyncThunk("organizer/update-role", async (id: number, thunkApi) => {
   const dispatch = thunkApi.dispatch;

   dispatch(openPreloader({ loadingText: "Deleting role" }));

   try {
      const response = await http.delete(`/organization/role/${id}`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      dispatch(closePreloader());

      return response?.data;
   } catch (error) {
      error = errorResolver(error);
      return thunkApi.rejectWithValue(error);
   }
});

// ================== USERS
export const getOrganizationUsers: any = createAsyncThunk("organizer/get-users", async (_, thunkApi) => {
   const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;

   const { id } = selectedOrganization as IOrganization;

   try {
      const response = await http.get(`/organization/${id}/users`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
   }
});

export const addUserToOrganization = createAsyncThunk("organizaer/add-user", async ({ user, role }: { user: number; role: number }, thunkApi) => {
   const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;

   const { id } = selectedOrganization as IOrganization;

   try {
      const response = await http.post(`/organization/${id}/users/`, { user, role }, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error) {
      error = errorResolver(error);
      return thunkApi.rejectWithValue(error);
   }
});
