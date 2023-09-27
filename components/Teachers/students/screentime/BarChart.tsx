import BarChart from "@/components/parents/UI/BarChart";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const StudentBarChart = () => {
   const slug = useRouter();

   return (
      <>
         <div className="mt-12 w-full overflow-y-auto rounded-md bg-white p-6 ">
            <BarChart data={[0, 0, 0, 0, 8, 1]} barSpace={9.6} barWidth={4.3} maxHours={8} />
         </div>
         {slug.asPath === `/teachers/students/${slug?.query?.id}` && (
            <Link href={`/teachers/students/${slug.query.id}/screen-time`}>
               <p className="mt-4 ml-auto max-w-fit cursor-pointer text-[.9rem] font-medium underline">Edit Screentime Settings</p>
            </Link>
         )}
      </>
   );
};

export default StudentBarChart;
