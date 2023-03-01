import axios from "axios";
import http from "axios.config";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronDown, BiChevronRight, BiChevronUp } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "services/teacherService";
import { getConversations, getOpenMesssages, open_a_message, setOpenStudent } from "store/messagesSlice";
import { RootState } from "store/store";
import { getStudents } from "store/studentSlice";
import { CurrentClassState, IClass } from "types/interfaces";
import { getAccessToken } from "utils/getTokens";
import ChatRoom from "../Chats/ChatRoom";

const MessageRoom = () => {
   const [active, setActive] = useState(0);
   const [filteredTeachers, setFilteredTeachers] = useState([]);
   const [typingText, setTypingText] = useState("");
   const dispatch = useDispatch();
   const { students } = useSelector((state: RootState) => state.students.students);
   const { teachers } = useSelector((state: RootState) => state.allTeachers);
   const { conversations } = useSelector((state: RootState) => state.messages);
   const [userSelected, setUserSelected] = useState<number>();
   const currentClass = useSelector((state: RootState): CurrentClassState => state.currentClass);
   const { email } = useSelector((state: RootState) => state.user);
   const [openedStudent, setOpenedStudent] = useState<boolean>(false);
   const [openedTeachers, setOpenedTeachers] = useState<boolean>(false);

   useEffect(() => {
      dispatch(getStudents());
      dispatch(getTeachers());
      dispatch(getConversations());
   }, [currentClass, dispatch]);

   return (
      <>
         <div className={`absolute top-0 left-0 mx-auto flex h-full w-full overflow-y-hidden overflow-x-scroll rounded-md bg-white`}>
            <div className="flex min-w-[200px] flex-col border-b-2 bg-gray-100 md:min-w-[330px] md:border-r-2">
               <div
                  className="flex items-center justify-between bg-[#2073fa] px-5 py-4 font-bold text-white"
                  onClick={() => setOpenedStudent(!openedStudent)}
               >
                  <p className="text-[20px]">My Students</p>
                  <span className="text-[20px]">{openedStudent ? <BiChevronUp /> : <BiChevronDown />}</span>
               </div>
               <article className={openedStudent ? "max-h-full flex-1 overflow-y-auto bg-gray-100 p-0" : "overflow-y-auto bg-gray-100"}>
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
                                       ? `w-full cursor-pointer border-y border-r bg-[#efecf5] p-5 hover:bg-[#e9e2f5]`
                                       : `cursor-pointer border-y border-r p-5 hover:bg-[#e9e2f5]`
                                 }
                              >
                                 {student.firstName} {student.lastName}
                              </p>
                           );
                        })}
                     </div>
                  )}
               </article>
               <div
                  className="flex items-center justify-between bg-[#2073fa] p-4 font-bold text-white"
                  onClick={() => {
                     setOpenedTeachers(!openedTeachers);
                  }}
               >
                  <p className="text-[20px] font-bold">Teachers</p>
                  <span className="text-[20px]">{openedTeachers ? <BiChevronUp /> : <BiChevronDown />}</span>
               </div>
               <article className="flex-1 overflow-y-auto bg-gray-100">
                  {openedTeachers && (
                     <div className="overflow-hidden">
                        {teachers
                           ?.filter((teacher: any) => teacher.email !== email)
                           ?.map((teacher: any) => {
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
                                          ? `cursor-pointer border-y border-r bg-[#efecf5] p-5 hover:bg-[#e9e2f5] `
                                          : `cursor-pointer border-y border-r p-5 hover:bg-[#e9e2f5]`
                                    }
                                 >
                                    {teacher.firstName} {teacher.lastName}
                                 </p>
                              );
                           })}
                     </div>
                  )}
               </article>
            </div>

            <div className="flex min-w-fit flex-[70%] flex-col justify-between">
               <div className="h-full min-w-[300px]">
                  <ChatRoom />
               </div>
            </div>
         </div>
      </>
   );
};

const styles = {
   title: "text-[19px] font-bold pl-5 pb-5",
   tabsOpener: "cursor-pointer border-b-2 flex justify-between gap-x-2 px-3 py-3 items-center hover:bg-gray-50",
};

export default MessageRoom;
