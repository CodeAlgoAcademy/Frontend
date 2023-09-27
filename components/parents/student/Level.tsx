import React, { useEffect } from "react";
import ProgressBar from "../UI/ProgressBar";
import ContentBox from "../UI/ContentBox";
import { getChildProgress } from "store/parentChildSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { IChildProgress } from "types/interfaces";

interface ILevelProps {
   size: "large" | "base";
}

const Level = ({ size }: ILevelProps) => {
   const dispatch = useDispatch();
   const parent = useSelector((state: RootState) => state.parentChild);

   useEffect(() => {
      if (parent?.currentChild?.id) {
         dispatch(getChildProgress());
      }
   }, [parent.currentChild.id]);
   return (
      <ContentBox size="large" title="Progress" padding="small" style={{ minWidth: "100%", maxWidth: "100%" }}>
         <h2 className="font-medium\ text-center text-[22px]">Level {(parent?.currentChild?.question_level as number) + 1} ⚡</h2>
         <React.Fragment>
            <div className="mt-6 ml-4">
               <ProgressBar
                  containerSize={size}
                  color="red"
                  percentage={Number(parent?.currentChild?.progress?.current?.progress) || 0}
                  title={parent?.currentChild?.progress?.current?.title as string}
                  titleSize="large"
               />
               <div className="mt-8">
                  <h3 className="font-semibold">Comprehension Tracking</h3>
                  <div className="small-scroll-thumb blue-scroll-thumb mt-3 flex h-[100px] flex-col gap-5 overflow-y-auto pr-4">
                     {[...(parent.currentChild.progress?.topic || [])]
                        ?.sort((lessonA, lessonB) => lessonA?.level - lessonB?.level)
                        ?.map((lesson: IChildProgress, index: number) => (
                           <ProgressBar
                              key={index}
                              color="green"
                              percentage={lesson?.progress}
                              title={lesson?.title}
                              titleSize="base"
                              containerSize={size}
                           />
                        ))}
                  </div>
               </div>
            </div>
         </React.Fragment>
      </ContentBox>
   );
};

export default Level;
