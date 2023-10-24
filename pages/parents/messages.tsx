import ParentLayout from "@/components/layouts/ParentLayout";
import SideNav from "@/components/parents/UI/ParentSideNav";
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
