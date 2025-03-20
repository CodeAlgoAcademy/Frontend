import { useScreenReader } from "hooks/useScreenReader";
import { accessibility_functions } from "public/data";
import React, { FC, useEffect, useState } from "react";
import { BsFillCheckCircleFill, BsInfoCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { accessibilityActions } from "store/accessibilitySlice";
import { RootState } from "store/store";
import { AccessibilityFeatures } from "types/interfaces/accessibility.interface";
import { cn } from "utils";

interface Props {
   feature: AccessibilityFeatures;
}

const AccessibilityWidget: FC<Props> = ({ feature }) => {
   const [infoOpen, setInfoOpen] = useState<boolean>(false);
   const { features, oversizedWidgets } = useSelector((state: RootState) => state.accessibility);
   const dispatch = useDispatch();
   const { speak } = useScreenReader({ isCustom: true });

   const is_toggle = accessibility_functions[feature].length <= 2;
   const current_selection = features[feature];
   const current_selection_details = accessibility_functions[feature].find((s) => s.step == current_selection);
   const is_selected = current_selection > 0;

   useEffect(() => {
      if (is_selected) {
         speak(`Selected ${current_selection_details?.name}`);
      }
   }, [is_selected, current_selection_details]);

   return (
      <article
         onClick={() => dispatch(accessibilityActions.increaseFeatureCount(feature))}
         className={cn(
            "relative flex flex-col items-center justify-center rounded-md border-2 border-white bg-white px-2 py-4 hover:border-mainRed",
            is_selected && "border-mainRed !text-mainRed"
         )}
      >
         <span className={cn("text-[1.8rem]", is_selected && "text-mainRed", oversizedWidgets && "text-[2.2rem]")}>
            {current_selection_details?.icon}
         </span>
         <p className={cn("mt-2 text-center text-[.75rem]", is_selected && "text-mainRed", oversizedWidgets && "text-[1rem]")}>
            {current_selection_details?.name}
         </p>

         {is_selected && <BsFillCheckCircleFill className="absolute top-2 right-2 text-mainRed" size={15} />}

         <span className="absolute left-2 top-2">
            {feature == "dictionary" && (
               <BsInfoCircleFill
                  onMouseEnter={() => setInfoOpen(true)}
                  onMouseLeave={() => setInfoOpen(false)}
                  size={15}
                  className={cn("text-mainBlack", infoOpen && "rounded-full border-[1.5px] border-mainRed")}
               />
            )}

            {infoOpen && (
               <aside className="absolute top-[110%] left-[50%] w-screen max-w-[150px] -translate-x-[50%] rounded-md bg-mainBlack p-1 text-[.8rem] text-white">
                  <div className="rounded-md border border-white p-2 text-center">
                     <p className="text-[.75rem] text-[#e6e5e5]">Keyboard shortcut</p>
                     <p className="text-[.8rem] font-bold text-[white]">CTRL + M </p>
                  </div>
               </aside>
            )}
         </span>

         {!is_toggle && is_selected && (
            <footer className="mt-4 flex w-full items-center justify-center gap-2">
               {new Array(accessibility_functions[feature].length - 1).fill(null).map((_, index) => (
                  <span
                     className={cn(
                        "inline-block h-[4px] max-w-[30px] flex-1 rounded-md bg-mainRed/10",
                        index <= current_selection - 1 && "bg-mainRed"
                     )}
                  ></span>
               ))}
            </footer>
         )}
      </article>
   );
};

export default AccessibilityWidget;
