import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { Props, styles } from ".";
import { FaPlus } from "react-icons/fa";
import { updateUnits } from "store/unitsSlice";

const Unit: FC<Props> = ({ openedModal, updateOpenedModal }) => {
  const dispatch = useDispatch();
  const { units, levels } = useSelector(
    (state: RootState) => state.unit.addUnit
  );
  return (
    <article className="flex flex-row gap-x-2 relative">
      {openedModal === "unit" && levels.length > 0 && (
        <div className="fixed top-0 left-0 z-30 w-full min-h-screen bg-[rgba(0,0,0,0.6)] flex justify-center items-center gap-y-4 overflow-hidden overflow-y-scroll close-dropdown">
          <div className="bg-white w-[90vw] max-w-[1000px] overflow-hidden rounded-md flex md:flex-row flex-col-reverse">
            <aside className="flex-[0.25] md:border-r-2 border-gray-300 md:py-8 py-6 px-4 flex flex-col justify-between gap-4">
              <h1 className="text-[22px] font-bold hidden md:block">
                Add Unit(s)
              </h1>
              <button
                onClick={() => {
                  updateOpenedModal("");
                }}
                className="px-3 py-2 font-bold rounded-[40px] bg-orange-400 text-white hover:bg-orange-600"
              >
                Done
              </button>
            </aside>
            <div className="flex-[0.75] flex flex-col gap-y-4 py-8 max-h-[90vh] overflow-hidden overflow-y-scroll">
              {levels.length === 0 && (
                <div className="px-4 text-center text-[22px] font-bold flex justify-center items-center h-full">
                  Please Select one or more levels
                </div>
              )}
              {units.map((unit: any, index: number) => {
                const elementWithCurrentProperty: any = units.find(
                  (unit: any) => unit.isCurrent && unit.isChosen
                );
                return (
                  <div
                    className={`flex flex-wrap justify-between gap-4 flex-col p-4 ${
                      index === units.length - 1 ? "" : "border-b-2"
                    }`}
                    key={index}
                  >
                    <div className="relative">
                      <p className="text-[22px] font-bold hoverElement cursor-pointer">
                        {unit.title}
                      </p>
                      <p className="hoverText -top-[20px] right-[30px]">
                        {unit.hoverText}
                      </p>
                    </div>
                    <div className="flex flex-wrap w-full jutsify-between items-end gap-4">
                      <button
                        className={`${styles.button} relative ${
                          unit.isCurrent && unit.isChosen
                            ? "bg-green-600 text-white"
                            : "bg-green-400 text-white"
                        }`}
                        onClick={() => {
                          console.log(unit.id);
                          console.log(elementWithCurrentProperty?.id);
                          if (
                            !elementWithCurrentProperty ||
                            elementWithCurrentProperty?.id === unit.id
                          ) {
                            dispatch(
                              updateUnits({
                                id: unit.id as string,
                                type: "current",
                              })
                            );
                          }
                        }}
                      >
                        {elementWithCurrentProperty &&
                        elementWithCurrentProperty?.id !== unit.id ? (
                          <>
                            <p className="hoverElement">Current</p>
                            <div className="hoverText right-[0] -top-[70px] min-w-fit">
                              You can only have one current unit
                            </div>
                          </>
                        ) : (
                          "Current"
                        )}
                      </button>
                      <button
                        className={`${styles.button} ${
                          !unit.isCurrent && unit.isChosen
                            ? "bg-orange-600 text-white"
                            : "bg-orange-400 text-white"
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
                          placeholder="start date"
                          id="date"
                          className={`text-[13px] font-normal flex justify-evenly items-center py-[12px] md:w-[150px] w-[120px] gap-2 border-2  rounded-md hoverElement ${
                            !unit.isCurrent ? "border-black" : ""
                          }`}
                          value={unit.startDate}
                          onChange={(event) => {
                            dispatch(
                              updateUnits({
                                id: unit.id as string,
                                type: "start date",
                                value: event.target.value,
                              })
                            );
                          }}
                        />
                        <div className="hoverText right-[0] -top-[40px]">
                          Start Date
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="date"
                          placeholder="end date"
                          id="date"
                          className={`text-[13px] font-normal flex justify-evenly items-center py-[12px] md:w-[150px] w-[120px] gap-2 border-2  rounded-md hoverElement ${
                            !unit.isCurrent ? "border-black" : ""
                          }`}
                          value={unit.endDate}
                          onChange={(event) => {
                            dispatch(
                              updateUnits({
                                id: unit.id as string,
                                type: "end date",
                                value: event.target.value,
                              })
                            );
                          }}
                        />
                        <div className="hoverText right-[0] -top-[40px]">
                          End Date
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div
        className={`${styles.topic} ${
          openedModal === "unit" ? " outline-mainPurple" : "outline-transparent"
        }`}
        onClick={() => {
          updateOpenedModal("unit");
        }}
      >
        <h1>Unit(s)</h1>
        <i>
          <FaPlus />
        </i>
        {openedModal === "unit" && (
          <div className={`${styles.preview} z-[5]`}>
            {levels.length === 0 && (
              <h1 className="text-center p-2 font-bold font-lg">
                Please select one or more levels
              </h1>
            )}
          </div>
        )}
      </div>
      <div className={styles.numbersSelectedContainer}>
        {units.filter((unit: any) => unit.isChosen).length === 0
          ? `0 units selected`
          : units
              .filter((unit: any) => unit.isChosen)
              .map((unit: any, index: number) => {
                return (
                  <span key={index} className={styles.selectedItems}>
                    {unit.title}
                  </span>
                );
              })}
      </div>
    </article>
  );
};

export default Unit;
