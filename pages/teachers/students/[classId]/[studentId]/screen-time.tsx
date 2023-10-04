import StudentBarChart from "@/components/Teachers/students/screentime/BarChart";
import ScreentimeRestrictions from "@/components/Teachers/students/screentime/ScreentimeRestrictions";
import TeacherLayout from "@/components/layouts/TeacherLayout";

export default function Screentime() {
   return (
      <TeacherLayout className={styles.container}>
         <div className={styles.containerHeader}>
            <h1 className={styles.headerTitle}>Adejare Daniel's Screentime</h1>
         </div>

         <div>
            <StudentBarChart />
         </div>

         <div>
            <ScreentimeRestrictions />
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
