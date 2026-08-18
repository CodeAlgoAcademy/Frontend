import ParentLayout from "@/components/layouts/ParentLayout";
import SideNav from "@/components/parents/UI/ParentSideNav";
import MessageRoom from "@/components/chat/MessageRoom";
import React from "react";
import { useTranslation } from "react-i18next";

const Message = () => {
   const { t } = useTranslation("parent");
   return (
      <ParentLayout title={t("messages")} showChildrenList>
         <MessageRoom />
      </ParentLayout>
   );
};

export default Message;
