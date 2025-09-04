import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import LevelThresholdInput from "@/components/parents/UI/levelthreshold";
import { toast } from "sonner";
import { getStudents } from "store/studentSlice";
import { createOrUpdateLevelThreshold } from "store/teacherStudentSlice";
import { useDebouncedCallback } from "hooks/useDebounce";

const ALL_GRADES = ["0", "1", "2", "3", "4"] as const;

interface LevelThresholdRestrictionsProps {
   onEditSuccess?: () => void;
}

const LevelThresholdRestrictions = ({ onEditSuccess }: LevelThresholdRestrictionsProps) => {
   const dispatch = useDispatch();
   const classId = useSelector((state: RootState) => state.currentClass?.id);
   const { currentStudent } = useSelector((state: RootState) => state.teacherStudentSlice);
   const studentId = currentStudent?.student_id;

   const thresholds = useMemo(() => {
      return ALL_GRADES.map((grade, index) => {
         const backendData = currentStudent?.levelThresholds?.find((t) => t.grade === grade);
         return {
            id: backendData?.id ?? 0,
            level: backendData?.level ?? 10,
            grade,
         };
      });
   }, [currentStudent?.levelThresholds]);

   const updateLevel = useDebouncedCallback(async (id: number, level: number, grade: string) => {
      if (!studentId || !classId) {
         toast.error("Invalid level threshold");
         return;
      }

      try {
         await dispatch(
            createOrUpdateLevelThreshold({
               class_id: classId,
               student_id: studentId,
               data: { level, grade },
            })
         );
         await dispatch(getStudents(classId));
         toast.success("Level threshold updated successfully");
         if (onEditSuccess) onEditSuccess();
      } catch (err) {
         toast.error("Failed to update level threshold");
         console.error("Update error:", err);
      }
   }, 800);

   return (
      <div className="relative mt-[3rem] min-h-[340px] max-w-fit rounded-md bg-white px-8 py-10 md:w-full md:min-w-[420px]">
         <h1 className="text-[1.3rem] font-semibold text-mainColor">Level Threshold Settings</h1>
         <h2 className="mt-2 mb-10 text-[14px] font-medium">Set thresholds required to progress through each level.</h2>
         <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            {thresholds.map((t, i) => (
               <LevelThresholdInput key={i} threshold={t} updateLevelThreshold={updateLevel} />
            ))}
         </div>
      </div>
   );
};

export default LevelThresholdRestrictions;
