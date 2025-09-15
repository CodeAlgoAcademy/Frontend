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

export interface ILicense {
   name: string;
   description: string;
   id?: number;
}

export interface IOrganizationUser {
   id?: number;
   role: IRole;
   created_at: Date;
   status: string;
   user: InnerUser;
   organization: IOrganization;
}

interface InnerUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface UserWrapper {
  id: number;
  user: InnerUser;
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
   licenses: ILicense[];
   studentUsers: UserResponseList;
   singlStudentUsers?: UserWrapper;
   isLoadingStudents?: boolean;
   errorStudents?: string;
     loading: boolean;
  error?: string | null;
  isLoadingAnalytics: boolean;
  organizationStats?:OrganizationStats;
  organizationAudit:AuditLogEvent[]
}


interface User {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  is_student: boolean;
  is_teacher: boolean;
  is_parent: boolean;
  is_pave: boolean;
  is_organizer: boolean;
  country: string;
  schoolName: string;
  schoolCountry: string;
}
export interface UserResponse {
  id: string;
  user: User;
}
export type UserResponseList = UserResponse[];


interface SignupsByDay {
  labels: string[];
  data: number[];
}

export interface OrganizationStats {
  invite_code: string;
  org_description: string;
  total_accounts: number;
  new_accounts_today: number;
  signups_by_day: SignupsByDay;
}


export interface AuditLogDetails {
  [key: string]: string;
}

export interface AuditLogEvent {
  id: number;
  timestamp: string;
  event_type: string; 
  actor: string;
  actor_name: string;
  target: string;
  organization: number;
  details: AuditLogDetails;
}
