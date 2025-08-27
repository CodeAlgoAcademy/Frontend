import ContentBox from "@/components/parents/UI/ContentBox";
import ProgressBar from "@/components/parents/UI/ProgressBar";
import React from "react";
import { IChildProgress } from "types/interfaces/parent.interface";

interface ILevelProps {
  size: "large" | "base";
  level?: number;
  progressItems?: IChildProgress[];
  completedItems?: IChildProgress[];
  isLoading?: boolean;
}

const TeacherStudentProgress = ({
  size,
  level,
  progressItems,
  isLoading,
  completedItems,
}: ILevelProps) => {
  const hasProgressData = progressItems && progressItems.length > 0;
  const hasCompletedData = completedItems && completedItems.length > 0;

  return (
    <ContentBox
      size="large"
      title="Progress"
      padding="small"
      style={{
        minWidth: "100%",
        maxWidth: "100%",
        height: "400px",
        overflowY: "auto",
      }}
    >
      <div className="flex flex-col gap-6 pr-4">
        <div className="ml-4">
          {isLoading ? (
            <>
              <h3 className="font-semibold">Comprehension Tracking</h3>
              <div className="mt-3 flex flex-col gap-5">
                <p className="text-sm text-gray-400 animate-pulse">
                  Loading progress...
                </p>
              </div>

              <h3 className="font-semibold mt-6">Completed</h3>
              <div className="mt-3 flex flex-col gap-5">
                <p className="text-sm text-gray-400 animate-pulse">
                  Loading completed items...
                </p>
              </div>
            </>
          ) : (
            <>
              {/* In Progress Section */}
              <h3 className="font-semibold">Comprehension Tracking</h3>
              <div className="mt-3 flex flex-col gap-5">
                {hasProgressData ? (
                  progressItems.map((lesson, index) => (
                    <ProgressBar
                      key={`inprogress-${index}`}
                      color="red"
                      percentage={lesson.progress}
                      title={lesson.standard_code}
                      titleSize="base"
                      containerSize={size}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No in-progress items to show.
                  </p>
                )}
              </div>

              {hasCompletedData && (
                <>
                  <h3 className="font-semibold mt-6">Completed</h3>
                  <div className="mt-3 flex flex-col gap-5">
                    {completedItems.map((lesson, index) => (
                      <ProgressBar
                        key={`completed-${index}`}
                        color="green"
                        percentage={lesson.progress}
                        title={lesson.standard_code}
                        titleSize="base"
                        containerSize={size}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </ContentBox>
  );
};

export default TeacherStudentProgress;
