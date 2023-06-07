import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getTeachers } from "services/teacherService";
import { RootState } from "store/store";
import { useSelector } from "react-redux";
import { open_a_message } from "store/messagesSlice";
import { getAllParents } from "services/parentService";
import { IFriendsParent } from "types/interfaces";

const ChatTabs = () => {
   const { email } = useSelector((state: RootState) => state.user);
   const { teachers } = useSelector((state: RootState) => state.allTeachers);
   const { parents } = useSelector((state: RootState) => state.parent);
   const [teacherTabOpened, setTeacherTabOpened] = useState<boolean>(false);
   const [parentTabOpened, setParentTabOpened] = useState<boolean>(false);
   const [active, setActive] = useState(0);

   const dispatch = useDispatch();

   useEffect(() => {
      // dispatch(getTeachers());
      dispatch(getAllParents());
   }, []);
   return (
      <>
         <div
            className={styles.singleTab}
            onClick={() => {
               setParentTabOpened(!parentTabOpened);
            }}
         >
            <p className="text-[20px] font-bold">Parents</p>
            <span className="text-[20px]">{parentTabOpened ? <BiChevronUp /> : <BiChevronDown />}</span>
         </div>
         <article className="flex-1 overflow-y-auto bg-gray-100">
            {parentTabOpened && (
               <div className="overflow-hidden">
                  {parents?.map((parent: IFriendsParent) => {
                     return (
                        <p
                           onClick={() => {
                              dispatch(open_a_message(parent as IFriendsParent));
                              setActive(parent.id);
                           }}
                           key={parent.id}
                           className={
                              active === parent.id
                                 ? `cursor-pointer border-y border-r bg-[#efecf5] p-5 hover:bg-[#e9e2f5] `
                                 : `cursor-pointer border-y border-r p-5 hover:bg-[#e9e2f5]`
                           }
                        >
                           {parent.friend}
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
