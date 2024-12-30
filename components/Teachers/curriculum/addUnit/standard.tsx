import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { Props, styles, standards } from ".";
import { updateStandard } from "store/unitsSlice";
import { FaChevronDown } from "react-icons/fa";

const Standard: FC<Props> = ({ openedModal, updateOpenedModal }) => {
   const dispatch = useDispatch();
   const { standard } = useSelector((state: RootState) => state.unit.addUnit);
   return (
      <article className="relative flex flex-col gap-2 md:flex-row">
         <div
            className={`${styles.topic} ${openedModal === "standard" ? " outline-mainColor" : "outline-transparent"}`}
            onClick={(event: any) => {
               if (!event.target.classList.contains("dropdown")) {
                  updateOpenedModal("standard");
               }
            }}
            data-testid="standard"
         >
            <h1>Standard</h1>
            <i>
               <FaChevronDown />
            </i>
            {openedModal === "standard" && (
               <div className={`${styles.preview}`}>
                  {standards.map((availableStandard: string, index: number) => (
                     <div className={styles.inputContainer} key={index}>
                        <input
                           type="radio"
                           name="standard"
                           id={availableStandard}
                           onChange={() => {
                              dispatch(updateStandard({ value: availableStandard }));
                              updateOpenedModal("");
                           }}
                           className="dropdown hidden"
                           data-testid={`standard-${index}`}
                        />
                        <label
                           htmlFor={availableStandard}
                           className={`dropdown hover:text-mainColor ${standard === availableStandard && "text-mainColor"}`}
                        >
                           {availableStandard}
                        </label>
                     </div>
                  ))}
               </div>
            )}
         </div>
         <div className={styles.numbersSelectedContainer}>
            <p>{standard === "" ? "0 standards selected" : <span className={styles.selectedItems}>{standard}</span>}</p>
         </div>
      </article>
   );
};

export default Standard;
