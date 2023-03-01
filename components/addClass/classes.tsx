import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { IClass } from "../../types/interfaces";
import SingleClass from "./singleClass";
const Classes = () => {
   const { classes } = useSelector((state: RootState) => state.allClasses);
   return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
         {classes?.map((singleClass: IClass, index: number) => {
            return <SingleClass key={index} {...singleClass} />;
         })}
      </div>
   );
};

export default Classes;
