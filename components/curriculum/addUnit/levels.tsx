import React, { FC, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { Props, styles, availableLevels } from ".";
import { ILevels } from "types/interfaces";
import { updateLevels } from "store/unitsSlice";
import { FaPlus } from "react-icons/fa";

const Levels: FC<Props> = ({ openedModal, updateOpenedModal }) => {
  const { levels, standard } = useSelector(
    (state: RootState) => state.unit.addUnit
  );
  return (
    <article className="flex flex-row gap-x-2 relative">
      <div
        className={`${styles.topic} ${
          openedModal === "level"
            ? " outline-mainPurple"
            : "outline-transparent"
        }`}
        onClick={(event: any) => {
          if (!event.target.classList.contains("dropdown")) {
            updateOpenedModal("level");
          }
        }}
      >
        <h1>Level(s)</h1>
        <i>
          <FaPlus />
        </i>
        {openedModal === "level" && (
          <div className={styles.preview}>
            {standard === "Advance" &&
              availableLevels
                .filter((level: ILevels) => level.level === "Orange")
                .map((level: ILevels, index: number) => {
                  return <LevelsInputContainer level={level} key={index} />;
                })}
            {standard !== "Advance" &&
              availableLevels.map((level: ILevels, index: number) => (
                <LevelsInputContainer level={level} key={index} />
              ))}
          </div>
        )}
      </div>
      <div className={styles.numbersSelectedContainer}>
        {levels.length === 0
          ? `0 levels selected`
          : levels.map((level, index: number) => {
              return (
                <span key={index} className={styles.selectedItems}>
                  {level}
                </span>
              );
            })}
      </div>
    </article>
  );
};

const LevelsInputContainer = ({ level }: { level: ILevels }) => {
  const dispatch = useDispatch();
  const { levels } = useSelector((state: RootState) => state.unit.addUnit);
  return (
    <div className={`relative ${styles.inputContainer}`}>
      <input
        type="checkbox"
        id={level.level}
        className="accent-mainPurple dropdown"
        checked={levels.includes(level.level)}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked) {
            dispatch(updateLevels({ value: level.level, type: "add" }));
          } else {
            dispatch(
              updateLevels({
                value: level.level,
                type: "remove",
              })
            );
          }
        }}
      />
      <label htmlFor={level.level} className="hoverElement dropdown">
        {level.level}
      </label>
      <p className={`hoverText right-[0px] -top-[10px]`}>{level.hoverText}</p>
    </div>
  );
};

export default Levels;
