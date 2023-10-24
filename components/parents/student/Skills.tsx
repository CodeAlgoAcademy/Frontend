import React, { ReactElement, useEffect } from "react";
import ContentBox from "../UI/ContentBox";
import SkillBox from "./SkillBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { getChildSkills } from "store/parentChildSlice";
import { BiCheck } from "react-icons/bi";
import { IChildSkill } from "types/interfaces";

interface ISkillProps {
   size: "large" | "base";
}

const Skills = ({ size }: ISkillProps) => {
   const parent = useSelector((state: RootState) => state.parentChild);
   const dispatch = useDispatch();

   useEffect(() => {
      if (parent?.currentChild?.id) {
         dispatch(getChildSkills());
      }
   }, [parent?.currentChild?.id]);

   return (
      <ContentBox size={size} title="Skills" padding="small" style={{ minWidth: "100%", maxWidth: "100%" }}>
         <div className="mt-14 grid grid-cols-2">
            <p className="text-center">Completed Skills</p>
            <p className="text-center">Currently Learning</p>
         </div>
         <div className="mt-2 grid h-full grid-cols-2 gap-5">
            <SkillBox>
               {/* for completed skills */}
               {parent?.currentChild?.skills?.map((skill) => {
                  return (
                     <div key={skill.id}>
                        <span className=" mr-2 inline-block cursor-pointer align-middle text-[1.2rem] font-bold">
                           <BiCheck color="rgba(251, 87, 176, 1)" />
                        </span>
                        <p className="inline-block">{skill.title}</p>
                     </div>
                  );
               })}

               {(!parent?.currentChild?.skills || parent?.currentChild?.skills?.length == 0) && (
                  <div className="flex h-full items-center justify-center text-center text-[1.2rem]">
                     <p>{parent?.currentChild?.fullName} has not completed any skill</p>
                  </div>
               )}
            </SkillBox>
            <SkillBox>{/* for currently learning */}</SkillBox>
         </div>
      </ContentBox>
   );
};

export default Skills;
