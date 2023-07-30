export interface IUser extends IUserData {
   id: number;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
   access_token: string;
   refresh_token: string;
   auth: IUserData;
}

export interface IUserData {
   firstname: string;
   lastname: string;
   username: string;
   email: string;
   password?: string;
   country: string;
   // peculiar to students
   grade: string;
   // peculiar to teachers
   schoolCountry: string;
   schoolName: string;
   is_organizer: boolean;
   is_parent: boolean;
   is_student: boolean;
   is_teacher: boolean;
   dob: string;
   organization_code: "";
}

export interface User {
   firstName: string;
   lastName: string;
   email: string;
   id: number;
}
