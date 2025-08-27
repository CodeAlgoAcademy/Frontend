import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { BiCheck } from "react-icons/bi";
import { fetchStudentBlockGameSkill } from "store/teacherStudentSlice";
import ContentBox from "@/components/parents/UI/ContentBox";

interface ISkillProps {
  size: "large" | "base";
}

const TeacherStudentSkills = ({ size }: ISkillProps) => {
  const { isLoading, currentStudent } = useSelector(
    (state: RootState) => state.teacherStudentSlice
  );
  const skills = useSelector(
    (state: RootState) => state.teacherStudentSlice.currentStudent?.skills
  );
  const { id: classId } = useSelector((state: RootState) => state.currentClass);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (classId && currentStudent?.student_id) {
      dispatch(
        fetchStudentBlockGameSkill({
          classId,
          studentId: currentStudent.student_id,
        })
      );
    }
  }, [classId, currentStudent?.student_id, dispatch]);

  const hasSkills = skills && skills.length > 0;

  return (
    <ContentBox size={size} title="Skills" padding="small" style={{ height: "400px" }}>
      {isLoading ? (
        <div className="flex h-full items-center justify-center text-sm text-gray-400">
          Loading skills...
        </div>
      ) : hasSkills ? (
        <div className="mt-2 grid h-full grid-cols-2 gap-5">
          {skills.map((skill, index) => (
            <div key={index}>
              <BiCheck
                color="rgba(251, 87, 176, 1)"
                className="mr-2 inline-block align-middle text-[1.2rem] font-bold"
              />
              <p className="inline-block capitalize">
                {skill.title}: {skill.level}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-full items-center justify-center text-center text-[1rem] text-gray-500">
          <p>{currentStudent?.firstName} has no skills awarded.</p>
        </div>
      )}
    </ContentBox>
  );
};

export default TeacherStudentSkills;
