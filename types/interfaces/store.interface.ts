// =============SLICES INTERFACES AND TYPES=============
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
  auth: IUserData;
}

export interface IModal {
  addClassModalOpen: boolean;
  gradesModalOpen: boolean;
  showAddStudents: boolean;
  colorsModalOpen: boolean;
  addUnitModalOpen: boolean;
}

export interface IAllTeachers {
  allTeachers: IAllTeachers[];
}

export interface IAllClasses {
  classes: IClass[];
}

export interface IAllCurriculum {
  allCurriculum: Icurriculum[];
}

export interface IAddClass {
  student: ISingleStudent;
  class: ISingleClass;
  file: any;
}

export interface IUnitsSlice {
  addUnit: {
    standard: string;
    units: Array<{
      id: number | string;
      title: string;
      isCurrent: boolean;
      startDate: string;
      endDate: string;
      hoverText: string;
      isChosen: boolean;
    }>;
    rearrangedUnits: Array<{
      description: string;
      end_date: string;
      grades: string[];
      is_current: boolean;
      is_finished: boolean;
      level: string;
      standard: string;
      start_date: string;
      title: string;
      class_model: string | number;
    }>;
    levels: string;
    grades: string[];
    chosenGrades: string[];
    unitsWithError: string[];
  };
  currentUnitInView: {
    id: string | number;
    is_current: boolean;
    is_finished: boolean;
    start_date: string;
  };
}

export interface IFetch {
  errorModalOpen: boolean;
  errors: string[];
  loading: boolean;
  loadingText: string;
}
export interface IUserConversation {
  conversations: Conversations[];
  openedMessageStudent: number | null;
  openedStudentMessages: string[];
  openedMessageOwner: User;
  openedMessage: IMessage[];
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
export interface IAllAssignments {
  assignments: AssignmentDetails[];
}

// ============EXTRA INTERFACES AND TYPES
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
}

export interface IClass {
  teacher: {
    email: string;
    firstname: string;
    lastname: string;
    country: string;
    schoolName: string;
    id: string | number;
  };
  className: string;
  roomNumber: number | string;
  subject: string;
  coTeachers: string;
  grade: string;
  color: string;
  totalStudent: number | string;
  id: number | string;
}

export interface Ilessons {
  title: string;
  id: number;
  description: string;
  unit_name: string;
  date: string;
  status: string;
}

export interface Icurriculum {
  title: string;
  description: string;
  end_date: string;
  start_date: string;
  teacher: null | string;
  grades: string[];
  id: number | string;
  standard: string;
  level: string;
  is_current: boolean;
  is_finished: boolean;
  class_model: string | number;
}

export interface ITeacher {
  teacherEmail: string;
  teacherName: string;
}

export interface ISingleStudent {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
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

export interface AssignmentDetails {
  title: string;
  order: string;
  start_date: string;
  end_date: string;
  number: number;
  skills: AssignmentSkill[];
  students: Student[];
  is_current: boolean;
}
export interface IMainAssignment {
  id?: string | number;
  title: string;
  order: string;
  date: string;
  number: number;
  skills: AssignmentSkill[];
  students: Student[];
  is_current: boolean;
  status: string;
  start_date: string;
  end_date: string;
}

export interface CurrentClassState {
  className: string;
  color: string;
  id: string | number;
}

export interface ILevels {
  title: string;
  unitsId: Array<string>;
  grades: Array<string>;
  hoverText: string;
}

export interface SkillTests {
  testId: string;
  testTitle: string;
}

export interface SkillDetails {
  categoryId: string;
  categoryTitle: string;
  tests: SkillTests[];
}

export interface DynamicChechbox {
  [key: string]: boolean;
}

export interface ISchedule {
  id: string;
  Subject: string;
  location: string;
  startTime: string;
  endTime: string;
}

export interface Conversations {
  user: User;
  message: IMessage;
  id: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}

export interface IMessage {
  user: User;
  text: string;
  is_read: boolean;
  date: string;
  id: number;
}

export interface Student {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  id?: string;
}

export interface INotes {
  html: string;
}

export interface Schedule {
  allSchedule: [];
  googleConnect: boolean;
}

export interface newLesson {
  topic: {
    title: string;
    description: string;
  };
  students: Student[];
  start_date: string;
  end_date: string;
  status: 'published' | 'unpublished';
}


export interface IFriends {
  id: string | number;
  name: string;
  is_friend: boolean;
}

export interface IParentChild {
  // child: {
    username: string,
    fullname: string,
    codingExperience: string,
    dob: string,
    password: string,
  // }
}