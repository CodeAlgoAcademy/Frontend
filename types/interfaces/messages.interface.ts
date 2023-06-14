import { User } from "./auth.interface";
import { Student } from "./student.interface";

export interface IUserConversation {
   conversations: Conversations[];
   openedMessageStudent: number | null;
   openedStudentMessages: string[];
   openedMessageOwner: User | IFriendsParent | Student;
   openedMessage: IMessage[];
}

export interface Conversations {
   user: User;
   message: IMessage;
   id: number;
}

export interface IMessage {
   user: User;
   text: string;
   is_read: boolean;
   date: string;
   id: number;
}

export interface IFriendsParent {
   id: number;
   friend: string;
}
