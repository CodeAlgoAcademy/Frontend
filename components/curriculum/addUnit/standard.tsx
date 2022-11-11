import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { Props, styles, standards } from ".";
import { updateStandard } from "store/unitsSlice";
import { FaPlus } from "react-icons/fa";

const Standard: FC<Props> = ({ openedModal, updateOpenedModal }) => {
  const dispatch = useDispatch();
  const { standard } = useSelector((state: RootState) => state.unit.addUnit);
  return (
    <article className="flex flex-row gap-x-2 relative">
      {openedModal === "standard" && (
        <div className={`${styles.preview} top-[110%] left-0`}>
          {standards.map((availableStandard: string, index: number) => (
            <div className={styles.inputContainer} key={index}>
              <input
                type="radio"
                name="standard"
                id={availableStandard}
                onChange={() => {
                  dispatch(updateStandard({ value: availableStandard }));
                }}
                className="hidden"
              />
              <label
                htmlFor={availableStandard}
                className={`hover:text-mainPurple ${
                  standard === availableStandard && "text-mainPurple"
                }`}
              >
                {availableStandard}
              </label>
            </div>
          ))}
        </div>
      )}
      <div
        className={styles.topic}
        onClick={() => {
          updateOpenedModal("standard");
        }}
      >
        <h1>Standard</h1>
        <i>
          <FaPlus />
        </i>
      </div>
      <div className={styles.numbersSelectedContainer}>
        <p>
          {standard === "" ? "0 standards selected" : "1 standard selected"}
        </p>
      </div>
    </article>
  );
};

export default Standard;
