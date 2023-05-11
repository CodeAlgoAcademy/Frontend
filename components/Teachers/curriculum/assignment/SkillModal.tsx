import React, { ChangeEventHandler, MouseEventHandler, useState, useEffect } from "react";

import { TbMedal } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiMagnifyingGlass } from "react-icons/hi2";

import Button from "@/components/UI/Button";

import { SkillDetails, DynamicChechbox } from "../../../../types/interfaces";

import { useDispatch } from "react-redux";
import { updateSkills, searchSkills } from "../../../../store/skillsSlice";

const SkillModal = ({
   skills,
   hideModal,
   handleSkillCheckboxChange,
   skillCheckbox,
}: {
   skills: SkillDetails[];
   hideModal: MouseEventHandler;
   handleSkillCheckboxChange: ChangeEventHandler;
   skillCheckbox: DynamicChechbox;
}) => {
   const [grade, setGrade] = useState("Grade 1");
   const [skillType, setSkillType] = useState("CTSA");
   const [searchParams, setSearchParams] = useState("");
   const [pickerDisplay, setPickerDisplay] = useState({
      grade: false,
      skill: false,
   });
   const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchParams((prev) => e.target.value);
      dispatch(searchSkills({ params: e.target.value, grade, skillType }));
   };
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(updateSkills({ grade, skillType }));
   }, [dispatch, grade, skillType]);
   return (
      <div className="min-h-[650px] w-fit py-8">
         <div className="mb-auto flex h-full  grow flex-col items-stretch gap-8 pl-12 md:flex-row">
            <div className="flex w-[180px] flex-col justify-between gap-4">
               <div>
                  <h3 className="text-2xl font-semibold">Select Skill</h3>
                  <div className="mt-12 flex w-full flex-row flex-wrap items-center justify-center gap-4 md:flex-col md:justify-start">
                     <div className="mx-auto flex h-[46px] min-w-[180px] max-w-fit items-center justify-between rounded-lg bg-gray-100 px-4 py-2 drop-shadow-md md:mx-0 md:min-w-fit">
                        <p className="text-sm font-semibold opacity-60">Computer</p>
                     </div>
                     <div className="z-top relative mx-auto flex h-[46px] w-full min-w-[180px] max-w-fit flex-1 items-center justify-between rounded-lg bg-gray-100 px-4 py-2 drop-shadow-md md:mx-0 md:min-w-fit">
                        <p className="... truncate text-sm font-semibold opacity-60">{skillType}</p>
                        <span
                           className="cursor-pointer text-3xl opacity-60"
                           onClick={() => {
                              setPickerDisplay((prev) => {
                                 return { grade: false, skill: !prev.skill };
                              });
                           }}
                        >
                           <RiArrowDropDownLine />
                        </span>
                        {pickerDisplay.skill && (
                           <div className="small-scroll-thumb absolute top-10 left-0 grid h-32 w-[90%] flex-1 grid-cols-1 items-center gap-1 overflow-y-auto rounded-lg bg-gray-100 drop-shadow-md">
                              {["CTSA", "Kansas", "New York", "Missouri"].map((skill) => (
                                 <span
                                    key={skill}
                                    className="cursor-pointer py-2 text-center text-sm font-semibold opacity-50 hover:bg-gray-300"
                                    onClick={() => {
                                       setSkillType((prev) => skill);
                                       setPickerDisplay((prev) => {
                                          return { grade: false, skill: false };
                                       });
                                    }}
                                 >
                                    {skill}
                                 </span>
                              ))}
                           </div>
                        )}
                     </div>
                     <div className="relative mx-auto flex h-[46px] w-full min-w-[180px] max-w-fit flex-1 items-center justify-between rounded-lg bg-gray-100 px-4 py-2 drop-shadow-md md:mx-0 md:min-w-fit">
                        <p className="... truncate text-sm font-semibold opacity-60">{grade}</p>
                        <span
                           className="cursor-pointer text-3xl opacity-60"
                           onClick={() => {
                              setPickerDisplay((prev) => {
                                 return { skill: false, grade: !prev.grade };
                              });
                           }}
                        >
                           <RiArrowDropDownLine />
                        </span>
                        {pickerDisplay.grade && (
                           <div className="small-scroll-thumb absolute top-10 left-0 grid h-48 w-[90%] grid-cols-1 items-center gap-1 overflow-y-auto rounded-lg bg-gray-100 drop-shadow-md">
                              {["Kindergarden", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8"].map(
                                 (grade) => (
                                    <span
                                       key={grade}
                                       className="cursor-pointer py-2 text-center text-sm font-semibold opacity-50 hover:bg-gray-300"
                                       onClick={() => {
                                          setGrade((prev) => grade);
                                          setPickerDisplay((prev) => {
                                             return { grade: false, skill: false };
                                          });
                                       }}
                                    >
                                       {grade}
                                    </span>
                                 )
                              )}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <span onClick={hideModal} className="hidden md:block">
                  <Button color="#2073fa" text="Done" />
               </span>
            </div>
            <div>
               <div className="relative max-w-[80%] rounded-lg bg-gray-100 px-16 py-[10px]">
                  <input
                     type="text"
                     className="border-none bg-transparent outline-none placeholder:font-semibold"
                     name="search"
                     value={searchParams}
                     onChange={handleSearchInput}
                     placeholder="Search skill"
                  />
                  <span className="absolute left-4 top-3 text-2xl text-gray-400">
                     <HiMagnifyingGlass />{" "}
                  </span>
               </div>
               <div className="small-scroll-thumb mt-12 grid h-[500px] grid-cols-1 gap-6 overflow-y-auto scroll-smooth pr-4">
                  {skills.map(({ categoryId, categoryTitle, tests }) => (
                     <div key={categoryId} className="h-fit max-w-[550px] rounded-xl border bg-white drop-shadow-md">
                        <div className="relative flex h-14 items-center justify-between gap-8 border-b pl-4 pr-[84px]">
                           <div className="flex items-center gap-4">
                              <div className="text-3xl text-[#2073fa]">
                                 <TbMedal />
                              </div>
                              <div className="flex items-center gap-2">
                                 <h3 className="text-lg font-bold">{categoryId}</h3>
                                 <p
                                    className="... hidden w-[300px] cursor-default truncate text-sm font-semibold opacity-60 md:block"
                                    title={categoryTitle}
                                 >
                                    {categoryTitle}
                                 </p>
                              </div>
                           </div>
                           <span className="... absolute right-5 top-4 truncate rounded-2xl bg-[#2073fa]/70 py-1 px-4 text-xs font-bold opacity-70">
                              {tests.length} {tests.length > 1 ? "skills" : "skill"}
                           </span>
                        </div>
                        <div className="divide-y">
                           {tests.map(({ testTitle, testId }) => (
                              <div key={testId} className="flex h-12 items-center gap-4 px-6">
                                 <label className="checkbox-container">
                                    <input type="checkbox" name={testId} checked={skillCheckbox[testId]} onChange={handleSkillCheckboxChange} />
                                    <span className="checkmark small-checkmark"></span>
                                 </label>
                                 <p className="... w-full truncate text-sm font-semibold opacity-60">{testTitle}</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="block md:hidden">
               <span onClick={hideModal} className="">
                  <Button color="#2073fa" text="Done" />
               </span>
            </div>
         </div>
      </div>
   );
};

export default SkillModal;
