import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "services/teacherService";
import { open_a_message } from "store/messagesSlice";
import { RootState } from "store/store";
import { getStudents } from "store/studentSlice";
import { CurrentClassState, ISingleStudent, User } from "types/interfaces";

const ChatTabs = () => {
   const [active, setActive] = useState<number | string>(0);
   const students = useSelector((state: RootState) => state.students.students);
   const { teachers } = useSelector((state: RootState) => state.allTeachers);

   const currentClass = useSelector((state: RootState): CurrentClassState => state.currentClass);

   const [userSelected, setUserSelected] = useState<number | string>();
   const { email } = useSelector((state: RootState) => state.user);
   const [openedStudent, setOpenedStudent] = useState<boolean>(false);
   const [openedTeachers, setOpenedTeachers] = useState<boolean>(false);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getStudents());
      dispatch(getTeachers());
   }, [currentClass, dispatch]);

   return (
      <>
         <div className={styles.singleTab} onClick={() => setOpenedStudent(!openedStudent)}>
            <p className="text-[20px]">My Students</p>
            <span className="text-[20px]">{openedStudent ? <BiChevronUp /> : <BiChevronDown />}</span>
         </div>
         <article className={openedStudent ? "max-h-full flex-1 overflow-y-auto bg-gray-100 p-0" : "overflow-y-auto bg-gray-100"}>
            {openedStudent && (
               <div className="overflow-hidden">
                  {students?.students?.map((student: ISingleStudent) => {
                     return (
                        <p
                           onClick={() => {
                              dispatch(open_a_message(student));
                              setActive(student?.id as string);
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
            className={styles.singleTab}
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
                     ?.filter((teacher: User) => teacher.email !== email)
                     ?.map((teacher: User) => {
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
      </>
   );
};

const styles = {
   title: "text-[19px] font-bold pl-5 pb-5",
   tabsOpener: "cursor-pointer border-b-2 flex justify-between gap-x-2 px-3 py-3 items-center hover:bg-gray-50",
   container: "flex min-w-[200px] flex-col border-b-2 bg-gray-100 md:min-w-[330px] md:border-r-2",
   singleTab: "flex items-center justify-between bg-mainColor px-5 py-4 font-bold text-white",
};

export default ChatTabs;
