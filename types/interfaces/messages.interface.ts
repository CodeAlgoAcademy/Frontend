import { User } from "./auth.interface";
import { ISingleStudent } from "./student.interface";

export interface IUserConversation {
   conversations: Conversations[];
   openedMessageStudent: number | null;
   openedStudentMessages: string[];
   openedMessageOwner: User | IFriendsParent | ISingleStudent;
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
