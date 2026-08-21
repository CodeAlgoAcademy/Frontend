import { ISingleStudent } from "./student.interface";

export interface IMainAssignment {
   id?: string | number;
   title: string;
   order: string;
   date: string;
   number: number;
   skills: AssignmentSkill[];
   students: ISingleStudent[];
   is_current: boolean;
   status: string;
   start_date: string;
   end_date: string;
}

export interface AssignmentDetails {
   title: string;
   order: string;
   start_date: string;
   end_date: string;
   number: number;
   skills: AssignmentSkill[];
   students: ISingleStudent[];
   is_current: boolean;
}

export interface AssignmentSkill {
   skillId: string;
}

export interface IAllAssignments {
   assignments: AssignmentDetails[];
}


interface AnswerDetail {
  id: number;
  is_correct: boolean;
  student_answer: { order?: string[]; selected_option?: string };
  answered_at: string;
  question_text: string;
  question_type: string;
  standard_code: string;
  topic_name: string;
  duration: number;
  question_source?: "block" | "activity" | "compiler";
  code?: string;
  output?: string;
  errors?: string;
  ai_encouragement?: string;
  ai_reasoning?: string;
  ai_summary?: string;
  ai_rating?: number;
}
export interface DetailedAnswersResponse {
  student_username: string;
  assignment_title: string;
  answers: AnswerDetail[];
}