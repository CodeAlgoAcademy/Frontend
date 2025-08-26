import TeacherLayout from "@/components/layouts/TeacherLayout";
import StudentLevelChart from "@/components/Teachers/students/level-threshold/BarChart";
import LevelThresholdRestrictions from "@/components/Teachers/students/level-threshold/ThresHoldRestrictions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { getSingleStudent, getStudentThreshold } from "store/studentSlice";

export default function LevelThreshold() {
   const router = useRouter();
   const dispatch = useDispatch();
   const [refreshKey, setRefreshKey] = useState(0);
   const student = useSelector((state: RootState) => state.students?.currentStudent);

   useEffect(() => {
      if (router?.query?.classId) {
         dispatch(
            getSingleStudent({
               classId: router.query.classId as string,
               studentId: router.query.studentId as string,
            })
         );
      }
   }, [router.query, dispatch]);

   useEffect(() => {
      if (student?.id) {
         dispatch(getStudentThreshold(student.student_id));
      }
   }, [student?.id, refreshKey, dispatch]);

   const handleRefresh = () => {
      setRefreshKey((prev) => prev + 1);
   };

   return (
      <TeacherLayout className={styles.container}>
         <div className={styles.containerHeader}>
            <Link href={`/teachers/students/${router.query.classId}/${router.query.studentId}`}>
               <BsArrowLeftCircle className="cursor-pointer" />
            </Link>
            <h1 className={styles.headerTitle}>{student?.firstName || "Student"}'s Level Thresholds</h1>
         </div>

         <div>
            <StudentLevelChart showEditLink={false} />
         </div>

         <div className="mt-10">
            <LevelThresholdRestrictions />
         </div>
      </TeacherLayout>
   );
}

const styles = {
   container: "bg-[#ECEDF3] py-5 overflow-x-auto flex-1 w-full",
   containerHeader: "flex gap-[1rem] py-3 items-center border-b border-b-slate-400",
   headerTitle: "font-medium md:text-[30px] text-[26px] text-mainColor",
};
