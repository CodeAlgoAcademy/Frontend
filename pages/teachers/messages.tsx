import Messages from "@/components/Teachers/messages/Messages";
import TeacherLayout from "@/components/Teachers/TeacherLayout";
import React from "react";
const Index = () => {
   return (
      <TeacherLayout className="relative overflow-hidden border pt-0 pb-0 pl-0 pr-0 md:pl-0 md:pr-0">
         <Messages />
      </TeacherLayout>
   );
};

export default Index;
