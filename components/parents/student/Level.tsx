import ProgressBar from "../UI/ProgressBar";
import ContentBox from "../UI/ContentBox";
import React from "react";
import { IChildProgress } from "types/interfaces/parent.interface";

interface ILevelProps {
   size: "large" | "base";
   level?: number;
   progressItems?: IChildProgress[];
   isLoading?: boolean;
   isBlockProgress?: boolean;
}


const Level = ({ size, level, progressItems, isLoading, isBlockProgress = false }: ILevelProps) => {
    const hasData = progressItems && progressItems.length > 0;

   return (
      <ContentBox size="large" title="Progress" padding="small" style={{ minWidth: "100%", maxWidth: "100%", height:"420px" }} >
         {/* <h2 className="font-medium text-center text-[22px]">Level {level} ⚡</h2> */}
         <React.Fragment>
            <div className="mt-6 ml-4">
              <div className="mt-8">
                <h3 className="font-semibold">Comprehension Tracking</h3>
                <div className="mb-6">
                  <div className="small-scroll-thumb blue-scroll-thumb mt-3 flex flex-col gap-5 overflow-y-auto pr-4">
                    {isLoading ? (
                      <p className="text-sm text-gray-400 animate-pulse">
                        Loading progress...
                      </p>
                    ) : hasData ? (
                      progressItems.map((lesson, index) => (
                        <ProgressBar
                          key={`inprogress-${index}`}
                          color={isBlockProgress ? "red" : "green"}
                          percentage={isBlockProgress ? lesson.progress : lesson.progress}
                          title={isBlockProgress ? lesson.standard_code : lesson.title}
                          titleSize="base"
                          containerSize={size}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No progress items to show.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
         </React.Fragment>
      </ContentBox>
   );
};

export default Level;