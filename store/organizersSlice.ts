import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
   fetchOrganiztions,
   getAllInvitations,
   getAllLicenses,
   getAllRoles,
   getMyInvitations,
   getOrganizationAnalytics,
   getOrganizationAudit,
   getOrganizationUsers,
   getOrgIBelongTo,
   getSingleStudentOrganizationUsers,
   getStudentOrganizationUsers,
   getStudentOrganizationProgress,
} from "services/organizersService";
import {
   AuditLogEvent,
   IOrganization,
   IOrganizationInvitations,
   IOrganizationSlice,
   IOrganizationUser,
   IRole,
   IUserOrganization,
   OrganizationStats,
   UserResponseList,
   UserWrapper,
} from "types/interfaces/organization.interface";

const initialState: IOrganizationSlice = {
   organizations: [],
   selectedOrganization: undefined,
   users: [],
   roles: [],
   licenses: [],
   invitations: [],
   userInvitation: [],
   userOrganizations: [],
    studentUsers: [],
    singlStudentUsers: undefined,
    isLoadingStudents: false,
    errorStudents: undefined,
    studentProgress: null,
   loading: false,
   error: null,
   isLoadingAnalytics: false,
   organizationStats: undefined,
   organizationAudit:[]
};

const organizersSlice = createSlice({
   name: "organizersSlice",
   initialState,
   reducers: {
      selectOrganization: (state: IOrganizationSlice, action: PayloadAction<IOrganization>) => {
         state.selectedOrganization = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchOrganiztions.fulfilled, (state: IOrganizationSlice, action: PayloadAction<IOrganization[]>) => {
         state.organizations = action.payload;

         const organization = action.payload?.find((org) => org.id === state?.selectedOrganization?.id);

         if (organization) {
            state.selectedOrganization = organization;
         } else {
            state.selectedOrganization = action.payload?.[0];
         }
      });

      builder.addCase(getAllRoles.fulfilled, (state: IOrganizationSlice, action: PayloadAction<IRole[]>) => {
         state.roles = action.payload;
      });

      builder.addCase(getAllLicenses.fulfilled, (state: IOrganizationSlice, action: PayloadAction<IRole[]>) => {
         state.licenses = action.payload;
      });

      builder
         .addCase(getOrganizationUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getOrganizationUsers.fulfilled, (state, action: PayloadAction<IOrganizationUser[]>) => {
            const sorted = [...action.payload].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            state.users = sorted;
            state.loading = false;
         })
         .addCase(getOrganizationUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
         });

      builder.addCase(getAllInvitations.fulfilled, (state: IOrganizationSlice, action: PayloadAction<IOrganizationInvitations[]>) => {
         state.invitations = action.payload;
      });

      builder.addCase(getMyInvitations.fulfilled, (state: IOrganizationSlice, action: PayloadAction<IUserOrganization[]>) => {
         state.userInvitation = action.payload;
      });

      builder.addCase(getOrgIBelongTo.fulfilled, (state: IOrganizationSlice, action: PayloadAction<IOrganization[]>) => {
         state.userOrganizations = action.payload;
      });

      builder.addCase(getStudentOrganizationUsers.pending, (state) => {
         state.isLoadingStudents = true;
         state.errorStudents = undefined;
      });
      builder.addCase(getStudentOrganizationUsers.rejected, (state, action) => {
         state.isLoadingStudents = false;
         state.errorStudents = action.payload as string;
      });
      builder.addCase(getStudentOrganizationUsers.fulfilled, (state: IOrganizationSlice, action: PayloadAction<UserResponseList>) => {
         state.isLoadingStudents = false;
         state.studentUsers = action.payload;
      });
        builder.addCase(getSingleStudentOrganizationUsers.pending, (state) => {
           state.isLoadingStudents = true;
        })
        builder.addCase(getSingleStudentOrganizationUsers.rejected, (state) => {
           state.isLoadingStudents = false;
        })
        builder.addCase(getSingleStudentOrganizationUsers.fulfilled, (state: IOrganizationSlice, action: PayloadAction<UserWrapper>) => {
           state.isLoadingStudents = false;
           state.singlStudentUsers = action.payload;
        });
      //   builder.addCase(getStudentOrganizationProgress.pending, (state) => {
      //      state.isLoadingStudents = true;
      //   })
      //   builder.addCase(getStudentOrganizationProgress.rejected, (state) => {
      //      state.isLoadingStudents = false;
      //   })
        builder.addCase(getStudentOrganizationProgress.fulfilled, (state: IOrganizationSlice, action: PayloadAction<any>) => {
         //   state.isLoadingStudents = false;
           state.studentProgress = action.payload;
        });
        builder.addCase(getOrganizationAnalytics.fulfilled, (state: IOrganizationSlice, action: PayloadAction<OrganizationStats>) => {
           state.isLoadingAnalytics = false;
           state.organizationStats = action.payload;
        });
      builder.addCase(getOrganizationAudit.fulfilled, (state: IOrganizationSlice, action: PayloadAction<AuditLogEvent[]>) => {
         state.isLoadingAnalytics = false;
         state.organizationAudit = action.payload;
      });
   },
});

export default organizersSlice.reducer;
export const { selectOrganization } = organizersSlice.actions;
