import { Avatar, IconButton } from '@mui/material'
import React, { FormEvent, useEffect, useState } from 'react'
import { chats } from './chatsData'
import { GrAttachment } from 'react-icons/gr'
import { BsEmojiSmile } from 'react-icons/bs'
import { BiSend } from 'react-icons/bi'

// const { openedMessageOwner, openedMessage } = useSelector(
//   (state: RootState) => state.messages
// );
// const { email } = useSelector((state: RootState) => state.user);
// const [messages, setMessages] = useState<IMessage[]>([...openedMessage]);
// const [typingText, setTypingText] = useState<string>("");
// console.log(messages);
// const dispatch = useDispatch();
// useEffect(() => {
//   dispatch(getOpenMesssages());
// }, [openedMessageOwner]);
// //     useEffect(() => {
// //       openedMessage && setMessages(openedMessage);
// //     }, [openedMessage]);
// const updateTypingText = (e: ChangeEvent<HTMLInputElement>) => {
//   setTypingText(e.target.value);
// };
// const send_a_message = async () => {
//   if (openedMessageOwner.id) {
//     if (typingText !== "") {
//       const { data } = await http.post(
//         `/chat/teacher/message/${openedMessageOwner.id}`,
//         {
//           text: typingText,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${getAccessToken()}`,
//           },
//         }
//       );
//       console.log(data);
//     }
//   } else {
//     dispatch(openErrorModal({ errorText: ["No user to send a message"] }));
//   }
// };
// return (
//   <div className="">
//     <div className={styles.header}>
//       <Avatar src="" alt="" />
//       <p className="font-bold text-sm capitalize">
//         {openedMessageOwner.firstName} {openedMessageOwner.lastName}
//       </p>
//     </div>
//     <div className={styles.chatContainer}>
//       {messages
//         //   ?.sort((a: any, b: any) => a.date - b.date)
//         ?.reverse()
//         ?.map((chat, index) => (
//           <div key={index}>
//             <p
//               className={`${styles.chats} ${
//                 chat.user.email === email
//                   ? "ml-auto rounded-bl-lg"
//                   : "rounded-br-lg"
//               }`}
//             >
//               {chat.text}
//             </p>
//             {/* <p className="text-[7px]">{}</p> */}
//             </div>
//         ))}
//     </div>
//     <div className={styles.messageInputContainer}>
//       <div className={styles.inputContainer}>
//         <IconButton>
//           <GrAttachment size={20} />
//         </IconButton>
//         <form onSubmit={() => {}} className="w-full">
//           <input
//             placeholder="Send Message..."
//             className={styles.input}
//             value={typingText}
//             onChange={updateTypingText}
//           />
//           <button hidden type="submit"></button>
//         </form>
//         <div className="flex space-x-5">
//           <IconButton>
//             <BsEmojiSmile size={20} />
//           </IconButton>
//           <IconButton
//             onClick={() => {
//               send_a_message();
//             }}
//           >
//             <BiSend size={20} />
//           </IconButton>
//         </div>
//       </div>
//     </div>

const ChatRoom = () => {
  const [ messages, setMessages ] = useState([]);
  const [ message, setMessage ] = useState('')

  const client = new WebSocket('wss://sea-lion-app-43ury.ondigitalocean.app/chat/websocket/')

  useEffect(() => {
      client.onopen = () => {
          console.log('Websocket Client Connected...')
      }

      client.onmessage = (message) => {
          console.log(message)
      }
  }, [])

  const onSubmit = (e: FormEvent) => {
      e.preventDefault()

      client.send(JSON.stringify({
          type: "chat.message",
          text: message,
          receiver: 0 // TODO: User ID gotten from state
      }))
  }
  
  return (
      <div className=''>
          <div className={styles.header}>
              <Avatar src='' alt='' />
              <p className='font-light text-sm'>Olamide Simon</p>
          </div>
          <div className={styles.chatContainer}>
              {chats.sort((a, b) => a.date - b.date).map((chat, index) => (
                  <div key={index}>
                      <p className={`${styles.chats} ${chat.name === 'me' ? 'ml-auto rounded-bl-lg': 'rounded-br-lg'}`}>{chat.chat}</p>
                      <p className='text-[7px]'>{}</p>
                  </div>
              ))}
          </div>
          <div className={styles.messageInputContainer}>
              <div className={styles.inputContainer}>
                  <IconButton>
                      <GrAttachment size={20} />
                  </IconButton>
                  <form onSubmit={() => {}} className='w-full'>
                      <input 
                          placeholder='Send Message...'
                          className={styles.input}
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                      />
                      <button hidden type='submit'></button>
                  </form>
                  <div className='flex space-x-5'>
                      <IconButton>
                          <BsEmojiSmile size={20} />
                      </IconButton>
                      <IconButton>
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
