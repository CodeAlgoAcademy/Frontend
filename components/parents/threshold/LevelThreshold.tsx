import React, { useMemo } from "react";
import ContentBox from "../UI/ContentBox";
import BarChart from "../UI/BarChart";
import { useRouter } from "next/router";

interface LevelThresholdProps {
  size: "large" | "base";
  thresholds: {
    grade: string;
    level: number;
  }[];
}

const LevelsThreshold = React.memo(({ size, thresholds }: LevelThresholdProps) => {
  const router = useRouter();

  const { chartData, chartLabels, maxLevel } = useMemo(() => {
    const displayedData = Array.isArray(thresholds) ? thresholds : [];
    return {
      chartData: displayedData.map(t => t.level),
      chartLabels: displayedData.map(t => t.grade),
      maxLevel: Math.max(10, ...displayedData.map(t => t.level), 0),
    };
  }, [thresholds]);

  const contentBoxStyle = useMemo(() => ({
    minWidth: "100%",
    maxWidth: "100%",
    height: "400px"
  }), []);

  return (
    <ContentBox
      size={size}
      title="Level Threshold"
      padding="large"
      showSublink={router.pathname === "/parents"}
      link={"/parents/LevelThreshold"}
      style={contentBoxStyle}
    >
      <BarChart
        key={JSON.stringify(chartData)}
        data={chartData}
        labels={chartLabels}
        barSpace={9.6}
        barWidth={3.3}
        maxHours={maxLevel}
        unitLabel=""
      />
    </ContentBox>
  );
});

LevelsThreshold.displayName = "LevelsThreshold";

export default LevelsThreshold;
