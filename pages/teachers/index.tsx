import TeacherLayout from "@/components/layouts/TeacherLayout";
import React, { useEffect, useState } from "react";
import RecentInteraction from "@/components/parents/multiplayer/RecentInteraction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import StudentsList from "@/components/Teachers/UI/StudentsList";
import { getStudents } from "store/studentSlice";
import StudentBarChart from "@/components/Teachers/students/screentime/BarChart";
import { useRouter } from "next/router";
import StudentLevelChart from "@/components/Teachers/students/level-threshold/BarChart";
import { fetchStudentBlockGameProgress } from "store/teacherStudentSlice";
import { getChildProgress } from "store/parentChildSlice";
import TeacherStudentSkills from "@/components/Teachers/students/studentsprogress/skills";
import TeacherStudentCompletedStandard from "@/components/Teachers/students/studentsprogress/standard";
import TeacherStudentProgress from "@/components/Teachers/students/studentsprogress/progress";

interface TeachersTabs {
   students: boolean;
}

const Dashboard = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const { currentStudent } = useSelector((state: RootState) => state.teacherStudentSlice);
   const { id: classId } = useSelector((state: RootState) => state.currentClass);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isBlockProgress, setIsBlockProgress] = useState<boolean>(false);
   const [progressData, setProgressData] = useState<any[]>([]);
   const [tabs, setTabs] = useState<TeachersTabs>({ students: false });

   const toggleTab = (key: keyof TeachersTabs, open: boolean) => {
      setTabs({ ...tabs, [key]: open });
   };
   const calculateAge = (dob: string): number => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
         age--;
      }
      return age;
   };

   useEffect(() => {
      if (classId) {
         dispatch(getStudents(classId));
      }
   }, [classId, dispatch]);

   useEffect(() => {
      const studentId = currentStudent?.student_id;
      const dob = currentStudent?.dob;

      if (classId && studentId && dob) {
         setIsLoading(true);
         const age = calculateAge(dob);
         const isUnder14 = age < 14;
         setIsBlockProgress(isUnder14);
         const progressAction = isUnder14 ? fetchStudentBlockGameProgress({ classId, studentId }) : getChildProgress(studentId);

         dispatch(progressAction)
            .unwrap()
            .then((res: any) => {
               console.log("Fetched Progress Data:", res);
               setProgressData(isUnder14 ? res : res?.topic || []);
            })
            .catch((err: any) => {
               console.error("Error fetching progress:", err);
            })
            .finally(() => {
               setIsLoading(false);
            });
      }
   }, [classId, currentStudent?.student_id, currentStudent?.dob, dispatch]);
   const allProgressItems = Array.isArray(progressData) ? progressData : [];
   const inProgressItems = allProgressItems.filter((item) => item.progress < 1.0);
   const completedItems = allProgressItems.filter((item) => item.progress === 1.0);
   const filteredCompletedItems = completedItems.filter((item) => {
      const hasNoCurriculum =
         item.iready_math_desc?.includes("(No direct curriculum unit)") && item.common_core_math_desc?.includes("(No direct curriculum unit)");
      return !hasNoCurriculum;
   });

   return (
      <TeacherLayout>
         <StudentsList isOpen={tabs.students} open={() => toggleTab("students", true)} close={() => toggleTab("students", false)} />

         <div className="relative h-auto bottom-14 mb-[-120px] scale-90 overflow-x-auto overflow-scroll sm:bottom-0 sm:mb-0 sm:scale-100">
            <div className="grid grid-flow-row grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 h-auto overflow-scroll">
               <TeacherStudentProgress
                  size="base"
                  level={(currentStudent?.level as number) + 1}
                  progressItems={inProgressItems}
                  isLoading={isLoading}
                  isBlockProgress={isBlockProgress}
                  completedItems={completedItems}
                  currentProgress={!isBlockProgress && currentStudent?.progress?.current}
               />
               <TeacherStudentCompletedStandard completedItems={filteredCompletedItems} isLoading={isLoading} />
               <TeacherStudentSkills size="base" />
               <div className="dashboard-widget">
                  <StudentBarChart showEditLink={false} />
               </div>
               <div className="dashboard-widget">
                  <StudentLevelChart  showEditLink={false} />
               </div>
               <RecentInteraction />
            </div>
         </div>
      </TeacherLayout>
   );
};

export default Dashboard;
