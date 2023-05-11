export interface Student {
   firstName: string;
   lastName: string;
   email: string;
   username: string;
   id?: string;
}

export interface ISingleStudent {
   firstName: string;
   lastName: string;
   email: string;
   username: string;
}

export interface IUserStudent {
   newStudent: Student | null;
   students: { students: Student[] };
   studentComments: Array<{
      text: string;
      id: number | string;
      date: string;
   }>;
}
