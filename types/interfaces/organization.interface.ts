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

export interface IOrganizationSlice {
   organizations: IOrganization[];
   selectedOrganization: IOrganization | undefined;
   users: IOrganizationUser[];
   roles: IRole[];
}
