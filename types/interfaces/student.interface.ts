import { LevelThresholdInputProps } from "@/components/parents/UI/levelthreshold";
import { AssignmentDetails } from "./assignment.interface";
import { screentimeTypes } from "./parent.interface";


export interface IStudentsProgress {
  title: string;
  level: number;
  progress: number;
  standard_code?: string;
  standard_name?: string;
  iready_math_desc?: string;
  common_core_math_desc?: string;
}

export interface IStudentsTopics {
  current: IStudentsProgress;
  topic: IStudentsProgress[];
}

export interface ISingleStudent {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: string;
  id?: string;
  active?: boolean;
  student_id?: string;
  assignments?: AssignmentDetails[];
  timeLimits?: screentimeTypes[];
  levelThreshold?: LevelThresholdInputProps[];
  progress?: IStudentsTopics;
  level?: number;
  class_id?:string
}

export interface IStudentWithScreentime extends ISingleStudent {
  timeLimits?: screentimeTypes[];
  levelThreshold?: LevelThresholdInputProps[];
}

export interface IUserStudent {
  newStudent: ISingleStudent | null;
  students: ISingleStudent[];
  studentComments: Array<{
    text: string;
    id: number | string;
    date: string;
  }>;
  currentStudent?: IStudentWithScreentime;
}

export interface TeacherStudentsState {
  students: ISingleStudent[];
  currentStudent: ISingleStudent | null;
  studentComments: Array<{
    text: string;
    id: number | string;
    date: string;
  }>;
}
