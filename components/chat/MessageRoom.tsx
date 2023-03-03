import React from "react";
import ChatRoom from "./ChatRoom";
import TeacherChatTabs from "../Teachers/messages/ChatTabs";
import ParentChatTabs from "../parents/ChatTabs";
import { useRouter } from "next/router";

const MessageRoom = () => {
   const router = useRouter();
   return (
      <>
         <div className={`mx-auto my-auto flex max-w-[94%] overflow-y-hidden overflow-x-scroll rounded-md bg-white md:w-full md:max-w-full`}>
            <div className="flex min-w-[200px] flex-col border-b-2 bg-gray-100 md:min-w-[330px] md:border-r-2">
               {router.pathname.includes("parent") ? <ParentChatTabs /> : <TeacherChatTabs />}
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
   container: "flex min-w-[200px] flex-col border-b-2 bg-gray-100 md:min-w-[330px] md:border-r-2",
   singleTab: "flex items-center justify-between bg-[#2073fa] px-5 py-4 font-bold text-white",
};

export default MessageRoom;
