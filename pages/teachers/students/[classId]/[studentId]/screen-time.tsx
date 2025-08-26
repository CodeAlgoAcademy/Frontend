import StudentBarChart from "@/components/Teachers/students/screentime/BarChart";
import ScreentimeRestrictions from "@/components/Teachers/students/screentime/ScreentimeRestrictions";
import TeacherLayout from "@/components/layouts/TeacherLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsArrowLeft, BsArrowLeftCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { getSingleStudent, getStudentScreentime } from "store/studentSlice";
import { changeCurrentStudent } from "store/teacherStudentSlice";
import { BaseStudent } from "types/interfaces/teacherstudent.interface";

export default function Screentime() {
   const slug = useRouter();
   const dispatch = useDispatch();
//  const teacherStudents = useSelector((state: RootState) => state.teacherStudentSlice);
   const student = useSelector((state: RootState) => state.students?.currentStudent);

useEffect(() => {
   if (slug?.query?.classId && slug?.query?.studentId) {
      dispatch(
         getSingleStudent({
            classId: slug.query.classId as string,
            studentId: slug.query.studentId as string,
         })
      ).unwrap().then((student: BaseStudent) => {
         dispatch(changeCurrentStudent(student));
      });
   }
}, [slug]);


   useEffect(() => {
      if (student?.id) dispatch(getStudentScreentime(student?.id));
   }, [student?.id]);

   return (
      <TeacherLayout className={styles.container}>
         <div className={styles.containerHeader}>
            <Link href={`/teachers/students/${slug?.query?.classId}/${slug?.query?.studentId}`}>
               <BsArrowLeftCircle className="cursor-pointer" />
            </Link>
            <h1 className={styles.headerTitle}>{student?.firstName} Screentime</h1>
         </div>

         <div>
            <StudentBarChart showEditLink={false}/>
         </div>

         <div className="mt-10">
            <ScreentimeRestrictions />
         </div>
      </TeacherLayout>
   );
}

const styles = {
   container: "bg-[#ECEDF3] py-5 overflow-x-auto flex-1 w-full students-container",
   containerHeader: "flex gap-[1rem] py-3 items-center border-b border-b-slate-400 students-container",
   headerTitle: "font-medium md:text-[30px] text-[26px] students-container text-mainColor",
   subheader: "font-medium md:text-[26px] text-[22px] students-container text-mainColor mt-[1rem] border-b border-b-slate-400 pb-3",
};
