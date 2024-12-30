import React, { FC, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { Props, styles, availableLevels } from ".";
import { ILevels } from "types/interfaces";
import { updateLevels } from "store/unitsSlice";
import { FaChevronDown, FaPlus } from "react-icons/fa";

const Levels: FC<Props> = ({ openedModal, updateOpenedModal }) => {
   const { levels, standard } = useSelector((state: RootState) => state.unit.addUnit);
   return (
      <article className="relative flex flex-col gap-2 md:flex-row">
         <div
            className={`${styles.topic} ${openedModal === "level" ? " outline-mainColor" : "outline-transparent"}`}
            onClick={(event: any) => {
               if (!event.target.classList.contains("dropdown")) {
                  updateOpenedModal("level");
               }
            }}
            data-testid="level"
         >
            <h1>Level(s)</h1>
            <i>
               <FaChevronDown />
            </i>
            {openedModal === "level" && (
               <div className={styles.preview}>
                  {standard === "Advance" &&
                     availableLevels
                        .filter((level: ILevels) => level.title === "Orange")
                        .map((level: ILevels, index: number) => {
                           return <LevelsInputContainer updateOpenedModal={updateOpenedModal} level={level} key={index} index={index} />;
                        })}
                  {standard !== "Advance" &&
                     availableLevels.map((level: ILevels, index: number) => (
                        <LevelsInputContainer updateOpenedModal={updateOpenedModal} index={index} level={level} key={index} />
                     ))}
               </div>
            )}
         </div>
         <div className={styles.numbersSelectedContainer}>
            {levels === "" ? `0 levels selected` : <span className={styles.selectedItems}>{levels}</span>}
         </div>
      </article>
   );
};

const LevelsInputContainer = ({
   level,
   index,
   updateOpenedModal,
}: {
   level: ILevels;
   index: number;
   updateOpenedModal: (modalToOpen: string) => void;
}) => {
   const dispatch = useDispatch();
   const { levels } = useSelector((state: RootState) => state.unit.addUnit);
   return (
      <div className={`${styles.inputContainer} relative`}>
         <input
            type="radio"
            name="levels"
            id={level.title}
            onChange={() => {
               dispatch(updateLevels({ value: level.title, type: "add" }));
               updateOpenedModal("");
            }}
            className="dropdown hidden"
            data-testid={`level-${index}`}
         />
         <label htmlFor={level.title} className={`dropdown hover:text-mainColor ${levels === level.title && "text-mainColor"}`}>
            {level.title}
         </label>
         <p className={`hoverText bg-mainColor after:bg-mainColor right-[0px] -top-[10px]`}>{level.hoverText}</p>
      </div>
   );
};

export default Levels;
