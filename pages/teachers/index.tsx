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
import { fetchStudentBlockGameProgress, fetchStudentLineProgress } from "store/teacherStudentSlice";
import TeacherStudentSkills from "@/components/Teachers/students/studentsprogress/skills";
import TeacherStudentCompletedStandard from "@/components/Teachers/students/studentsprogress/standard";
import TeacherStudentProgress from "@/components/Teachers/students/studentsprogress/progress";
import { useAppDispatch } from "store/hooks";

interface TeachersTabs {
   students: boolean;
}

const Dashboard = () => {
   const dispatch = useAppDispatch();
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

   // useEffect(() => {
   //    const studentId = currentStudent?.student_id || currentStudent?.id;
   //    const dob = currentStudent?.dob;

   //    if (classId && studentId && dob) {
   //       setIsLoading(true);
   //       const age = calculateAge(dob);
   //       const isUnder14 = age < 14;
   //       setIsBlockProgress(isUnder14);

   //       const action = isUnder14 
   //          ? fetchStudentBlockGameProgress({ classId, studentId }) 
   //          : fetchStudentLineProgress({ classId: classId.toString(), studentId: studentId.toString() });
   //          dispatch(action)
   //          .unwrap()
   //          .then((res: any) => {
   //             if (isUnder14) {
   //                setProgressData(Array.isArray(res) ? res : []);
   //             } else {
   //                setProgressData(res?.topic || []);
   //             }
   //          })
   //          .catch(err => console.error(err))
   //          .finally(() => setIsLoading(false));
   //    }
   // }, [classId, currentStudent?.student_id, currentStudent?.dob]);


   // Update the useEffect in teachers/index.tsx

useEffect(() => {
   const studentId = currentStudent?.student_id || currentStudent?.id;
   const dob = currentStudent?.dob;

   if (classId && studentId && dob) {
      setIsLoading(true);
      const age = calculateAge(dob);
      const isUnder14 = age < 14;
      setIsBlockProgress(isUnder14);

      const action = isUnder14 
         ? fetchStudentBlockGameProgress({ classId, studentId }) 
         : fetchStudentLineProgress({ classId: classId.toString(), studentId: studentId.toString() });

      dispatch(action)
         .unwrap()
         .then((res: any) => {
            // NORMALIZATION:
            // Block returns an array directly.
            // Python returns an array of standards.
            const normalizedData = Array.isArray(res) ? res : res?.topic || [];
            setProgressData(normalizedData);
         })
         .catch(err => console.error("Progress Fetch Error:", err))
         .finally(() => setIsLoading(false));
   }
}, [classId, currentStudent?.student_id, currentStudent?.dob, dispatch]);


   const allProgressItems = Array.isArray(progressData) ? progressData : [];
   const inProgressItems = allProgressItems.filter((item) => (item.progress || 0) < 1.0);
   const completedItems = allProgressItems.filter((item) => (item.progress || 0) >= 1.0);


   

   const filteredCompletedItems = completedItems.filter((item) => {
      const hasNoCurriculum =
         item.iready_math_desc?.includes("(No direct curriculum unit)") && item.common_core_math_desc?.includes("(No direct curriculum unit)");
      return !hasNoCurriculum;
   });

   return (
      <TeacherLayout>
         <StudentsList isOpen={tabs.students} open={() => toggleTab("students", true)} close={() => toggleTab("students", false)} />

         <div className="relative bottom-14 mb-[-120px] h-auto scale-90 overflow-scroll 
         overflow-x-auto sm:bottom-0 sm:mb-0 sm:scale-100">
            <div className="grid h-auto grid-flow-row grid-cols-1 gap-6 overflow-scroll 
            sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
               <TeacherStudentProgress
                  size="base"
                  level={(currentStudent?.level as number) + 1}
                  progressItems={inProgressItems}
                  isLoading={isLoading}
                  completedItems={completedItems}
                  isBlockProgress={isBlockProgress}
               />
               <TeacherStudentCompletedStandard 
                  completedItems={completedItems} 
                  isLoading={isLoading} 
               />
               <TeacherStudentSkills 
                  size="base" 
                  allProgressItems={allProgressItems} 
               />

               <div className="dashboard-widget">
                  <StudentBarChart showEditLink={false} />
               </div>
               <div className="dashboard-widget">
                  <StudentLevelChart showEditLink={false} />
               </div>
               <RecentInteraction />
            </div>
         </div>
      </TeacherLayout>
   );
};

export default Dashboard;
