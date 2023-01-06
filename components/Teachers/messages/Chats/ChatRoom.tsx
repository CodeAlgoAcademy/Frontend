import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import { chats } from "./chatsData";
import { GrAttachment } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { getOpenMesssages } from "store/messagesSlice";
import { IMessage } from "types/interfaces";
import http from "axios.config";
import { openErrorModal } from "store/fetchSlice";
import { getAccessToken } from "utils/getTokens";

const ChatRoom = () => {
  const { openedMessageOwner, openedMessage } = useSelector(
    (state: RootState) => state.messages
  );
  const { email } = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [typingText, setTypingText] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOpenMesssages());
    console.log(openedMessage);
  }, [openedMessageOwner]);
  useEffect(() => {
    if (openedMessage) {
      const message = [...openedMessage];
      setMessages(() => message);
    }
  }, [openedMessage]);
  const updateTypingText = (e: ChangeEvent<HTMLInputElement>) => {
    setTypingText(e.target.value);
  };
  const send_a_message = async () => {
    if (openedMessageOwner.id) {
      if (typingText !== "") {
        const response = await http.post(
          `/chat/teacher/message/${openedMessageOwner.id}`,
          {
            text: typingText,
          },
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        );
        console.log(response?.data);
      }
    } else {
      dispatch(openErrorModal({ errorText: ["No user to send a message"] }));
    }
  };
  return (
    <div className="">
      <div className={styles.header}>
        <Avatar src="" alt="" />
        <p className="font-bold text-sm capitalize">
          {openedMessageOwner.firstName} {openedMessageOwner.lastName}
        </p>
      </div>
      <div className={styles.chatContainer}>
        {[...messages]
          ?.sort((a: any, b: any): any => {
            const firstDate: any = new Date(a.date);
            const secondDate: any = new Date(b.date);
            return firstDate - secondDate;
          })
          //   ?.reverse()
          ?.map((chat, index) => (
            <div key={index}>
              <p
                className={`${styles.chats} ${
                  chat.user.email === email
                    ? "ml-auto rounded-bl-lg"
                    : "rounded-br-lg"
                }`}
              >
                {chat.text}
              </p>
              {/* <p className="text-[7px]">{}</p> */}
            </div>
          ))}
      </div>
      <div className={styles.messageInputContainer}>
        <div className={styles.inputContainer}>
          <IconButton>
            <GrAttachment size={20} />
          </IconButton>
          <form onSubmit={() => {}} className="w-full">
            <input
              placeholder="Send Message..."
              className={styles.input}
              value={typingText}
              onChange={updateTypingText}
            />
            <button hidden type="submit"></button>
          </form>
          <div className="flex space-x-5">
            <IconButton>
              <BsEmojiSmile size={20} />
            </IconButton>
            <IconButton
              onClick={() => {
                send_a_message();
              }}
            >
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
  chatContainer: "h-80 space-y-1 p-5 px-5 overflow-y-auto",
  chats: "bg-[#fff3cc] p-3 text-xs w-fit rounded-t-lg",
  messageInputContainer: "bg-white w-full rounded-b-xl",
  inputContainer: "flex items-center space-x-2 text-slate-400 p-4 px-7",
  input: "w-full p-1 outline-none bg-transparent text-black",
};
