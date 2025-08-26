import React, { useMemo } from "react";
import ContentBox from "../UI/ContentBox";
import BarChart from "../UI/BarChart";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface LevelThresholdProps {
  size: "large" | "base";
}

const ALL_GRADES = ["Kindergarten", "Grade 1", "Grade 2", "Grade 3", "Grade 4"] as const;

const LevelsThresholdChart = ({ size }: LevelThresholdProps) => {
  const router = useRouter();
  const { currentChild } = useSelector((state: RootState) => state.parentChild);

  const { chartData, chartLabels, maxLevel } = useMemo(() => {
    const thresholds = currentChild?.levelThresholds?.length
      ? currentChild.levelThresholds
      : ALL_GRADES.map((grade) => ({ grade, level: 10 }));

    return {
      chartData: thresholds.map((t) => t.level),
      chartLabels: thresholds.map((t) => t.grade),
      maxLevel: Math.max(10, ...thresholds.map((t) => t.level)),
    };
  }, [currentChild?.levelThresholds]);

  return (
    <ContentBox
      size={size}
      title="Level Thresholds"
      padding="large"
      showSublink={router.pathname === "/parents"}
      link="/parents/LevelThreshold"
      style={{
        minWidth: "100%",
        maxWidth: "100%",
        height: "400px",
        marginTop: "2rem",
      }}
    >
      <BarChart
        data={chartData}
        labels={chartLabels}
        barSpace={9.6}
        barWidth={3.3}
        maxHours={maxLevel}
        unitLabel=""
      />
    </ContentBox>
  );
};

export default LevelsThresholdChart;
