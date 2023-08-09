import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
   fetchOrganiztions,
   getAllInvitations,
   getAllRoles,
   getMyInvitations,
   getOrganizationUsers,
   getOrgIBelongTo,
} from "services/organizersService";
import {
   IOrganization,
   IOrganizationInvitations,
   IOrganizationSlice,
   IOrganizationUser,
   IRole,
   IUserOrganization,
} from "types/interfaces/organization.interface";

const initialState: IOrganizationSlice = {
   organizations: [],
   selectedOrganization: undefined,
   users: [],
   roles: [],
   invitations: [],
   userInvitation: [],
   userOrganizations: [],
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

      builder.addCase(getOrganizationUsers.fulfilled, (state: IOrganizationSlice, action: PayloadAction<IOrganizationUser[]>) => {
         state.users = action.payload;
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
   },
});

export default organizersSlice.reducer;
export const { selectOrganization } = organizersSlice.actions;
