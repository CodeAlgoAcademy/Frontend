import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getTeachers } from "services/teacherService";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { open_a_message } from "store/messagesSlice";
const ChatTabs = () => {
   const { email } = useSelector((state: RootState) => state.user);
   const { teachers } = useSelector((state: RootState) => state.allTeachers);
   const [teacherTabOpened, setTeacherTabOpened] = useState<boolean>(false);
   const [active, setActive] = useState(0);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTeachers());
   }, []);
   return (
      <>
         <div className={styles.singleTab} onClick={() => setTeacherTabOpened(!teacherTabOpened)}>
            <p className="text-[20px]">Teachers</p>
            <span className="text-[20px]">{teacherTabOpened ? <BiChevronUp /> : <BiChevronDown />}</span>
         </div>
         <article className={teacherTabOpened ? "max-h-full flex-1 overflow-y-auto bg-gray-100 p-0" : "overflow-y-auto bg-gray-100"}>
            {teacherTabOpened && (
               <div className="overflow-hidden">
                  {teachers
                     ?.filter((teacher: any) => teacher.email !== email)
                     ?.map((teacher: any) => {
                        return (
                           <p
                              onClick={() => {
                                 dispatch(open_a_message(teacher));
                                 setActive(teacher.id);
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
   singleTab: "flex items-center justify-between bg-[#2073fa] px-5 py-4 font-bold text-white",
};

export default ChatTabs;
