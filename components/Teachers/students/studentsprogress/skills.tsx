import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { BiCheck } from "react-icons/bi";
import { fetchStudentBlockGameSkill } from "store/teacherStudentSlice";
import ContentBox from "@/components/parents/UI/ContentBox";

interface ISkillProps {
  size: "large" | "base";
  allProgressItems: any[];
}

const TeacherStudentSkills = ({ size, allProgressItems }: ISkillProps) => {
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
  const standardsWithProgress = allProgressItems.filter(item => 
    item.standard_code !== "default_standard"
  );

  // Get proficiency color function
  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "No Evidence":
        return "bg-gray-100 text-gray-800";
      case "Beginning":
        return "bg-yellow-100 text-yellow-800";
      case "Developing":
        return "bg-blue-100 text-blue-800";
      case "Proficient":
        return "bg-green-100 text-green-800";
      case "Exceeds Expectations":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <ContentBox size={size} title="Skills & Proficiency" padding="small" style={{ height: "400px" }}>
      {isLoading ? (
        <div className="flex h-full items-center justify-center text-sm text-gray-400">
          Loading skills...
        </div>
      ) : (
        <div className="flex h-full flex-col">
          {/* Skills Section - Top */}
          <div className="flex-1 overflow-y-auto">
            <h4 className="mb-3 text-sm font-semibold text-gray-700">Mastered Skills</h4>
            {hasSkills ? (
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-start">
                    <BiCheck
                      color="rgba(251, 87, 176, 1)"
                      className="mr-2 mt-0.5 flex-shrink-0 text-[1.2rem] font-bold"
                    />
                    <p className="inline-block capitalize text-sm">
                      {skill.title}: {skill.level}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-center text-gray-500 text-sm">
                  {currentStudent?.firstName} has no skills awarded.
                </p>
              </div>
            )}
          </div>

          {/* Proficiency Section - Bottom */}
          <div className="mt-4 border-t pt-4">
            <h4 className="mb-2 text-sm font-semibold text-gray-700">Proficiency Progress</h4>
            
            <div className="max-h-40 overflow-y-auto space-y-2">
              {standardsWithProgress.map((standard, index) => (
                <div key={index} className="flex items-center justify-between p-2 m-1 border rounded-lg">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{standard.standard_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <>
                    {standard.progress !== null && (
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round(standard.progress * 100)}% complete
                      </p>
                    )}
                    </>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(standard.proficiency)}`}>
                      {standard.proficiency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ContentBox>
  );
};

export default TeacherStudentSkills;