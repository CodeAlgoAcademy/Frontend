import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { Props, styles } from ".";
import { FaPlus } from "react-icons/fa";
import { updateUnits } from "store/unitsSlice";

const Unit: FC<Props> = ({ openedModal, updateOpenedModal }) => {
  const dispatch = useDispatch();
  const { units } = useSelector((state: RootState) => state.unit.addUnit);
  return (
    <article className="flex flex-row gap-x-2 relative">
      {openedModal === "unit" && (
        <div className="absolute bottom-[50%] left-0 bg-white shadow-md w-[90vw] max-w-[700px] rounded-md p-8 flex flex-col gap-y-4 h-[300px] overflow-hidden overflow-y-scroll">
          {units.map((unit, index: number) => {
            return (
              <div className="flex flex-wrap justify-between gap-4" key={index}>
                <p className="flex-[0.4]">{unit.unit}</p>
                <div className="flex flex-wrap gap-4 flex-[0.6] md:justify-end">
                  <button
                    className={`${styles.button} ${
                      unit.isCurrent
                        ? "bg-green-600 text-white"
                        : "bg-green-200 text-black"
                    }`}
                    onClick={() => {
                      dispatch(
                        updateUnits({
                          id: unit.id as string,
                          type: "current",
                        })
                      );
                    }}
                  >
                    Current
                  </button>
                  <button
                    className={`${styles.button} ${
                      unit.isCurrent
                        ? "bg-orange-200 text-black"
                        : "bg-orange-600 text-white"
                    }`}
                    onClick={() => {
                      dispatch(
                        updateUnits({
                          id: unit.id as string,
                          type: "upcoming",
                        })
                      );
                    }}
                  >
                    Upcoming
                  </button>
                  {/* input container */}
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      className={`text-[13px] font-normal flex justify-evenly items-center py-[12px] w-[100px] gap-2 border-2  rounded-md ${
                        !unit.isCurrent ? "border-black" : ""
                      }`}
                      value={unit.date}
                      onChange={(event) => {
                        dispatch(
                          updateUnits({
                            id: unit.id as string,
                            type: "upcoming",
                            value: event.target.value,
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div
        className={styles.topic}
        onClick={() => {
          updateOpenedModal("unit");
        }}
      >
        <h1>Unit(s)</h1>
        <i>
          <FaPlus />
        </i>
      </div>
      <div className={styles.numbersSelectedContainer}>
        {units.filter((unit) => unit.isCurrent).length} units selected
      </div>
    </article>
  );
};

export default Unit;
