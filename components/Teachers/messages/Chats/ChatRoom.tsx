import { Avatar, IconButton } from '@mui/material';
import React, { FormEvent, useEffect, useState, ChangeEvent } from 'react';
import { chats } from './chatsData';
import { IMessage } from 'types/interfaces';
import { GrAttachment } from 'react-icons/gr';
import { BsEmojiSmile } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { getAccessToken } from 'utils/getTokens';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store';
import {
  getConversations,
  getOpenMesssages,
  open_a_message,
  setOpenStudent,
} from 'store/messagesSlice';
import { openErrorModal } from 'store/fetchSlice';
import http from 'axios.config';
import { User } from 'types/interfaces';

interface Message {
  id: number;
  message: IMessage;
  user: User;
}

export const client = new W3CWebSocket(
  `wss://sea-lion-app-43ury.ondigitalocean.app/chat/websocket/?Authorization=${getAccessToken()}`,
);

const ChatRoom = () => {
  const { openedMessageOwner, openedMessage } = useSelector((state: RootState) => state.messages);

  const { email } = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<IMessage[]>(openedMessage ? [...openedMessage] : []);
  const [typingText, setTypingText] = useState<string>('');
  const dispatch = useDispatch();

  // console.log(openedMessageOwner)
  // console.log(openedMessage)
  // console.log(openedMessageOwner);
  // const send_a_message = async () => {
  //   if (openedMessageOwner.id) {
  //     if (typingText !== '') {
  //       const text = typingText;
  //       setTypingText('');
  //       const { data } = await http.post(
  //         `/chat/teacher/message/${openedMessageOwner.id}`,
  //         {
  //           text: text,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${getAccessToken()}`,
  //           },
  //         },
  //       );

  //       dispatch(getOpenMesssages());
  //       dispatch(getConversations());
  //     }
  //   } else {
  //     dispatch(openErrorModal({ errorText: ['No user to send a message'] }));
  //   }
  // };
  const updateTypingText = (e: ChangeEvent<HTMLInputElement>) => {
    setTypingText(e.target.value);
  };

  const handleSend: any = (e: ChangeEvent<HTMLInputElement>) => {
    if (openedMessageOwner.id) {
      if (typingText !== '') {
        e.preventDefault();
        client.send(
          JSON.stringify({
            type: 'chat.message',
            text: typingText,
            receiver: openedMessageOwner.id,
          }),
        );
        dispatch(getOpenMesssages());
        dispatch(getConversations());
        setTypingText('');
      }
    } else {
      dispatch(openErrorModal({ errorText: ['No user to send a message'] }));
    }
  };

  useEffect(() => {
    client.onopen = () => {
      console.log('Websocket Client Connected...');
    };

    client.onmessage = (message: any) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('serverr reply', dataFromServer);
      setMessages([...messages, dataFromServer]);
    };
  }, []);

  useEffect(() => {
    dispatch(getOpenMesssages());
  }, [openedMessageOwner]);

  // useEffect(() => {
  //   openedMessage && setMessages([...openedMessage]);
  // }, [openedMessage]);

  return (
    <div className="max-h-[35rem] h-[75vh]">
      <div className={styles.header}>
        <Avatar src="" alt="" />
        <p className="font-bold text-sm capitalize">
          {openedMessageOwner?.firstName} {openedMessageOwner?.lastName}
        </p>
      </div>
      <div className={styles.chatContainer}>
        {[...messages]
          ?.sort((a: any, b: any) => a.date - b.date)
          ?.map((chat, index) => (
            <div key={index}>
              <p
                className={`${styles.chats} ${
                  chat.user.email === email ? 'ml-auto rounded-bl-lg' : 'rounded-br-lg'
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
          <form className="w-full" onSubmit={handleSend}>
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
  header: 'flex items-center space-x-2 border-b-2 p-2',
  chatContainer: 'h-[100%] space-y-1 p-5 px-5 overflow-y-auto',
  chats: 'bg-[#fff3cc] p-3 text-xs w-fit rounded-t-lg',
  messageInputContainer: 'bg-white w-full rounded-b-xl',
  inputContainer: 'flex items-center space-x-2 text-slate-400',
  input: 'w-full p-1 outline-none bg-transparent text-black',
};
