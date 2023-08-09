export interface IOrganization {
   id?: number;
   name: string;
   description: string;
   invite_code: string;
   status?: string;
}

export interface IRole {
   name: string;
   description: string;
   id?: number;
}

export interface IOrganizationUser {
   id?: number;
   role: IRole;
   created_at: Date;
   status: string;
   user: number;
   organization: IOrganization;
}

export interface IOrganizationInvitations {
   id: number;
   organization: IOrganization;
   created_at: Date;
   role: IRole;
   status_text: string;
   status: number;
   email: string;
}

export interface IUserOrganization {
   id: number;
   organization: IOrganization;
   created_at: Date;
   role: IRole;
   status_text: string;
   status: number;
}

export interface IOrganizationSlice {
   organizations: IOrganization[];
   selectedOrganization: IOrganization | undefined;
   users: IOrganizationUser[];
   roles: IRole[];
   invitations: IOrganizationInvitations[];
   userInvitation: IUserOrganization[];
   userOrganizations: IOrganization[];
}
