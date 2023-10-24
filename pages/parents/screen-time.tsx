import React, { useEffect, useState } from "react";
import ParentLayout from "@/components/layouts/ParentLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import NoChild from "@/components/parents/UI/NoChild";
import Screentime from "@/components/parents/screentime/Screentime";
import ScreentimeRestrictions from "@/components/parents/screentime/ScreentimeRestrictions";

const ScreenTime = () => {
   const { children } = useSelector((state: RootState) => state.parentChild);

   if (!children || children?.length === 0) {
      return <NoChild />;
   }

   return (
      <ParentLayout>
         <div className="mx-4 flex flex-col gap-9 overflow-x-auto sm:mx-0">
            <Screentime size="large" />
            <ScreentimeRestrictions />
         </div>
      </ParentLayout>
   );
};

export default ScreenTime;
