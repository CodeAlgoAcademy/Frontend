export type days = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface IParentChild {
   progress?: any;
   // child: {
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
