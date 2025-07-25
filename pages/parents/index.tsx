import ParentLayout from "@/components/layouts/ParentLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChildBlockGameProgress, getChildProgress } from "store/parentChildSlice";
import { RootState } from "store/store";
import { IChildProgress } from "types/interfaces";
import Skills from "@/components/parents/student/Skills";
import Level from "@/components/parents/student/Level";
import Screentime from "@/components/parents/screentime/Screentime";
import RecentInteraction from "@/components/parents/multiplayer/RecentInteraction";
import CompletedStandard from "./standard";
import LevelsThreshold from "@/components/parents/threshold/LevelThreshold";

const Dashboard = () => {
  const dispatch = useDispatch();
  const parent = useSelector((state: RootState) => state.parentChild);
  const [progressData, setProgressData] = useState<IChildProgress[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBlockProgress, setIsBlockProgress] = useState<boolean>(false);

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
    const studentId = parent?.currentChild?.id;
    const dob = parent?.currentChild?.dob;

    if (studentId && dob) {
      setIsLoading(true);
      
      const age = calculateAge(dob);
      const isUnder14 = age < 14;
      setIsBlockProgress(isUnder14);
      const progressAction = isUnder14 ? fetchChildBlockGameProgress(studentId) : getChildProgress(studentId);

      dispatch(progressAction)
        .unwrap()
        .then((res: IChildProgress[]) => {
          if (isUnder14) {
            setProgressData(res);
          } else {
            setProgressData(res);
          }
        })
        .catch((err: any) => {
          console.error("Error fetching progress:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [parent?.currentChild?.id, parent?.currentChild?.dob, dispatch]);

   const getProgressItems = () => {
    if (!progressData) return [];

    if (isBlockProgress) {
      return Array.isArray(progressData) ? progressData : [];
    }
    
    if (progressData && typeof progressData === 'object' && !Array.isArray(progressData)) {
      return progressData || [];
    }
    
    return [];
  };

  const allProgressItems = getProgressItems();
  const inProgressItems = isBlockProgress ? allProgressItems.filter(item => item.progress < 100) : allProgressItems;

  const completedItems = isBlockProgress ? allProgressItems.filter(item => item.progress === 1.0) : [];

  return (
    <ParentLayout title="Dashboard">
  <div className="relative bottom-14 mb-[-120px] scale-90 overflow-x-auto sm:bottom-0 sm:mb-0 sm:scale-100">
    <div className="grid max-w-fit grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-6">
      <Level 
        size="base" 
        level={(parent?.currentChild?.level as number) + 1}
        progressItems={inProgressItems}
        isLoading={isLoading}
        isBlockProgress={isBlockProgress}
      />
      <CompletedStandard completedItems={completedItems} isLoading={isLoading} />
      <Skills size="base" />
      <Screentime size="base" />
      <LevelsThreshold size="base" />
      <RecentInteraction />
    </div>
  </div>
</ParentLayout>

  );
};

export default Dashboard;