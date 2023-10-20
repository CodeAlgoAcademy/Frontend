export type days = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface IChildSkill {
   id: number;
   title: string;
   level: number;
}

export interface IChildProgress {
   title: string;
   level: number;
   progress: number;
}

export interface IChildTopics {
   current: IChildProgress;
   topic: IChildProgress[];
}

export interface IParentChild {
   question_level?: number;
   skills?: IChildSkill[];
   progress?: IChildTopics;
   level?: number;
   username: string;
   fullName: string;
   codingExperience: string;
   dob: string;
   password: string;
   confirmPassword?: string;
   timeLimits: screentimeTypes[];
   friend?: string;
   id: string | number;
   pendingRequests?: FriendRequests[];
   friendRequests?: FriendRequests[];
   friends?: {
      id: number;
      friend: string;
   }[];
   student_id?:number;
   // }
}

export interface IParentChildren extends IParentChild {
   children: IParentChild[];
   currentChild: IParentChild;
}

export interface screentimeTypes {
   id?: number | string;
   dayOfTheWeek: days;
   timeLimit: "" | string | number | "No Limit";
}

export interface FriendRequests {
   id: number;
   from_user: string;
   to_user: string;
}
