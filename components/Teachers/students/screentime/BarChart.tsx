import BarChart from "@/components/parents/UI/BarChart";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { screentimeTypes } from "types/interfaces";
import { changeTimeLimit } from "utils/timelimit";

interface StudentBarChartProps {
  showEditLink?: boolean;
}

const StudentBarChart = ({ showEditLink = true }) => {
   const router = useRouter();
   const [timeLimits, setTimeLimits] = useState<screentimeTypes[]>([]);
  const { currentStudent } = useSelector((state: RootState) => state.teacherStudentSlice);
   const classId = useSelector((state: RootState) => state.currentClass?.id);
   //  const { students } = useSelector((state: any) => state.students);

   useEffect(() => {
      if (currentStudent) {
         setTimeLimits(changeTimeLimit(currentStudent?.timeLimits as screentimeTypes[]));
      }
   }, [currentStudent?.student_id, currentStudent?.timeLimits]);

   const canEdit = !!(classId && currentStudent?.student_id);

   return (
      <div className="screentime-widget">
         <div
            className=" w-full overflow-y-auto rounded-2xl bg-white p-6"
            style={{ minWidth: "100%", maxWidth: "100%", height: "400px", }}
         >
            <BarChart
               data={(timeLimits || []).map((time) =>
                  time.timeLimit === "No Limit" ? 8 : parseInt(time.timeLimit as string)
               )}
               barSpace={9.6}
               barWidth={4.3}
               maxHours={8}
            />
         </div>

        {showEditLink && canEdit && (
        <Link
      //   slug?.query?.studentId
           href={`/teachers/students/${classId}/${currentStudent.id}/screen-time`}
          className="mt-4 ml-auto block max-w-fit cursor-pointer text-[.9rem] font-medium underline"
        >
          <span className="mt-3 ml-auto block w-fit cursor-pointer text-sm font-light underline hover:text-mainColor">
            Edit Screentime Settings
          </span>
        </Link>
      )}
      </div>
   );
};
export default StudentBarChart;
