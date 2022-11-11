import React, { FC, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { Props, styles, availableLevels } from ".";
import { ILevels } from "types/interfaces";
import { updateLevels } from "store/unitsSlice";
import { FaPlus } from "react-icons/fa";

const Levels: FC<Props> = ({ openedModal, updateOpenedModal }) => {
  const dispatch = useDispatch();
  const { levels } = useSelector((state: RootState) => state.unit.addUnit);
  return (
    <article className="flex flex-row gap-x-2 relative">
      {openedModal === "level" && (
        <div className={styles.preview}>
          {availableLevels.map((level: ILevels, index: number) => (
            <div className={styles.inputContainer} key={index}>
              <input
                type="checkbox"
                id={level.level}
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
              <label htmlFor={level.level}>{level.level}</label>
            </div>
          ))}
        </div>
      )}
      <div
        className={styles.topic}
        onClick={() => {
          updateOpenedModal("level");
        }}
      >
        <h1>Level(s)</h1>
        <i>
          <FaPlus />
        </i>
      </div>
      <div className={styles.numbersSelectedContainer}>
        {levels.length} levels selected
      </div>
    </article>
  );
};

export default Levels;
