import { User } from "./auth.interface";

export interface IUserConversation {
   conversations: Conversations[];
   openedMessageStudent: number | null;
   openedStudentMessages: string[];
   openedMessageOwner: User;
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
