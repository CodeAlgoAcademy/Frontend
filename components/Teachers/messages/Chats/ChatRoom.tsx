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
import { getConversations, getOpenMesssages } from 'store/messagesSlice';
import { openErrorModal } from 'store/fetchSlice';
import http from 'axios.config';

// const headers = {
//     Authorization: "Bearer " + getAccessToken()
// }
const client = new W3CWebSocket(
  `wss://sea-lion-app-43ury.ondigitalocean.app/chat/websocket/?Authorization=${getAccessToken()}`,
);
// const client = new WebSocket(
//   `wss://sea-lion-app-43ury.ondigitalocean.app/chat/websocket/?authorization=${getAccessToken()}}`
// );
const ChatRoom = () => {
  const { openedMessageOwner, openedMessage } = useSelector((state: RootState) => state.messages);

  const { email } = useSelector((state: RootState) => state.user);
  const [messages, setMessages] = useState<IMessage[]>(openedMessage ? [...openedMessage] : []);
  const [typingText, setTypingText] = useState<string>('');
  const dispatch = useDispatch();

  console.log(openedMessageOwner);
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
      setTypingText('');
    }
  };

  useEffect(() => {
    client.onopen = () => {
      console.log('Websocket Client Connected...');
    };

    client.onmessage = (message: any) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('serverr reply', dataFromServer);
    };
  }, []);

  useEffect(() => {
    dispatch(getOpenMesssages());
  }, []);
  useEffect(() => {
    openedMessage && setMessages([...openedMessage]);
  }, [openedMessage]);

  return (
    <div className="">
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
// const ChatRoom = () => {

//     useEffect(() => {
//             client.onopen = () => {
//                 console.log('Websocet client connected')
//             };
//             // client.onmessage = (message) => {
//             //     const dataFromServer = JSON.parse(message.data);
//             //     console.log('got reply! ', dataFromServer)
//             // }
//        }, [])

//        const handleClick = (value:any) => {
//         client.send(JSON.stringify({
//             type: "chat.message",
//             msg: value,
//         }))
//        }

//     return (
//         <div className=''>
//             <div className={styles.header}>
//                 <Avatar src='' alt='' />
//                 <p className='font-light text-sm'>Olamide Simon</p>
//             </div>
//             <div className={styles.chatContainer}>
//                 {chats.sort((a, b) => a.date - b.date).map((chat, index) => (
//                     <div key={index}>
//                         <p className={`${styles.chats} ${chat.name === 'me' ? 'ml-auto rounded-bl-lg': 'rounded-br-lg'}`}>{chat.chat}</p>
//                         <p className='text-[7px]'>{}</p>
//                     </div>
//                 ))}
//             </div>
//             <div className={styles.messageInputContainer}>
//                 <div className={styles.inputContainer}>
//                     <IconButton>
//                         <GrAttachment size={20} />
//                     </IconButton>
//                     <form onSubmit={() => {}} className='w-full'>
//                         <input
//                             placeholder='Send Message...'
//                             className={styles.input}
//                         />
//                         <button hidden type='submit'></button>
//                     </form>
//                     <div className='flex space-x-5'>
//                         <IconButton>
//                             <BsEmojiSmile size={20} />
//                         </IconButton>
//                         <IconButton>
//                             <BiSend size={20} />
//                         </IconButton>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// const ChatRoom = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   const client = new WebSocket(
//     "wss://sea-lion-app-43ury.ondigitalocean.app/chat/websocket/"
//   );

//   useEffect(() => {
//     client.onopen = () => {
//       console.log("Websocket Client Connected...");
//     };

//     client.onmessage = (message) => {
//       console.log(message);
//     };
//   }, []);

//   const onSubmit = (e: FormEvent) => {
//     e.preventDefault();

//     client.send(
//       JSON.stringify({
//         type: "chat.message",
//         text: message,
//         receiver: 0, // TODO: User ID gotten from state
//       })
//     );
//   };

//   return (
//     <div className="">
//       <div className={styles.header}>
//         <Avatar src="" alt="" />
//         <p className="font-light text-sm">Olamide Simon</p>
//       </div>
//       <div className={styles.chatContainer}>
//         {chats
//           .sort((a, b) => a.date - b.date)
//           .map((chat, index) => (
//             <div key={index}>
//               <p
//                 className={`${styles.chats} ${
//                   chat.name === "me" ? "ml-auto rounded-bl-lg" : "rounded-br-lg"
//                 }`}
//               >
//                 {chat.chat}
//               </p>
//               <p className="text-[7px]">{}</p>
//             </div>
//           ))}
//       </div>
//       <div className={styles.messageInputContainer}>
//         <div className={styles.inputContainer}>
//           <IconButton>
//             <GrAttachment size={20} />
//           </IconButton>
//           <form onSubmit={() => {}} className="w-full">
//             <input
//               placeholder="Send Message..."
//               className={styles.input}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             />
//             <button hidden type="submit"></button>
//           </form>
//           <div className="flex space-x-5">
//             <IconButton>
//               <BsEmojiSmile size={20} />
//             </IconButton>
//             <IconButton>
//               <BiSend size={20} />
//             </IconButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default ChatRoom;

const styles = {
  header: 'flex items-center space-x-2 border-b-2 p-2',
  chatContainer: 'h-80 space-y-1 p-5 px-5 overflow-y-auto',
  chats: 'bg-[#fff3cc] p-3 text-xs w-fit rounded-t-lg',
  messageInputContainer: 'bg-white w-full rounded-b-xl',
  inputContainer: 'flex items-center space-x-2 text-slate-400 p-4 px-7',
  input: 'w-full p-1 outline-none bg-transparent text-black',
};
