import { accessibility_profiles } from "public/data";
import React, { FC, MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { IoMdArrowDropright } from "react-icons/io";
import { IoAccessibilityOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { accessibilityActions } from "store/accessibilitySlice";
import { RootState } from "store/store";
import { AccessibilityFeatures, AccessibilitySlice } from "types/interfaces/accessibility.interface";
import { cn } from "utils";

const AccessibilityProfile = () => {
   const [infoOpen, setInfoOpen] = useState<boolean>(false);
   const [profilesOpen, setProfilesOpen] = useState<boolean>(false);
   const [height, setHeight] = useState<number>(0);
   const ref = useRef<HTMLDivElement>();
   const { oversizedWidgets } = useSelector((state: RootState) => state.accessibility);

   useEffect(() => {
      if (ref) {
         setHeight(ref?.current?.getBoundingClientRect().height ?? 0);
      }
   }, [ref, oversizedWidgets]);

   return (
      <div>
         <header className="flex items-center justify-between">
            <div onClick={() => setProfilesOpen((p) => !p)} className="flex max-w-fit items-center gap-2">
               <span className="inline-block h-[30px] w-[30px] rounded-full bg-black p-[2px]">
                  <span className="flex h-full w-full items-center justify-center rounded-full border border-white">
                     <IoAccessibilityOutline size={18} color="white" />
                  </span>
               </span>
               <p className="text-[.85rem]">Accessibility Profiles</p>
               <IoMdArrowDropright className={cn(profilesOpen && "rotate-90", "transition-all duration-200")} />
            </div>

            <span className="relative block">
               <BsInfoCircleFill
                  onMouseEnter={() => setInfoOpen(true)}
                  onMouseLeave={() => setInfoOpen(false)}
                  size={18}
                  className={cn("text-mainBlack", infoOpen && "rounded-full border-2 border-mainRed")}
               />

               {infoOpen && (
                  <aside className="absolute top-[100%] right-4 w-screen max-w-[350px] rounded-md bg-mainBlack p-1 text-[.8rem] text-white">
                     <div className="rounded-md border border-white p-2">
                        <p>Choose among the predefined sets of accessibility features that are common for users.</p>
                     </div>
                  </aside>
               )}
            </span>
         </header>

         <div className={cn("overflow-hidden transition-all duration-300")} style={{ height: profilesOpen ? height : 0 }}>
            <div
               ref={ref as MutableRefObject<HTMLDivElement>}
               className={cn("grid grid-cols-2 gap-4 py-1 pt-4 text-[.9rem] max-xs:grid-cols-1", oversizedWidgets && "grid-cols-1")}
            >
               {accessibility_profiles.map((profile, index) => {
                  return <SingleProfile key={index} {...profile} />;
               })}
            </div>
         </div>
      </div>
   );
};

const SingleProfile: FC<(typeof accessibility_profiles)[0]> = ({ name, icon, features }) => {
   const { oversizedWidgets, features: selected_features } = useSelector((state: RootState) => state.accessibility);
   const dispatch = useDispatch();
   const [hovered, setHovered] = useState<boolean>(false);

   const isProfileSelected = useMemo(() => {
      let is_selected = true;

      Object.keys(selected_features).forEach((feat) => {
         const feat_key = feat as AccessibilityFeatures;

         if (!features[feat_key] && selected_features[feat_key]) {
            is_selected = false;
         }

         if (features[feat_key] && features[feat_key] !== selected_features[feat_key]) {
            is_selected = false;
         }
      });

      return is_selected;
   }, [selected_features, features]);

   return (
      <article
         onClick={() => dispatch(accessibilityActions.setProfileFeatures(features))}
         className={cn(
            "flex items-center gap-2 rounded-md bg-white p-2 transition-all duration-200",
            (hovered || isProfileSelected) && "bg-mainRed text-white"
         )}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
      >
         <span
            className={cn(
               "rounded-md bg-gray-100 p-2 text-black transition-all duration-200",
               (hovered || isProfileSelected) && "bg-[#b51818] text-white",
               oversizedWidgets && "text-[1.2rem]"
            )}
         >
            {icon}
         </span>
         <p className={cn("text-[.8rem]", oversizedWidgets && "text-[1.1rem]")}>{name}</p>
      </article>
   );
};

export default AccessibilityProfile;
