import StudentBarChart from "@/components/Teachers/students/screentime/BarChart";
import TeacherLayout from "@/components/layouts/TeacherLayout";
import BarChart from "@/components/parents/UI/BarChart";
import StudentProfileInfo from "@/components/parents/UI/StudentProfileInfo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";

export default function StudentProfile() {
   const dispatch = useDispatch();

   return (
      <TeacherLayout className={styles.container}>
         <div className={styles.containerHeader}>
            <h1 className={styles.headerTitle}>Student Profile</h1>
         </div>

         <header className="mt-6 flex flex-wrap justify-center gap-[3rem]">
            <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
               <Image width={200} height={200} src={"/assets/no user.png"} />
            </div>
            <div className="grid min-w-[200px] flex-1 grid-cols-2 gap-[1rem]">
               <StudentProfileInfo header="Name" body="Daniel Adejare 👻" />
               <StudentProfileInfo header="Username" body="daniel-dunsin" />
               <StudentProfileInfo header="Email" body="adejaredaniel12@gmail.com" />
            </div>
         </header>

         <div>
            {/* Screentime */}
            <h2 className={styles.subheader}>Screentime</h2>
            <div>
               <StudentBarChart />
            </div>
         </div>
      </TeacherLayout>
   );
}

const styles = {
   container: "bg-[#ECEDF3] py-5 overflow-x-auto flex-1 w-full students-container",
   containerHeader: "flex justify-between py-3 items-center border-b border-b-slate-400 students-container",
   headerTitle: "font-medium md:text-[30px] text-[26px] students-container text-mainColor",
   subheader: "font-medium md:text-[26px] text-[22px] students-container text-mainColor mt-[1rem] border-b border-b-slate-400 pb-3",
};
