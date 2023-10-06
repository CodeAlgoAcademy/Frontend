import BarChart from "@/components/parents/UI/BarChart";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { screentimeTypes } from "types/interfaces";
import { changeTimeLimit } from "utils/timelimit";

const StudentBarChart = () => {
   const slug = useRouter();
   const [timeLimits, setTimeLimits] = useState<screentimeTypes[]>([]);

   const student = useSelector((state: RootState) => state?.students?.currentStudent);

   useEffect(() => {
      if (student) {
         setTimeLimits(changeTimeLimit(student?.timeLimits as screentimeTypes[]));
      }
   }, [student?.id]);

   return (
      <>
         <div className="mt-12 w-full overflow-y-auto rounded-md bg-white p-6 ">
            <BarChart
               data={(timeLimits || [])?.map((time) => (time.timeLimit === "No Limit" ? 8 : parseInt(time.timeLimit as string)))}
               barSpace={9.6}
               barWidth={4.3}
               maxHours={8}
            />
         </div>
         {slug.asPath === `/teachers/students/${slug?.query?.classId}/${slug?.query?.studentId}` && (
            <Link href={`/teachers/students/${slug?.query?.classId}/${slug.query.studentId}/screen-time`}>
               <p className="mt-4 ml-auto max-w-fit cursor-pointer text-[.9rem] font-medium underline">Edit Screentime Settings</p>
            </Link>
         )}
      </>
   );
};

export default StudentBarChart;
