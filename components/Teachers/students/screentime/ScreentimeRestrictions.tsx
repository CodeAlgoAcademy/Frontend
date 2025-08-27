  import React, { useEffect, useState } from "react";
  import { days, screentimeTypes } from "types/interfaces";
  import { changeTimeLimit } from "utils/timelimit";
  import { useDispatch, useSelector } from "react-redux";
  import { RootState } from "store/store";
  import { editSudentsScreentime } from "store/teacherStudentSlice";
  import TeacherScreenTimeComponent from "../../UI/screenTimeComponent";
  import { getStudents } from "store/studentSlice";

  const ScreentimeRestrictions = () => {
    const classId = useSelector((state: RootState) => state.currentClass?.id);
    const currentStudent = useSelector(
      (state: RootState) => state.teacherStudentSlice.currentStudent          
    );
    const dispatch = useDispatch();

    const [timeLimits, setTimeLimits] = useState<screentimeTypes[]>([
      { id: 1, dayOfTheWeek: "Monday", timeLimit: 0 },
      { id: 2, dayOfTheWeek: "Tuesday", timeLimit: 0 },
      { id: 3, dayOfTheWeek: "Wednesday", timeLimit: 0 },
      { id: 4, dayOfTheWeek: "Thursday", timeLimit: 0 },
      { id: 5, dayOfTheWeek: "Friday", timeLimit: 0 },
      { id: 6, dayOfTheWeek: "Saturday", timeLimit: 0 },
      { id: 7, dayOfTheWeek: "Sunday", timeLimit: 0 },
    ]);

 const updateTime = async (
  id: string | number,
  day: days,
  hour: number | "No Limit"
) => {
  const data: screentimeTypes = { id, dayOfTheWeek: day, timeLimit: hour };

  if (currentStudent && classId && id) {
    try {
      await dispatch(
        editSudentsScreentime({
          class_id: classId,
          student_id: currentStudent.student_id,
          id,
          data,
        }) as any
      );
      await dispatch(getStudents(classId));
    } catch (error) {
      console.error("Failed to update screen time:", error);
    }
  }
};



    useEffect(() => {
      if (currentStudent?.timeLimits) {
        setTimeLimits(changeTimeLimit(currentStudent.timeLimits));
      }
    }, [currentStudent?.student_id, currentStudent?.timeLimits]);

    return (
      <div className="relative min-h-[340px] max-w-fit rounded-2xl bg-white px-8 py-10 md:w-full md:min-w-[420px]">
        <h1 className="text-[1.3rem] font-semibold text-mainColor">
          Current screen time restrictions
        </h1>
        <h2 className="mt-2 mb-10 text-[14px] font-medium">
          Make edits to screen time restrictions below
        </h2>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          {timeLimits?.map((time, index: number) => (
            <TeacherScreenTimeComponent
              key={time.id}
              time={time}
              updateScreenTimeForChild={updateTime}
              // studentId={currentStudent?.student_id}
            />
          ))}
        </div>
      </div>
    );
  };

  export default ScreentimeRestrictions;