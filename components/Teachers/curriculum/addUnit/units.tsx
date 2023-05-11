import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { Props, styles } from ".";
import { FaChevronDown, FaPlus } from "react-icons/fa";
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
   const { units, levels } = useSelector((state: RootState) => state.unit.addUnit);
   return (
      <article className="relative flex flex-col gap-2 md:flex-row">
         {openedModal === "unit" && levels !== "" && (
            <div
               className="close-dropdown fixed top-0 left-0 z-40 flex min-h-screen w-full items-center justify-center gap-y-4 overflow-hidden overflow-y-scroll bg-[rgba(0,0,0,0.6)]"
               data-testid="unit-modal"
            >
               <div className="flex max-h-[95vh] w-[90vw] max-w-[1000px] flex-col overflow-hidden rounded-md bg-white md:flex-row">
                  <aside className="hidden flex-[0.25] flex-col justify-between gap-4 border-gray-300 py-6 px-4 md:flex md:border-r-2 md:py-8">
                     <h1 className="hidden text-[22px] font-bold md:block">Add Unit(s)</h1>
                     {levels !== "" && (
                        <div className="flex flex-col">
                           <h1 className="flex flex-row items-center gap-x-3 text-[19px] font-bold">
                              <i className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#2073fa] text-white">
                                 <FaInfo />
                              </i>
                              Hints
                           </h1>
                           <main className="mt-2 max-h-[350px] w-full overflow-hidden overflow-y-scroll rounded-md border py-4 shadow-inner">
                              <ul className="mt-2 flex flex-col gap-y-3">
                                 {hints.map((hint: string, index: number) => {
                                    return (
                                       <li className="flex items-start gap-x-4" key={index}>
                                          <i className="mt-2 text-[18px] font-light text-[#2073fa]">
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
                        className="rounded-[40px] bg-[#2073fa] px-3 py-2 font-bold text-white hover:bg-[royalblue]"
                     >
                        Done
                     </button>
                  </aside>
                  <div className="flex max-h-[90vh] flex-[0.75] flex-col gap-y-4 overflow-hidden overflow-y-scroll py-8">
                     {levels === "" && (
                        <div className="flex h-full items-center justify-center px-4 text-center text-[22px] font-bold">Please Select a level</div>
                     )}
                     {units.map((unit: any, index: number) => {
                        const elementWithCurrentProperty: any = units.find((unit: any) => unit.isCurrent && unit.isChosen);
                        return (
                           <div
                              className={`flex flex-col flex-wrap justify-between gap-4 p-4 ${index === units.length - 1 ? "" : "border-b-2"}`}
                              key={index}
                              data-testid={`unit-${index}`}
                           >
                              <div className="relative">
                                 <h2 className="hoverElement w-fit cursor-pointer text-[22px] font-bold" title={unit.hoverText}>
                                    {unit.title}
                                 </h2>
                                 <p className="hoverText -top-[20px] right-[30px] bg-[#2073fa] after:bg-[#2073fa]" title="hoverText">
                                    {unit.hoverText}
                                 </p>
                              </div>
                              <div className="jutsify-between flex w-full flex-wrap items-end gap-4">
                                 <button
                                    className={`${styles.button} relative ${
                                       unit.isCurrent && unit.isChosen ? "bg-green-600 text-white" : "bg-green-400 text-white"
                                    }`}
                                    onClick={() => {
                                       if (!elementWithCurrentProperty || elementWithCurrentProperty?.id === unit.id) {
                                          dispatch(
                                             updateUnits({
                                                id: unit.id as string,
                                                type: "current",
                                             })
                                          );
                                       }
                                    }}
                                 >
                                    {elementWithCurrentProperty && elementWithCurrentProperty?.id !== unit.id ? (
                                       <>
                                          <p className="hoverElement">Current</p>
                                          <div className="hoverText right-[0] -top-[70px] min-w-fit bg-[#2073fa] after:bg-[#2073fa]">
                                             You can only have one current unit
                                          </div>
                                       </>
                                    ) : (
                                       "Current"
                                    )}
                                 </button>
                                 <button
                                    className={`${styles.button} ${
                                       !unit.isCurrent && unit.isChosen ? "bg-orange-600 text-white" : "bg-orange-400 text-white"
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
                                       name="start date"
                                       className={`hoverElement flex w-[120px] items-center justify-evenly gap-2 rounded-md border-2 py-[12px] text-[13px]  font-normal md:w-[150px] ${
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
                                    <div className="hoverText right-[0] -top-[40px] bg-[#2073fa] after:bg-[#2073fa]">Start Date</div>
                                 </div>
                                 <div className="relative">
                                    <input
                                       type="date"
                                       placeholder="end date"
                                       name="end date"
                                       id="date"
                                       className={`hoverElement flex w-[120px] items-center justify-evenly gap-2 rounded-md border-2 py-[12px] text-[13px]  font-normal md:w-[150px] ${
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
                                    <div className="hoverText right-[0] -top-[40px] bg-[#2073fa]">End Date</div>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
                  <footer className="flex flex-[0.25] flex-col-reverse justify-between gap-4 border-gray-300 py-6 px-4 md:hidden md:border-r-2 md:py-8">
                     <button
                        onClick={() => {
                           updateOpenedModal("");
                        }}
                        className="rounded-[40px] bg-[#2073fa] px-3 py-2 font-bold text-white hover:bg-[#2073fa]"
                     >
                        Done
                     </button>
                  </footer>
               </div>
            </div>
         )}
         <div
            className={`${styles.topic} ${openedModal === "unit" ? " outline-[#2073fa]" : "outline-transparent"}`}
            onClick={() => {
               updateOpenedModal("unit");
            }}
            data-testid="unit-modal-controller"
         >
            <h1>Unit(s)</h1>
            <i>
               <FaChevronDown />
            </i>
            {openedModal === "unit" && (
               <div className={`${styles.preview} z-[5]`}>
                  {levels === "" && <h1 className="font-lg p-2 text-center font-bold">Please select a level</h1>}
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
