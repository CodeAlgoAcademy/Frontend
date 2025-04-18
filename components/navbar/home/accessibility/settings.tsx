import React, { FC } from "react";
import { IoMdClose } from "react-icons/io";
import AccessibilityProfile from "./profiles";
import { RiFontSize } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { accessibilityActions } from "store/accessibilitySlice";
import { accessibility_functions } from "public/data";
import AccessibilityWidget from "./widget";
import { AccessibilityFeatures } from "types/interfaces/accessibility.interface";
import { cn } from "utils";
import { CustomButton } from "@/components/UI/Button";

interface Props {
   onClose(): void;
}

const AccessibilitySettings: FC<Props> = ({ onClose }) => {
   const { oversizedWidgets } = useSelector((state: RootState) => state.accessibility);
   const dispatch = useDispatch();

   return (
      <>
         <header className="flex items-center justify-between py-4 px-6 text-white">
            <h2 className="text-[.9rem]">Accessibility Menu {"(CTRL + U)"}</h2>

            <span onClick={onClose} className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-white">
               <IoMdClose size={25} cursor={"pointer"} />
            </span>
         </header>

         <div className="h-full max-h-full w-full flex-1 overflow-y-scroll rounded-t-2xl bg-gray-100 py-4 px-3">
            <div className="space-y-2">
               <AccessibilityProfile />
               <hr />
               <div className="flex items-center justify-between" onClick={() => dispatch(accessibilityActions.toggleWidgetsSize())}>
                  <div className="flex max-w-fit items-center gap-2">
                     <RiFontSize size={30} />
                     <p className="text-[.85rem]">Oversized Widget</p>
                  </div>

                  <span className="relative block">
                     <Switch color="error" size="medium" checked={oversizedWidgets} />
                  </span>
               </div>
               <hr />
            </div>

            <div className={cn("mt-5 grid grid-cols-3 gap-4", oversizedWidgets && "grid-cols-2")}>
               {Object.keys(accessibility_functions).map((func, index) => {
                  return <AccessibilityWidget feature={func as AccessibilityFeatures} key={index} />;
               })}
            </div>

            <CustomButton
               onClick={() => dispatch(accessibilityActions.reset())}
               variant="filled"
               fullWidth
               icon={<GrPowerReset />}
               iconPosition="left"
               className="mt-5 text-white"
            >
               Reset All Accessibility Settings
            </CustomButton>
         </div>
      </>
   );
};

export default AccessibilitySettings;
