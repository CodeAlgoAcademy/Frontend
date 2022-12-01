// =============SLICES INTERFACES AND TYPES=============
export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
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
  auth: IUserData;
}

export interface IModal {
  addClassModalOpen: boolean;
  gradesModalOpen: boolean;
  showAddStudents: boolean;
  colorsModalOpen: boolean;
  addUnitModalOpen: boolean;
}

export interface IAllClasses {
  classes: IClass[];
}

export interface IAddClass {
  student: ISingleStudent;
  class: ISingleClass;
}

export interface IUnitsSlice {
  addUnit: {
    standard: string;
    units: Array<{
      id: number | string;
      unit: string;
      isCurrent: boolean;
      startDate: string;
      endDate: string;
      hoverText: string;
      isChosen: boolean;
    }>;
    levels: string[];
    grades: string[];
    chosenGrades: string[];
  };
}

// ============EXTRA INTERFACES AND TYPES
export interface IUserData {
  firstname: string;
  lastname: string;
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

export interface ISingleStudent {
  firstName: string;
  lastName: string;
  email: string;
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

export interface CurrentClassState {
  className: string;
  color: string;
}

export interface ILevels {
  unitsId: Array<string>;
  title: string;
  grades: Array<string>;
  hoverText: string;
}

export interface AssignmentSkill {
  skillId: string;
}

export interface AssignmentStudent {
  studentId: string;
}

export interface AssignmentDetails {
  title: string;
  schedule: string;
  order: string;
  number: number;
  skills: AssignmentSkill[];
  students: AssignmentStudent[];
}

export interface CurrentClassState {
  className: string;
  color: string;
}

export interface ILevels {
  level: string;
  unitsId: Array<string>;
  grades: Array<string>;
  hoverText: string;
}

export interface AssignmentSkill {
  skillId: string;
}

export interface AssignmentStudent {
  studentId: string;
}

export interface AssignmentDetails {
  title: string;
  schedule: string;
  order: string;
  number: number;
  skills: AssignmentSkill[];
  students: AssignmentStudent[];
}

export interface ISchedule {
  Id: string;
  Subject: string;
  Location: string;
  StartTime: string;
  EndTime: string;
}
