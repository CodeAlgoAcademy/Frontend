import ProgressBar from "../UI/ProgressBar";
import ContentBox from "../UI/ContentBox";
import React from "react";
import { IChildProgress, IChildTopics } from "types/interfaces/parent.interface";

interface ILevelProps {
  size: "large" | "base";
  level?: number;
  progressItems?: IChildProgress[];
  completedItems?: IChildProgress[];
  isLoading?: boolean;
  isBlockProgress?: boolean;
  currentProgress?: false | IChildProgress;
}

const Level = ({ size, level, progressItems, isLoading, isBlockProgress = false, completedItems, currentProgress }: ILevelProps) => {
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
        overflowY: "auto"
      }}
    >
      <div className="flex flex-col gap-6 pr-4">
        {currentProgress && (
          <div className="mb-4">
            <h3 className="font-semibold">Current Progress</h3>
            <ProgressBar
              color="green"
              percentage={currentProgress.progress || 0}
              title={currentProgress.title}
              titleSize="base"
              containerSize={size}
            />
          </div>
        )}
        
        <div className="ml-4">
          {isLoading ? (
            <>
              <h3 className="font-semibold">Comprehension Tracking</h3>
              <div className="mt-3 flex flex-col gap-5">
                <p className="text-sm text-gray-400 animate-pulse">Loading progress...</p>
              </div>
              
              <h3 className="font-semibold mt-6">Completed</h3>
              <div className="mt-3 flex flex-col gap-5">
                <p className="text-sm text-gray-400 animate-pulse">Loading completed items...</p>
              </div>
            </>
          ) : (
            <>
              {/* In Progress Section - Only show items with progress < 1.0 */}
              <h3 className="font-semibold">Comprehension Tracking</h3>
              <div className="mt-3 flex flex-col gap-5">
                {hasProgressData ? (
                  progressItems.map((lesson, index) => (
                    <ProgressBar
                      key={`inprogress-${index}`}
                      color={isBlockProgress ? "red" : "green"}
                      percentage={lesson.progress}
                      title={isBlockProgress ? lesson.standard_code : lesson.title}
                      titleSize="base"
                      containerSize={size} 
                                         />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No in-progress items to show.</p>
                )}
              </div>

              {/* Completed Items Section - Only show items with progress === 1.0 */}
              {hasCompletedData && (
                <>
                  <h3 className="font-semibold mt-6">Completed</h3>
                  <div className="mt-3 flex flex-col gap-5">
                    {completedItems.map((lesson, index) => (
                      <ProgressBar
                        key={`completed-${index}`}
                        color="green"
                        percentage={lesson.progress}
                        title={isBlockProgress ? lesson.standard_code : lesson.title}
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

export default Level;