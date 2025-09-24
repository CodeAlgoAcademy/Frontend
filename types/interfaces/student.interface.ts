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
  first_name?: string;
  last_name?: string;
  email: string;
  username: string;
  dob: string;
  id: string;
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
    progressSummary: ClassroomProgressResponse | null; 
    loading:Boolean
}


interface CurrentStandard {
  level:string;
  code: string;
  name: string;
  status: "completed" | "in_progress" | "not_started";
  started_at: string; 
  completed_at: string;
  suggested_next: boolean;
}

export interface StudentProgress {
  student_id: number;
  student_username: string;
  current_level: CurrentStandard | null; 
  overall_progress: number;
  completed_count: number;
  in_progress_count: number;
  not_started_count: number;
  total_standards: number;
}

export interface ClassroomProgressResponse {
  class_id: number;
  students: StudentProgress[];
}

