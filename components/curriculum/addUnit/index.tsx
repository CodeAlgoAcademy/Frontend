import React, { useState, useEffect, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import {
  clearAddUnitsParams,
  displayUnitsAndGradesBasedOnLevels,
} from "store/unitsSlice";
import { ILevels } from "types/interfaces";
import Levels from "./levels";
import Standard from "./standard";
import Unit from "./units";
import Grade from "./grades";
import { closeAddUnitModal } from "store/modalSlice";

export interface Props {
  openedModal: string;
  updateOpenedModal: (modalToOpen: string) => void;
}

export const standards: string[] = [
  "CSTA",
  "Missiouri Learning Standards",
  "Kansas Computer Science Standards",
  "New York State Computer Science and Digital Fluency Science",
];

export const availableLevels: ILevels[] = [
  {
    level: "Green",
    unitsId: ["1", "2", "8"],
    grades: ["K", "1", "2", "3", "4"],
    hoverText: "I'm new to coding",
  },
  {
    level: "Yellow",
    unitsId: ["3", "4", "5", "8", "9"],
    grades: ["5", "6", "7", "8"],
    hoverText: "I know some coding",
  },
  {
    level: "Orange",
    unitsId: ["6", "7", "9", "10", "11", "12", "13", "14"],
    grades: ["8+"],
    hoverText: "I have been coding for a long time",
  },
];

export const availableUnits = [
  {
    id: "1",
    unit: "Algorithm",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText: "An Algorithm is a set of steps to perform a task",
  },
  {
    id: "2",
    unit: "Variables",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText:
      "Variables are used to stored to be referenced and manipulated in a computer program",
  },
  {
    id: "3",
    unit: "Conditionals",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText:
      "Conditionals are ways for computers to make decisions based on an action being true or false",
  },
  {
    id: "4",
    unit: "Loops",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText:
      "Loop is a sequence of instructions that is continually repeated until a certain condition is reached. ",
  },
  {
    id: "5",
    unit: "Modularity",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText:
      "Modular programming is the process of subdividing a computer program into separate sub-programs",
  },
  {
    id: "6",
    unit: "Program Development I",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText:
      "Program development is the process of creating application programs",
  },
  {
    id: "7",
    unit: "Program Development II",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText: "Process of creating application advanced programs",
  },
  {
    id: "8",
    unit: "Basics",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText: "Introduction to programming",
  },
  {
    id: "9",
    unit: "Functions",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText: "Functions are block of codes in performing specific tasks",
  },
  {
    id: "10",
    unit: "Advance",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText: "Advanced topics in programming",
  },
  {
    id: "11",
    unit: "Time Complexity",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText: "Time complexity is used to rate how fast a code runs",
  },
  {
    id: "12",
    unit: "Data Structure",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText:
      "There are various data types in programming, e.g: primtive and reference",
  },
  {
    id: "13",
    unit: "Advance Algorithm",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText:
      "There varous types of algorithms, binary search, sorting algorithm and many more",
  },
  {
    id: "14",
    unit: "File I/O",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText:
      "File I/O i.e file input/output refers to operations such as open, close, read and write",
  },
];

function AddUnit() {
  const { addUnitModalOpen } = useSelector((state: RootState) => state.modal);
  const { levels } = useSelector((state: RootState) => state.unit.addUnit);
  const [openedModal, setOpenedModal] = useState<string>("");

  const dispatch = useDispatch();
  const updateOpenedModal = (modalToOpen: string) => {
    if (openedModal === modalToOpen) {
      setOpenedModal("");
    } else {
      setOpenedModal(modalToOpen);
    }
  };

  const changeUnitsAndGrades = useCallback(() => {
    dispatch(displayUnitsAndGradesBasedOnLevels());
  }, [dispatch]);

  useEffect(() => {
    changeUnitsAndGrades();
  }, [levels, changeUnitsAndGrades]);

  if (!addUnitModalOpen) {
    return <></>;
  }
  return (
    <section className="flex-1 w-full bg-gray-100 px-8 mx-auto rounded-md py-16 relative">
      <i
        className="absolute top-[15px] right-[15px] text-[28px] text-red-600 font-bold cursor-pointer"
        onClick={() => {
          dispatch(closeAddUnitModal());
          dispatch(clearAddUnitsParams());
          updateOpenedModal("");
        }}
      >
        <FaTimes />
      </i>
      <div className="w-full flex flex-col gap-y-4">
        <Standard
          openedModal={openedModal}
          updateOpenedModal={updateOpenedModal}
        />

        <Levels
          openedModal={openedModal}
          updateOpenedModal={updateOpenedModal}
        />

        <Unit openedModal={openedModal} updateOpenedModal={updateOpenedModal} />

        <Grade
          openedModal={openedModal}
          updateOpenedModal={updateOpenedModal}
        />
      </div>
      <button
        className="w-[90vw] max-w-[250px] bg-orange-500 mt-8 rounded-[30px] text-white font-bold py-3 mx-auto block hover:shadow-md cursor-pointer"
        onClick={() => {
          dispatch(closeAddUnitModal());
          dispatch(clearAddUnitsParams());
          updateOpenedModal("");
        }}
      >
        Submit
      </button>
    </section>
  );
}

export const styles = {
  preview:
    "absolute w-[90vw] max-w-[220px] max-h-[200px] overflow-hidden overflow-y-scroll z-10 bg-white flex flex-col rounded-[15px] shadow-md text-[15px] font-normal",
  topic:
    "md:flex-[0.4] flex-[0.5] flex p-6 justify-between items-center bg-white rounded-md text-[17px] font-bold cursor-pointer",
  numbersSelectedContainer: "md:flex-[0.6] flex-[0.5] p-6 bg-white text-[17px]",
  inputContainer: "flex items-center gap-2 p-3 border-b-2 font-bold",
  button:
    "py-[12px] text-center md:w-[150px] w-[120px] rounded-md hover:shadow-md font-bold",
};

export default AddUnit;
