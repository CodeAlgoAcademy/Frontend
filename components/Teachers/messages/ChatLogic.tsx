// import  { useRef, useState } from 'react';

// export default function ChatLogic() {
//     const [message, setMessage] = useState([])
//     const [isCoonnectionOpen, setisConnectionsOpen] = useState(false);
//     const [messageBody, setMessageBody] = useState('');

//     const ws = useRef();

//     const sendMessage = () => {
//         if(messageBody) {
//             ws.current.send(
//                 JSON.stringify({
//                     sender: user.id,
//                     text: messageBody,
//                     type: 'chat.message'

//                 })
//             );
//             setMessageBody("")
//         }
//     }

    
//   return (
//     <div>
      
//     </div>
//   );
// }
