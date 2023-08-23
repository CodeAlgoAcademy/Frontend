import { Avatar, IconButton } from "@mui/material";
import React, { FormEvent, useEffect, useState, ChangeEvent } from "react";
import { IFriendsParent, IMessage } from "types/interfaces";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { getAccessToken } from "utils/getTokens";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { getParentOpenMesssages, getTeacherConversations, getTeacherOpenMesssages } from "store/messagesSlice";
import { openErrorModal } from "store/fetchSlice";
import { User } from "types/interfaces";
import { useRouter } from "next/router";

interface Message {
   id: number;
   message: IMessage;
   user: User;
}
const client = new W3CWebSocket(`wss://sea-lion-app-43ury.ondigitalocean.app/chat/websocket/?Authorization=${getAccessToken()}`);
const ChatRoom = () => {
   const router = useRouter();
   const { openedMessageOwner, openedMessage } = useSelector((state: RootState) => state.messages);

   const { email } = useSelector((state: RootState) => state.user);
   const [messages, setMessages] = useState<IMessage[]>(openedMessage ? [...openedMessage] : []);
   const [typingText, setTypingText] = useState<string>("");
   const dispatch = useDispatch();

   const updateTypingText = (e: ChangeEvent<HTMLInputElement>) => {
      setTypingText(e.target.value);
   };

   const handleSend: any = (e: ChangeEvent<HTMLInputElement>) => {
      if (openedMessageOwner.id) {
         if (typingText !== "") {
            e.preventDefault();
            client.send(
               JSON.stringify({
                  type: "chat.message",
                  text: typingText,
                  receiver: openedMessageOwner.id,
               })
            );
            const message = { user: { email }, date: Date.now(), text: typingText };
            setMessages([...messages, message] as IMessage[]);
            setTypingText("");
         }
      } else {
         dispatch(openErrorModal({ errorText: ["No user to send a message"] }));
      }
   };

   useEffect(() => {
      client.onopen = () => {
         console.log("Websocket Client Connected...");
      };

      client.onmessage = (message: any) => {
         const dataFromServer = JSON.parse(message.data);
         if (dataFromServer.user.id == openedMessageOwner.id) {
            setMessages([...messages, dataFromServer]);
         }
      };
   }, [messages]);

   useEffect(() => {
      if (openedMessageOwner.id) {
         router.pathname.includes("parent") ? dispatch(getParentOpenMesssages()) : dispatch(getTeacherOpenMesssages());
      }
   }, [openedMessageOwner, dispatch]);

   useEffect(() => {
      openedMessage && setMessages([...openedMessage]);
   }, [openedMessage]);

   return (
      <div className="relative h-full pb-8">
         <div className={styles.header}>
            <Avatar src="" alt="" />
            <p className="text-sm font-bold capitalize">
               {/* 
                  If the id exists: 
                  for teachers, display firstname and lastname,
                  for parents display ?.friend  
               */}
               {openedMessageOwner?.id
                  ? (openedMessageOwner as User)?.firstName
                     ? (openedMessageOwner as User)?.firstName + " " + (openedMessageOwner as User)?.lastName
                     : (openedMessageOwner as IFriendsParent).friend
                  : ""}
            </p>
         </div>
         <div className={styles.chatContainer}>
            {[...messages]
               ?.sort((a: any, b: any) => a.date - b.date)
               ?.map((chat, index) => (
                  <div key={index}>
                     <p className={`${styles.chats} ${chat.user.email === email ? "ml-auto rounded-bl-lg" : "rounded-br-lg"}`}>{chat.text}</p>
                     {/* <p className="text-[7px]">{}</p> */}
                  </div>
               ))}
         </div>
         <div className={styles.messageInputContainer}>
            <div className={styles.inputContainer}>
               <IconButton>
                  <GrAttachment size={20} />
               </IconButton>
               <form className="w-full" onSubmit={handleSend}>
                  <input placeholder="Send Message..." className={styles.input} value={typingText} onChange={updateTypingText} />
                  <button hidden type="submit"></button>
               </form>
               <div className="flex space-x-5">
                  <IconButton>
                     <BsEmojiSmile size={20} />
                  </IconButton>
                  <IconButton onClick={handleSend}>
                     <BiSend size={20} />
                  </IconButton>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ChatRoom;

const styles = {
   header: "flex items-center space-x-2 border-b-2 p-2",
   chatContainer: "space-y-1 p-5 px-5 overflow-y-scroll sm:max-h-[500px] min-h-[500px] max-h-[500px] md:max-h-[564px] sm:min-h-[500px] pb-[72px]",
   chats: "bg-[#fff3cc] p-3 text-xs w-fit rounded-t-lg",
   messageInputContainer: "bg-white w-full border-t p-2 rounded-b-xl absolute left-0 bottom-0",
   inputContainer: "flex items-center space-x-2 text-slate-400",
   input: "w-full p-1 outline-none bg-transparent text-black",
};
