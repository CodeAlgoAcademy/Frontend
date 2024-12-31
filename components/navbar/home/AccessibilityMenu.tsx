import React, { FC, ReactNode, useCallback, useMemo } from "react";
import { motion, Variant } from "framer-motion";
import { MdClose, MdOutlineAnimation } from "react-icons/md";
import { AccessibilityFeatures } from "types/interfaces/accessibility.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { cn } from "utils";
import { IoContrast, IoInvertMode, IoText } from "react-icons/io5";
import { RxLink1 } from "react-icons/rx";
import { accessibilityActions } from "store/accessibilitySlice";
import { GrPowerReset } from "react-icons/gr";
import { GiArrowCursor } from "react-icons/gi";

interface Props {
   onClose(): void;
   open?: boolean;
}

const variants: Record<string, Variant> = {
   hidden: {
      translateX: "-100vw",
      opacity: 0,
   },
   visible: {
      translateX: 0,
      opacity: 1,
      transition: {
         type: "bounce",
      },
   },
};

const AccessibilityMenu: FC<Props> = ({ onClose, open }) => {
   const dispatch = useDispatch();

   return (
      <motion.div
         variants={variants}
         initial="hidden"
         animate={open ? "visible" : "hidden"}
         exit="hidden"
         className="absolute top-[82px] left-0 !z-[500] flex space-x-6"
      >
         <div className="min-w-[250px] bg-white p-6">
            <h1 className="text-[1.1rem]">Accessibility Menu</h1>

            <div className="mt-8 space-y-1">
               <SingleAccessibilityFeature feature="invert-colors" label="Invert Colors" icon={<IoInvertMode size={28} />} />
               <SingleAccessibilityFeature feature="dark-contrast" label="Dark Contrast" icon={<IoContrast size={28} />} />
               <SingleAccessibilityFeature feature="highlight-links" label="Highlight Links" icon={<RxLink1 size={28} />} />
               <SingleAccessibilityFeature feature="bigger-text" label="Bigger Texts" icon={<IoText size={28} />} />
               <SingleAccessibilityFeature feature="pause-animations" label="Pause Animations" icon={<MdOutlineAnimation size={28} />} />
               <SingleAccessibilityFeature feature="legible-fonts" label="Legible Fonts" icon={<IoText size={28} />} />
               <SingleAccessibilityFeature feature="big-cursor" label="Big Cursor" icon={<GiArrowCursor size={28} />} />
               <SingleAccessibilityFeature
                  label="Reset All"
                  icon={<GrPowerReset size={28} />}
                  onClick={() => dispatch(accessibilityActions.reset())}
               />
            </div>
         </div>

         <span onClick={onClose} className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white">
            <MdClose color="white" size={30} cursor={"pointer"} />
         </span>
      </motion.div>
   );
};

interface FeatureProps {
   feature?: AccessibilityFeatures;
   icon: ReactNode;
   label: string;
   onClick?(): void;
}

const SingleAccessibilityFeature: FC<FeatureProps> = ({ feature, icon, label, onClick }) => {
   const { features } = useSelector((state: RootState) => state.accessibility);
   const dispatch = useDispatch();

   const className = useMemo(
      () =>
         cn(
            "flex items-center space-x-4 p-2 rounded-md transition-all duration-300 border-2 border-transparent cursor-pointer",
            feature && features.includes(feature) && "bg-mainBlack !text-white border-mainBlack",
            feature && !features.includes(feature) && "bg-transparent hover:border-mainBlack"
         ),
      [features]
   );

   const toggle = useCallback(() => {
      if (feature) {
         if (features.includes(feature)) {
            dispatch(accessibilityActions.removeFeature(feature));
         } else {
            dispatch(accessibilityActions.addFeature(feature));
         }
      } else {
         onClick?.();
      }
   }, [features]);

   return (
      <article className={className} onClick={toggle}>
         {icon}
         <p className="text-[.9rem]">{label}</p>
      </article>
   );
};

export default AccessibilityMenu;
