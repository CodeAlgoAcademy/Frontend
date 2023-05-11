export interface IUser {
   id: number;
   firstname: string;
   lastname: string;
   username: string;
   email: string;
   isActive: boolean;
   createdAt: string;
   updatedAt: string;
   access_token: string;
   refresh_token: string;
   country: string;
   grade: string;
   schoolCountry: string;
   schoolName: string;
   is_parent: boolean;
   is_student: boolean;
   is_teacher: boolean;
   dob: string;
   auth: IUserData;
}

export interface IUserData {
   firstname: string;
   lastname: string;
   username: string;
   email: string;
   password: string;
   country: string;
   // peculiar to students
   grade: string;
   // peculiar to teachers
   schoolCountry: string;
   schoolName: string;
   is_parent: boolean;
   is_student: boolean;
   is_teacher: boolean;
   dob: string;
}

export interface User {
   firstName: string;
   lastName: string;
   email: string;
   id: number;
   fullName?: string;
   first_name?: string;
   last_name?: string;
}
