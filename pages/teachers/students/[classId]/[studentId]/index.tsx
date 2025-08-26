"use client";
import StudentLevelChart from "@/components/Teachers/students/level-threshold/BarChart";
import StudentBarChart from "@/components/Teachers/students/screentime/BarChart";
import TeacherLayout from "@/components/layouts/TeacherLayout";
import StudentProfileInfo from "@/components/parents/UI/StudentProfileInfo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { getSingleStudent, getStudentScreentime } from "store/studentSlice";
import { changeCurrentStudent } from "store/teacherStudentSlice";
import { BaseStudent } from "types/interfaces/teacherstudent.interface";

export default function StudentProfile() {
   const dispatch = useDispatch();
   const slug = useRouter();

   const student = useSelector((state: RootState) => state.students?.currentStudent);

   useEffect(() => {
   if (slug?.query?.classId) {
      dispatch(
         getSingleStudent({
            classId: slug?.query?.classId,
            studentId: slug?.query?.studentId,
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
            <Link href={"/teachers/students"}>
               <BsArrowLeftCircle className="cursor-pointer" />
            </Link>
            <h1 className={styles.headerTitle}>Student Profile</h1>
         </div>

         <header className="mt-6 flex flex-wrap justify-center gap-[3rem]">
            <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
               <Image width={200} height={200} src={"/assets/no user.png"} />
            </div>
            <div className="grid min-w-[200px] flex-1 grid-cols-2 gap-[1rem]">
               <StudentProfileInfo header="Name" body={student?.firstName + " " + student?.lastName} />
               <StudentProfileInfo header="Username" body={student?.username} />
               <StudentProfileInfo header="Email" body={student?.email} />
            </div>
         </header>

         <div>
            <h2 className={styles.subheader}>Screentime</h2>
            <div>
               <StudentBarChart />
            </div>
         </div>
         <div>
            <h2 className={styles.subheader}>Level Threshold</h2>
            <div>
               <StudentLevelChart />
            </div>
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
