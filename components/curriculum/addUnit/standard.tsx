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
    <article className="flex flex-row gap-x-2 relative">
      <div
        className={`${styles.topic} ${
          openedModal === "standard"
            ? " outline-mainPurple"
            : "outline-transparent"
        }`}
        onClick={(event: any) => {
          if (!event.target.classList.contains("dropdown")) {
            updateOpenedModal("standard");
          }
        }}
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
                  className="hidden dropdown"
                />
                <label
                  htmlFor={availableStandard}
                  className={`hover:text-mainPurple dropdown ${
                    standard === availableStandard && "text-mainPurple"
                  }`}
                >
                  {availableStandard}
                </label>
              </div>
            ))}
          </div>
        )}
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
