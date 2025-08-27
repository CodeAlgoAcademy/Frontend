import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { createOrUpdateLevelThreshold, getChildren } from "store/parentChildSlice";
import LevelThresholdInput, { LevelThresholdInputProps } from "../UI/levelthreshold";
import NoChild from "../UI/NoChild";

const ALL_GRADES = ["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4"] as const

const LevelThresholdComponent = () => {
  const { currentChild, } = useSelector((state: RootState) => state.parentChild)
  const dispatch = useDispatch()

  const thresholds: LevelThresholdInputProps[] = useMemo(() => {
    if (!ALL_GRADES || !Array.isArray(ALL_GRADES)) {
      console.error("ALL_GRADES is not defined or not an array")
      return []
    }
    return ALL_GRADES.map((grade, index) => {
      const backendData = currentChild?.levelThresholds?.find((t) => t.grade === grade)
      return {
        id: index + 1,
        level: backendData?.level ?? 10,
        grade,
      }
    })
  }, [currentChild?.levelThresholds])


  const updateLevel = async (id: number, level: number, grade: string) => {
    if (!currentChild || isNaN(level) || level < 1) {
      console.warn("Invalid update parameters:", { currentChild, level, grade })
      return
    }
    try {
      const response = await dispatch(
        createOrUpdateLevelThreshold({
          id: currentChild.id,
          data: { level, grade },
        }),
      )
      if (createOrUpdateLevelThreshold.rejected.match(response)) {
        throw new Error("Update failed")
      }
      await dispatch(getChildren())
    } catch (err) {
      console.error("Update error:", err)
    }
  }

    const { children } = useSelector((state: RootState) => state.parentChild);
     if (!children || children?.length === 0) {
        return <NoChild />;
     }

  return (
    <div className="relative mt-10 min-h-[340px] max-w-fit rounded-2xl bg-white px-8 py-10 md:w-full md:min-w-[420px]">
      <h1 className="text-[1.3rem] font-semibold text-mainColor">Level Threshold Settings</h1>
      <h2 className="mt-2 mb-10 text-[14px] font-medium">
        Set thresholds required to progress through each level.
      </h2>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">
        {thresholds.map((t, i) => (
          <LevelThresholdInput
            key={i}
            threshold={t}
            updateLevelThreshold={updateLevel}
          />
        ))}
      </div>
    </div>
  );
};

export default LevelThresholdComponent;