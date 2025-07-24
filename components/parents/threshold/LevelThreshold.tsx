import React, { useEffect, useState } from "react";
import ContentBox from "../UI/ContentBox";
import BarChart from "../UI/BarChart";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { useRouter } from "next/router";

interface LevelThresholdProps {
  size: "large" | "base";
}

interface LevelThresholdType {
  level: number;
  threshold: number;
}

const LevelsThreshold = ({ size }: LevelThresholdProps) => {
  const { currentChild } = useSelector((state: RootState) => state.parentChild);
  const router = useRouter();

  const [thresholds, setThresholds] = useState<LevelThresholdType[]>([]);

  useEffect(() => {
    const defaultThresholds = Array.from({ length: 10 }, (_, i) => ({
      level: i + 1,
      threshold: (i + 1) * 10, 
    }));

    setThresholds(defaultThresholds);
  }, [currentChild]);

  return (
    <ContentBox
      size={size}
      title="Level Threshold"
      padding="large"
      showSublink={router.pathname === "/parents"}
      // link={"/parents/LevelThreshold"}
      style={{ minWidth: "100%", maxWidth: "100%", height:"420px" }}
    >
      <BarChart
        data={thresholds.map((level) => level.threshold)}
        barSpace={9.6}
        barWidth={3.3}
        maxHours={100} 
      />
    </ContentBox>
  );
};

export default LevelsThreshold;
