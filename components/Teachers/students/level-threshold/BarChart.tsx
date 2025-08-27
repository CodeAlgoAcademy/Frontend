import React, { useMemo } from "react";
import BarChart from "@/components/parents/UI/BarChart";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface StudentBarChartProps {
  showEditLink?: boolean;
}
const StudentLevelChart = ({ showEditLink = true }: StudentBarChartProps) => {
  const { currentStudent } = useSelector(
    (state: RootState) => state.teacherStudentSlice
  );
  const classId = useSelector((state: RootState) => state.currentClass?.id);
  const { chartData, chartLabels, maxLevel } = useMemo(() => {
    const thresholds = currentStudent?.levelThresholds || [];
    const defaultLevels = [
      "Kindergarten",
      "Grade 1",
      "Grade 2",
      "Grade 3",
      "Grade 4",
      "Grade 5",
      "Grade 6",
    ];

    const thresholdMap = thresholds.reduce<Record<string, number>>(
      (acc, t) => {
        if (t.grade) {
          acc[t.grade] = t.level ?? 10;
        }
        return acc;
      },
      {}
    );

    const chartLabels = defaultLevels;
    const chartData = defaultLevels.map((grade) => thresholdMap[grade] ?? 10);

    const maxLevel = Math.max(10, ...chartData);

    return {
      chartData,
      chartLabels,
      maxLevel,
    };
  }, [currentStudent?.levelThresholds]);

  const canEdit = !!(classId && currentStudent?.student_id);

  return (
    <div className="level-threshold-widget">
      <div
        className="w-full overflow-y-auto rounded-2xl bg-white p-6"
        style={{ minWidth: "100%", maxWidth: "100%", height: "400px" }}
      >
        <h1 className="text-2xl font-semibold text-mainColor">Level Threshold</h1>
        <BarChart
          data={chartData}
          labels={chartLabels}
          barSpace={9.6}
          barWidth={4.3}
          maxHours={maxLevel}
          unitLabel=""
        />
      </div>
      {showEditLink && canEdit && (
        <Link
          href={`/teachers/students/${classId}/${currentStudent.id}/level-threshold`}
          className="mt-4 ml-auto max-w-fit cursor-pointer text-[.9rem] font-medium underline block"
        >
          <span className="mt-3 ml-auto block w-fit cursor-pointer text-sm font-light underline hover:text-mainColor">
            Edit Level Threshold Settings
          </span>
        </Link>
      )}
    </div>
  );
};

export default StudentLevelChart;
