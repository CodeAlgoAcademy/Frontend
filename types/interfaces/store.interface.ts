// =============SLICES INTERFACES AND TYPES=============
export interface IUser {
	id: number
	firstname: string
	lastname: string
	email: string
	password: string
	role: {
		id: number
		role_name: string
		description: string
	}
	isActive: boolean
	createdAt: string
	updatedAt: string
	access_token: string
	country: string
	grade: string
	schoolCountry: string
	schoolName: string
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
	studentName: string
	studentId: string
	studentEmail: string
}

export interface ISingleClass {
	className: string
	roomNumber: number | string
	subject: string
	coTeachers: string
	grade: string
	color: string
}

export interface ITabs {
	tabName: string | undefined
	component: React.ReactElement | undefined
}

export interface IInputFields {
	type: string
	placeholder: string
	name: string
	value: string | number
}

export interface CurrentClassState {
	className: string
	color: string
}

export interface ILevels {
	level: string
	unitsId: Array<string>
	grades: Array<string>
	hoverText: string
}

export interface AssignmentSkill {
	skillId: string
}

export interface AssignmentStudent {
	studentId: string
}

export interface AssignmentDetails {
	title: string
	schedule: string
	order: string
	number: number
	skills: AssignmentSkill[]
	students: AssignmentStudent[]
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
