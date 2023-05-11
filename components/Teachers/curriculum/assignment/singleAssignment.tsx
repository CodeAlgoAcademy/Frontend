import React, { useState } from "react";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa";
import { allSKills } from "utils/allSkill";
import { IMainAssignment, SkillDetails } from "types/interfaces";

const SingleAssignment = ({
   assignment,
   setEditAssignment,
}: {
   assignment: IMainAssignment;
   setEditAssignment: (assignment: any, id: string | number) => void;
}) => {
   const [accordionOpen, setAccordionOpen] = useState<boolean>(false);
   const getSkill = (id: string): SkillDetails => {
      return allSKills.find((skill) => {
         return skill.tests[0].testId == id;
      }) as SkillDetails;
   };

   const skills = assignment.skills.map((skill) => getSkill(skill.skillId));

   const toggleAccordion = () => {
      setAccordionOpen((prev) => !prev);
   };

   return (
      <div className="w-full rounded-md bg-gray-200 p-3 shadow-md">
         <header className="flex w-full cursor-pointer items-center justify-between gap-4" onClick={toggleAccordion}>
            <div className={styles.title}>
               <h1>{assignment.title}</h1>
            </div>
            <span className="cursor-pointer">{accordionOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
         </header>
         {accordionOpen && (
            <main className="p-3">
               <div className="mb-2">
                  <div className="my-2 flex flex-wrap items-center justify-between gap-2">
                     <div className="flex items-center justify-start gap-2">
                        <p className="text-[17px] font-bold text-[#2073fa]">Due Date:</p>
                        <p className="text-[17px]">{assignment.end_date}</p>
                     </div>
                     {assignment.status === "draft" && (
                        <button
                           className="rounded-md bg-[#2073fa] px-2 py-2 text-white transition hover:shadow-md"
                           onClick={() => {
                              setEditAssignment(assignment, assignment.id as string);
                           }}
                        >
                           Edit Assignment
                        </button>
                     )}
                  </div>
                  <h1 className={styles.title}>Skills</h1>

                  <div className="flex flex-col gap-2">
                     {skills.map((skill, index: number) => {
                        return (
                           <article key={index} className="flex items-start gap-2">
                              <span className="pt-1 text-[15px] text-[#2073fa]">
                                 <FaChevronRight />
                              </span>
                              <div>
                                 <h2 className="mb-1 text-[16px] font-bold">{skill.categoryId}</h2>
                                 <p className="text-[14px] font-light">{skill.categoryTitle}</p>
                              </div>
                           </article>
                        );
                     })}
                  </div>
               </div>
               <div>
                  <h1 className={styles.title}>Students</h1>
                  {assignment.students.map((student, index: number) => {
                     return (
                        <article key={index} className="flex items-start gap-2">
                           <span className="pt-1 text-[15px] text-[#2073fa]">
                              <FaChevronRight />
                           </span>
                           <div>
                              <h1 className="mb-1 text-[16px] font-bold">{student.firstName + " " + student.lastName}</h1>
                              <p className="text-[14px] font-light">{student.email}</p>
                           </div>
                        </article>
                     );
                  })}
               </div>
            </main>
         )}
      </div>
   );
};

const styles = {
   title: "text-[17px] font-bold capitalize",
};

export default SingleAssignment;
