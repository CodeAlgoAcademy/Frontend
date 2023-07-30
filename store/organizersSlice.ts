import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrganiztions, getAllRoles, getOrganizationUsers } from "services/organizersService";
import { IOrganization, IOrganizationSlice, IOrganizationUser, IRole } from "types/interfaces/organization.interface";

const initialState: IOrganizationSlice = {
   organizations: [],
   selectedOrganization: undefined,
   users: [],
   roles: [],
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
   },
});

export default organizersSlice.reducer;
export const { selectOrganization } = organizersSlice.actions;
