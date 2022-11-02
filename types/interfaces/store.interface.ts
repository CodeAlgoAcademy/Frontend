export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: {
    id: number;
    role_name: string;
    description: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  access_token: string;
  country: string;
  grade: string;
  schoolCountry: string;
  schoolName: string;
}

export interface IModal {
  addClassModalOpen: boolean;
  gradesModalOpen: boolean;
  showAddStudents: boolean;
  colorsModalOpen: boolean;
}

export interface IAllClasses {
  classes: IClass[];
}

export interface IClass {
  students: ISingleStudent[];
  classDetails: ISingleClass;
  teacher: ITeacher;
}

export interface ITeacher {
  teacherEmail: string;
  teacherName: string;
}

export interface IAddClass {
  student: ISingleStudent;
  class: ISingleClass;
}

export interface ISingleStudent {
  studentName: string;
  studentId: string;
  studentEmail: string;
}

export interface ISingleClass {
  className: string;
  roomNumber: number | string;
  subject: string;
  coTeachers: string;
  grade: string;
  color: string;
}

export interface ITabs {
  tabName: string | undefined;
  component: React.ReactElement | undefined;
}

export interface IInputFields {
  type: string;
  placeholder: string;
  name: string;
  value: string | number;
}
