import axios from 'axios';
import http from 'axios.config';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown, BiChevronRight, BiChevronUp } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getTeachers } from 'services/teacherService';
import {
  getConversations,
  getOpenMesssages,
  open_a_message,
  setOpenStudent,
} from 'store/messagesSlice';
import { RootState } from 'store/store';
import { getStudents } from 'store/studentSlice';
import { CurrentClassState, IClass } from 'types/interfaces';
import { getAccessToken } from 'utils/getTokens';
import ChatRoom, { client } from '../Chats/ChatRoom';

const MessageRoom = () => {
  const [active, setActive] = useState(0);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [typingText, setTypingText] = useState('');
  const dispatch = useDispatch();
  const { students } = useSelector((state: RootState) => state.students.students);
  const { teachers } = useSelector((state: RootState) => state.allTeachers);
  const { conversations } = useSelector((state: RootState) => state.messages);
  const [userSelected, setUserSelected] = useState<number>();
  const currentClass = useSelector((state: RootState): CurrentClassState => state.currentClass);

  //   const setActiveStudent: any = () => {
  //     dispatch(setOpenStudent(userSelected));
  //   };
  //   const open_active_messages = () => {
  //     dispatch(open_a_message(user));
  //   };

  //   const  handleSendNewMessage:any = async (e: ChangeEvent<HTMLInputElement>) => {
  //     if (typingText !== '') {
  //       e.preventDefault();
  //       client.send(
  //         JSON.stringify({
  //           type: 'chat.message',
  //           text: typingText,
  //           receiver: active,
  //         }),
  //       );
  //       const { data } = await http.post(
  //         `/chat/teacher/message/${active}`,
  //         {
  //           text: typingText,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${getAccessToken()}`,
  //           },
  //         },
  //       );
  //       setTypingText('');
  //       await dispatch(getConversations())
  //       await dispatch(getOpenMesssages())
  //     }
  //   }

  useEffect(() => {
    client.onopen = () => {
      console.log('Websocket Client Connected...');
    };

    client.onmessage = (message: any) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('serverr reply', dataFromServer);
    };
  }, []);

  // const filterTeachers = (value: string) => {
  //   setFilteredTeachers((prev:any) => {
  //     return {
  //       teachers: teachers?.filter((teacher: any) => {
  //         if (
  //           (teacher.firstName + ' ' + teacher.lastName).toLowerCase().includes(value.toLowerCase())
  //         ) {
  //           return teacher;
  //         }
  //       }),
  //     };
  //   });
  // };

  const [openedStudent, setOpenedStudent] = useState<boolean>(false);
  const [openedTeachers, setOpenedTeachers] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getTeachers());
    dispatch(getConversations());
  }, [currentClass]);

  return (
    <section className={`w-[100vw] py-8 min-h-screen`}>
      <div
        className={`w-[90vw] relative max-w-[900px] mx-auto h-screen max-h-fit bg-white shadow-md rounded-md flex overflow-hidden`}
      >
        <div className="flex h-[700px] flex-col flex-[30%] md:border-r-2 border-b-2">
          <div
            className="flex justify-between items-center p-4 font-bold bg-[#412281] text-white"
            onClick={() => setOpenedStudent(!openedStudent)}
          >
            <p className="text-[20px">My Students</p>
            <span className="text-[20px]">
              {openedStudent ? <BiChevronUp /> : <BiChevronDown />}
            </span>
          </div>
          <article
            className={
              openedStudent
                ? 'bg-gray-100 overflow-y-scroll flex-1'
                : 'bg-gray-100 overflow-y-scroll'
            }
          >
            {openedStudent && (
              <div className="overflow-hidden">
                {students?.map((student: any) => {
                  return (
                    <p
                      onClick={() => {
                        dispatch(open_a_message(student));
                        setActive(student.id);
                        setUserSelected(student.id);
                      }}
                      key={student.id}
                      className={
                        active === student.id
                          ? `p-5 border-y border-r bg-[#efecf5]  hover:bg-[#e9e2f5] `
                          : `p-5 hover:bg-[#e9e2f5] border-y border-r`
                      }
                    >
                      {student.firstName}
                    </p>
                  );
                })}
              </div>
            )}
          </article>
          <div
            className="flex justify-between items-center p-4 font-bold bg-[#412281] text-white"
            onClick={() => {
              setOpenedTeachers(!openedTeachers);
            }}
          >
            <p className="text-[20px] font-bold">Teachers</p>
            <span className="text-[20px]">
              {openedTeachers ? <BiChevronUp /> : <BiChevronDown />}
            </span>
          </div>
          <article className="bg-gray-100 overflow-y-scroll flex-1">
            {openedTeachers && (
              <div className="overflow-hidden">
                {teachers?.map((teacher: any) => {
                  return (
                    <p
                      onClick={() => {
                        dispatch(open_a_message(teacher));
                        setActive(teacher.id);
                        setUserSelected(teacher.id);
                      }}
                      key={teacher.id}
                      className={
                        active === teacher.id
                          ? `p-5 border-y border-r bg-[#efecf5]  hover:bg-[#e9e2f5] `
                          : `p-5 hover:bg-[#e9e2f5] border-y border-r`
                      }
                    >
                      {teacher.firstName}
                    </p>
                  );
                })}
              </div>
            )}
          </article>
        </div>

        <div className="flex flex-col flex-[70%] justify-between">
          <div className="h-full">
            <ChatRoom />
          </div>

          {/* <div className="w-full flex gap-x-2 border-t-2">
            <input
              placeholder="Type Message..."
              className="w-[70%] md:w-[75%] px-2 py-3 outline-none border-none"
              onChange={(e) => setTypingText(e.target.value)}
              value={typingText}
            />
            <button className="bg-mainPurple text-white px-2 py-3 text-center w-[30%] md:w-[25%]" onClick={handleSendNewMessage}>
              Send
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
};

const styles = {
  title: 'text-[19px] font-bold pl-5 pb-5',
  tabsOpener:
    'cursor-pointer border-b-2 flex justify-between gap-x-2 px-3 py-3 items-center hover:bg-gray-50',
};

export default MessageRoom;
