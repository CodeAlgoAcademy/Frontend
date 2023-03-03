import ParentLayout from "@/components/parents/ParentLayout";
import SideNav from "@/components/parents/ParentSideNav";
import MessageRoom from "@/components/chat/MessageRoom";
import React from "react";

const Message = () => {
   return (
      <ParentLayout>
         <MessageRoom />
      </ParentLayout>
   );
};

export default Message;
