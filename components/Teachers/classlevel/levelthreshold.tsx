import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import LevelThresholdInput from "@/components/parents/UI/levelthreshold";
import { toast } from "sonner";
import { getStudents } from "store/studentSlice";
import { useDebouncedCallback } from "hooks/useDebounce";
import { bulkUpdateClassLevelThreshold } from "store/teachersClassSlice";

const ALL_GRADES = ["0", "1", "2", "3", "4"] as const;

interface ClassLevelThresholdBulkProps {
  onEditSuccess?: () => void;
}

const ClassLevelThresholdBulk = ({ onEditSuccess }: ClassLevelThresholdBulkProps) => {
  const dispatch = useDispatch();
  const classId = useSelector((state: RootState) => state.currentClass?.id);
  const students = useSelector((state: RootState) => state.students.students);

  const thresholds = useMemo(() => {
  return ALL_GRADES.map((grade) => {
    const gradeThresholds = students.flatMap(student =>
      student.levelThresholds?.filter(threshold => threshold.grade === grade) || []
    );
    const defaultLevel = gradeThresholds[0]?.level ?? 10;
    return {
      id: gradeThresholds[0]?.id ?? (parseInt(grade) + 1),
      level: defaultLevel,
      grade,
    };
  });
}, [students]);

  const updateLevel = useDebouncedCallback(async (id: number, level: number, grade: string) => {
    if (!classId) {
      toast.error("Invalid class");
      return;
    }

    try {
      await dispatch(
        bulkUpdateClassLevelThreshold({
          class_id: classId,
          data: { grade, level },
        }) as any
      );
      
      await dispatch(getStudents(classId));
      toast.success(`Level threshold updated for Grade ${grade}`);
      if (onEditSuccess) onEditSuccess();
    } catch (err) {
      toast.error("Failed to update level threshold");
      console.error("Update error:", err);
    }
  }, 800);

  useEffect(() => {
  if (classId) {
    dispatch(getStudents(classId));
  }
}, [classId, dispatch]);

  return (
    <div className="relative mt-[3rem] min-h-[340px] max-w-fit rounded-md bg-white px-8 py-10 md:w-full md:min-w-[420px]">
      <h1 className="text-[1.3rem] font-semibold text-mainColor">Bulk Level Threshold Settings</h1>
      <h2 className="mt-2 mb-10 text-[14px] font-medium">
        Set thresholds for all students in the class.
      </h2>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
        {thresholds.map((threshold, i) => (
          <LevelThresholdInput 
            key={i} 
            threshold={threshold} 
            updateLevelThreshold={updateLevel}
          />
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Changes will apply to <strong>all students</strong> in each grade level
        </p>
      </div>
    </div>
  );
};

export default ClassLevelThresholdBulk;