import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { closePreloader, openPreloader } from "store/fetchSlice";
import { RootState } from "store/store";
import { IOrganization } from "types/interfaces/organization.interface";
import { errorResolver } from "utils/errorResolver";
import { getAccessToken } from "utils/getTokens";

export const fetchOrganiztions: any = createAsyncThunk("organzer/fetch-organizations", async (name, thunkApi) => {
   try {
      const response = await http.get("/organization/admin/", { headers: { Authorization: `Bearer ${getAccessToken()}` } });

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
            "/organization/admin/",
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

// ============ LICENSE

export const createLicense: any = createAsyncThunk(
   "organizer/create-license",
   async ({ name, description, price, duration }: { name: string; description: string; price: string; duration: string }, thunkApi) => {
      const dispatch = thunkApi.dispatch;
      dispatch(openPreloader({ loadingText: "Creating License" }));

      try {
         const response = await http.post(
            "/organization/license/admin/",
            { name, description, price, duration },
            { headers: { Authorization: `Bearer ${getAccessToken()}` } }
         );

         dispatch(closePreloader());

         return response?.data;
      } catch (error) {
         error = errorResolver(error);
         return thunkApi.rejectWithValue(error);
      }
   }
);

export const getAllLicenses: any = createAsyncThunk("organizer/get-all-licenses", async (_, thunkApi) => {
   try {
      const response = await http.get("/organization/license/", { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
   }
});

export const deleteLicense = createAsyncThunk("organizer/delete-license", async (id: number, thunkApi) => {
   const dispatch = thunkApi.dispatch;

   dispatch(openPreloader({ loadingText: "Deleting license" }));

   try {
      const response = await http.delete(`/organization/license/admin/${id}`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      dispatch(closePreloader());

      return response?.data;
   } catch (error) {
      error = errorResolver(error);
      return thunkApi.rejectWithValue(error);
   }
});

export const sendLicenseRequest: any = createAsyncThunk("sendLicenseReq", async (id: number, thunkApi) => {
   const dispatch = thunkApi.dispatch;

   const organization = (thunkApi.getState() as RootState)?.organizer?.selectedOrganization;

   dispatch(openPreloader({ loadingText: "Sending request" }));

   try {
      const response = await http.post(
         `/organization/license/requests/${organization?.id}`,
         { license: id },
         {
            headers: {
               Authorization: `Bearer ${getAccessToken()}`,
            },
         }
      );

      dispatch(closePreloader());

      return response.data;
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

export const addUserToOrganization: any = createAsyncThunk(
   "organizaer/add-user",
   async ({ email, role }: { email: string; role: number }, thunkApi) => {
      const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;

      const { id } = selectedOrganization as IOrganization;

      try {
         const response = await http.post(
            `/organization/${id}/invite`,
            { email, role },
            { headers: { Authorization: `Bearer ${getAccessToken()}` } }
         );

         return response?.data;
      } catch (error) {
         error = errorResolver(error);
         return thunkApi.rejectWithValue(error);
      }
   }
);

export const getAllInvitations: any = createAsyncThunk("getallinvitations", async (_, thunkApi) => {
   const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
   const { id } = selectedOrganization as IOrganization;

   try {
      const response = await http.get(`/organization/${id}/invite`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error) {
      error = errorResolver(error);
      return thunkApi.rejectWithValue(error);
   }
});

// for other accounts
export const getMyInvitations: any = createAsyncThunk("getMyInvitations", async (_, thunkApi) => {
   try {
      const response = await http.get("/organization/invitations", { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
   }
});

export const acceptOrgRequest: any = createAsyncThunk("Accept Org Request", async (id: number, thunkApi) => {
   thunkApi.dispatch(openPreloader({ loadingText: "Accepting Orgnization Request" }));
   try {
      const response = await http.put(`/organization/invitations/${id}`, { status: 1 }, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      thunkApi.dispatch(closePreloader());

      return response?.data;
   } catch (error) {
      error = errorResolver(error);
      return thunkApi.rejectWithValue(error);
   }
});

export const declineOrgRequest: any = createAsyncThunk("decline org request", async (id: number, thunkApi) => {
   thunkApi.dispatch(openPreloader({ loadingText: "Declining Orgnization Request" }));
   try {
      const response = await http.put(`/organization/invitations/${id}`, { status: 2 }, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      thunkApi.dispatch(closePreloader());

      return response?.data;
   } catch (error) {
      error = errorResolver(error);
      return thunkApi.rejectWithValue(error);
   }
});

export const getOrgIBelongTo: any = createAsyncThunk("get organization i belong to", async (_, thunkApi) => {
   try {
      const response = await http.get("/organization", { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
   }
});
