import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaChevronUp } from 'react-icons/fa';
import { allSKills } from 'store/skillsSlice';
import { IMainAssignment, SkillDetails } from 'types/interfaces';

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
    <div className="w-full bg-gray-200 shadow-md p-3 rounded-md">
      <header className="w-full flex gap-4 justify-between items-center">
        <div className={styles.title}>
          <h1>{assignment.title}</h1>
        </div>
        <span onClick={toggleAccordion} className="cursor-pointer">
          {accordionOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </header>
      {accordionOpen && (
        <main className="p-3">
          <div className="mb-2">
            <div className="flex justify-between gap-2 items-center">
              <div className="flex justify-start gap-2 items-center">
                <p className="text-[17px] font-bold text-orange-600">Due Date:</p>
                <p className="text-[17px]">{assignment.end_date}</p>
              </div>
              {assignment.status === 'draft' && (
                <button
                  className="px-2 py-2 rounded-md text-white bg-orange-600 hover:shadow-md transition"
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
                  <article key={index} className="flex gap-2 items-start">
                    <span className="text-orange-600 pt-1 text-[15px]">
                      <FaChevronRight />
                    </span>
                    <div>
                      <h2 className="text-[16px] font-bold mb-1">{skill.categoryId}</h2>
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
                <article key={index} className="flex gap-2 items-start">
                  <span className="text-orange-600 pt-1 text-[15px]">
                    <FaChevronRight />
                  </span>
                  <div>
                    <h1 className="text-[16px] font-bold mb-1">
                      {student.firstName + ' ' + student.lastName}
                    </h1>
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
  title: 'text-[17px] font-bold capitalize',
};

export default SingleAssignment;
