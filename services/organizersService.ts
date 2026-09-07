import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { closePreloader, openPreloader } from "store/fetchSlice";
import { RootState } from "store/store";
import { IOrganization } from "types/interfaces/organization.interface";
import { errorResolver } from "utils/errorResolver";
import { getAccessToken } from "utils/getTokens";

export const fetchOrganiztions: any = createAsyncThunk("organzer/fetch-organizations", async (name, thunkApi) => {
   try {
      const response = await http.get("/organization/", { headers: { Authorization: `Bearer ${getAccessToken()}` } });

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
// =============analytics
export const getOrganizationAnalytics: any = createAsyncThunk("organizer/get-analytiics", async (_, thunkApi) => {
   const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;

   const { id } = selectedOrganization as IOrganization;

   try {
      const response = await http.get(`/organization/${id}/analytics`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
   }
});
export const getOrganizationAudit: any = createAsyncThunk("organizer/get-audit", async (_, thunkApi) => {
   const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;

   const { id } = selectedOrganization as IOrganization;

   try {
      const response = await http.get(`/organization/${id}/audit-logs`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
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
export const getStudentOrganizationUsers: any = createAsyncThunk("organizer/get-student-users", async (_, thunkApi) => {
   const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;

   const { id } = selectedOrganization as IOrganization;

   try {
      const response = await http.get(`/organization/${id}/users/students/`, { headers: { Authorization: `Bearer ${getAccessToken()}` } });

      return response?.data;
   } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
   }
});
export const getSingleStudentOrganizationUsers: any = createAsyncThunk(
   "organizer/get-single-student-users",
   async (student_id: string, thunkApi) => {
     const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
     const { id } = selectedOrganization as IOrganization;

     try {
       const response = await http.get(
         `/organization/${id}/users/students/${student_id}`,
         { headers: { Authorization: `Bearer ${getAccessToken()}` } }
       );

       return response?.data;
     } catch (error: any) {
       return thunkApi.rejectWithValue(error.message);
     }
   }
);

export const getStudentOrganizationProgress: any = createAsyncThunk(
   "organizer/get-student-progress",
   async (student_id: string, thunkApi) => {
     const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
     const { id } = selectedOrganization as IOrganization;

     try {
       const response = await http.get(
         `/organization/${id}/users/students/${student_id}/block-progress/`,
         { headers: { Authorization: `Bearer ${getAccessToken()}` } }
       );

       return response?.data;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
);

export const getStudentOrganizationLineProgress: any = createAsyncThunk(
   "organizer/get-student-line-progress",
   async (student_id: string, thunkApi) => {
     const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
     const { id } = selectedOrganization as IOrganization;

     try {
       const response = await http.get(
         `/organization/${id}/users/students/${student_id}/line-progress/`,
         { headers: { Authorization: `Bearer ${getAccessToken()}` } }
       );

       return response?.data;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
);

export const getStudentOrganizationLineSkills: any = createAsyncThunk(
   "organizer/get-student-line-skills",
   async (student_id: string, thunkApi) => {
     const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
     const { id } = selectedOrganization as IOrganization;

     try {
       const response = await http.get(
         `/organization/${id}/users/students/${student_id}/line-skills/`,
         { headers: { Authorization: `Bearer ${getAccessToken()}` } }
       );

       return response?.data;
      } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
);


export const editOrganizationStudent: any = createAsyncThunk(
   "organizer/edit-student",
   async (student: any, thunkApi) => {
      const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
      const { id } = selectedOrganization as IOrganization;

      try {
         const response = await http.put(
            `/organization/${id}/users/students/${student.id}/`,
            student,
            { headers: { Authorization: `Bearer ${getAccessToken()}` } }
         );
         return response?.data;
      } catch (error) {
         return thunkApi.rejectWithValue(errorResolver(error));
      }
   }
);

export const deleteOrganizationStudent: any = createAsyncThunk(
   "organizer/delete-student",
   async (studentId: string, thunkApi) => {
      const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
      const { id } = selectedOrganization as IOrganization;

      try {
         const response = await http.delete(
            `/organization/${id}/users/students/${studentId}/`,
            { headers: { Authorization: `Bearer ${getAccessToken()}` } }
         );
         return response?.data;
      } catch (error) {
         return thunkApi.rejectWithValue(errorResolver(error));
      }
   }
);

export const getOrganizationStudentComments: any = createAsyncThunk(
   "organizer/get-student-comments",
   async (studentId: string, thunkApi) => {
      const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
      const { id } = selectedOrganization as IOrganization;

      try {
         const response = await http.get(
            `/organization/${id}/users/students/${studentId}/comments/`,
            { headers: { Authorization: `Bearer ${getAccessToken()}` } }
         );
         return response?.data;
      } catch (error) {
         return thunkApi.rejectWithValue(errorResolver(error));
      }
   }
);

export const addOrganizationStudentComment: any = createAsyncThunk(
   "organizer/add-student-comment",
   async ({ studentId, text }: { studentId: string; text: string }, thunkApi) => {
      const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
      const { id } = selectedOrganization as IOrganization;

      try {
         const response = await http.post(
            `/organization/${id}/users/students/${studentId}/comments/`,
            { text },
            { headers: { Authorization: `Bearer ${getAccessToken()}` } }
         );
         return response?.data;
      } catch (error) {
         return thunkApi.rejectWithValue(errorResolver(error));
      }
   }
);

export const editOrganizationStudentComment: any = createAsyncThunk(
   "organizer/edit-student-comment",
   async ({ studentId, commentId, text }: { studentId: string; commentId: string; text: string }, thunkApi) => {
      const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
      const { id } = selectedOrganization as IOrganization;

      try {
         const response = await http.put(
            `/organization/${id}/users/students/${studentId}/comments/${commentId}/`,
            { text },
            { headers: { Authorization: `Bearer ${getAccessToken()}` } }
         );
         return response?.data;
      } catch (error) {
         return thunkApi.rejectWithValue(errorResolver(error));
      }
   }
);

export const deleteOrganizationStudentComment: any = createAsyncThunk(
   "organizer/delete-student-comment",
   async ({ studentId, commentId }: { studentId: string; commentId: string }, thunkApi) => {
      const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
      const { id } = selectedOrganization as IOrganization;

      try {
         const response = await http.delete(
            `/organization/${id}/users/students/${studentId}/comments/${commentId}/`,
            { headers: { Authorization: `Bearer ${getAccessToken()}` } }
         );
         return response?.data;
      } catch (error) {
         return thunkApi.rejectWithValue(errorResolver(error));
      }
   }
);


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

export const addStudentToOrganizationClass: any = createAsyncThunk(
   "organizer/add-student-to-class",
   async (
      studentData: {
         classId: number;
         firstName: string;
         lastName: string;
         email?: string;
         username?: string;
         password: string;
         dob?: string;
      },
      thunkApi
   ) => {
      const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
      const { id } = selectedOrganization as IOrganization;

      try {
         const response = await http.post(
            `/organization/${id}/users/students/add-to-class/`,
            studentData,
            { headers: { Authorization: `Bearer ${getAccessToken()}` } }
         );
         return response?.data;
      } catch (error) {
         return thunkApi.rejectWithValue(errorResolver(error));
      }
   }
);

export const getOrganizationClasses: any = createAsyncThunk(
   "organizer/get-classes",
   async (_, thunkApi) => {
      const { selectedOrganization } = (thunkApi.getState() as RootState).organizer;
      const { id } = selectedOrganization as IOrganization;

      try {
         const response = await http.get(
            `/organization/${id}/classes`,
            { headers: { Authorization: `Bearer ${getAccessToken()}` } }
         );
         return response?.data;
      } catch (error) {
         return thunkApi.rejectWithValue(errorResolver(error));
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

// ============ STUDENT DOWNLOADS
export const downloadOrganizationStudentsPDF = async (organizationId: number | string): Promise<Blob> => {
   const response = await fetch(`/api/organizers/students/${organizationId}/print-student-logins`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });

   if (!response.ok) {
      throw new Error(`PDF download failed: ${response.status}`);
   }

   return response.blob();
};

export const downloadOrganizationStudentsCSV = async (organizationId: number | string): Promise<Blob> => {
   const response = await fetch(`/api/organizers/students/${organizationId}/export-csv`, {
      headers: {
         Authorization: `Bearer ${getAccessToken()}`,
      },
   });

   if (!response.ok) {
      throw new Error(`CSV download failed: ${response.status}`);
   }

   return response.blob();
};
