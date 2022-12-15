import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { Props, styles } from ".";
import { FaPlus } from "react-icons/fa";
import { FaInfo } from "react-icons/fa";
import { updateUnits } from "store/unitsSlice";
import { BiChevronRight } from "react-icons/bi";

const hints: string[] = [
  "Kindly ensure you set a start date and end date for the units you are selecting",
  "The selected end date must be greater than the start date",
  "If the unit selected is current, ensure the start date is today's date",
  "If it is upcoming, ensure the start date is a future date",
];

const Unit: FC<Props> = ({ openedModal, updateOpenedModal }) => {
  const dispatch = useDispatch();
  const { units, levels } = useSelector(
    (state: RootState) => state.unit.addUnit
  );
  return (
    <article className="flex flex-row gap-x-2 relative">
      {openedModal === "unit" && levels !== "" && (
        <div className="fixed top-0 left-0 z-30 w-full min-h-screen bg-[rgba(0,0,0,0.6)] flex justify-center items-center gap-y-4 overflow-hidden overflow-y-scroll close-dropdown">
          <div className="bg-white max-h-[95vh] w-[90vw] max-w-[1000px] overflow-hidden rounded-md flex md:flex-row flex-col">
            <aside className="flex-[0.25] md:border-r-2 border-gray-300 md:py-8 py-6 px-4 hidden md:flex flex-col justify-between gap-4">
              <h1 className="text-[22px] font-bold hidden md:block">
                Add Unit(s)
              </h1>
              {levels !== "" && (
                <div className="flex flex-col">
                  <h1 className="flex flex-row gap-x-3 font-bold text-[19px] items-center">
                    <i className="w-[28px] h-[28px] text-white bg-mainPurple flex justify-center items-center rounded-full">
                      <FaInfo />
                    </i>
                    Hints
                  </h1>
                  <main className="w-full max-h-[350px] py-4 overflow-hidden overflow-y-scroll border mt-2 rounded-md shadow-inner">
                    <ul className="mt-2 flex flex-col gap-y-3">
                      {hints.map((hint: string, index: number) => {
                        return (
                          <li className="flex items-start gap-x-4" key={index}>
                            <i className="text-[18px] text-mainPurple font-light mt-2">
                              <BiChevronRight />
                            </i>
                            <span>{hint}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </main>
                </div>
              )}
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
              {levels === "" && (
                <div className="px-4 text-center text-[22px] font-bold flex justify-center items-center h-full">
                  Please Select a level
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
                      <p className="text-[22px] font-bold hoverElement cursor-pointer w-fit">
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
            <footer className="flex-[0.25] md:border-r-2 border-gray-300 md:py-8 py-6 px-4 flex md:hidden flex-col-reverse justify-between gap-4">
              <button
                onClick={() => {
                  updateOpenedModal("");
                }}
                className="px-3 py-2 font-bold rounded-[40px] bg-orange-400 text-white hover:bg-orange-600"
              >
                Done
              </button>
            </footer>
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
            {levels === "" && (
              <h1 className="text-center p-2 font-bold font-lg">
                Please select a level
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
