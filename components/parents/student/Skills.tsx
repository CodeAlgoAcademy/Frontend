import React, { ReactElement, useEffect, useState } from "react";
import ContentBox from "../UI/ContentBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { fetchChildBlockGameSkills, getChildSkills } from "store/parentChildSlice";
import { BiCheck } from "react-icons/bi";

interface ISkillProps {
   size: "large" | "base";
}

interface SkillData {
  name: string;
  value: number;
}

const Skills = ({ size }: ISkillProps) => {
   const parent = useSelector((state: RootState) => state.parentChild);
   const dispatch = useDispatch();
   
    const [skills, setSkills] = useState<SkillData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
   useEffect(() => {
    const studentId = parent?.currentChild?.id;

    if (studentId) {
      setIsLoading(true);
      dispatch(fetchChildBlockGameSkills(studentId))
        .unwrap()
        .then((res: SkillData[]) => {
          console.log({ res }, "skills");
          setSkills(res); // Assuming res is an array
        })
        .catch((err: any) => {
          console.error("Error fetching block game skills:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [parent?.currentChild?.id, dispatch]);

  const hasSkills = skills && skills.length > 0;


   // useEffect(() => {
   //    if (parent?.currentChild?.id) {
   //       dispatch(fetchChildBlockGameSkills());
   //       // dispatch(getChildSkills());
   //    }
   // }, [parent?.currentChild?.id]);

   return (
    <ContentBox size={size} title="Skills" padding="small" style={{ height: "400px" }}>
  <div className="mt-2 grid h-full grid-cols-2 gap-5">
    {isLoading ? (
      <div className="flex h-full text-sm text-gray-400 animate-pulse">
        Loading skills...
      </div>
    ) : hasSkills ? (
      skills.map((skill, index) => (
        <div key={index}>
          <span className="mr-2 inline-block align-middle text-[1.2rem] font-bold">
            <BiCheck color="rgba(251, 87, 176, 1)" />
          </span>
          <p className="inline-block capitalize">{skill.name}: {skill.value}</p>
        </div>
      ))
    ) : (
      <div className="w-full items-center justify-center text-[1rem] text-center text-gray-500">
        <p>{parent?.currentChild?.fullName} has no skills awarded.</p>
      </div>
    )}
  </div>
         {/* <div className="mt-2 grid h-full grid-cols-2 gap-5">
            <SkillBox>
               for completed skills
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
            <SkillBox></SkillBox>
         </div> */}
         
      </ContentBox>
   );
};

export default Skills;
