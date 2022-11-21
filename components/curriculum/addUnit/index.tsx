<<<<<<< HEAD
import React, { useState, useEffect, useCallback, MouseEvent } from "react";
=======
import React, { useState, useEffect, useCallback } from "react";
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
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
<<<<<<< HEAD
  "Advance",
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
];

export const availableLevels: ILevels[] = [
  {
    level: "Green",
    unitsId: ["1", "2", "3", "4", "5", "6", "7", "8"],
    grades: ["K", "1", "2", "3", "4"],
    hoverText: "I'm new to coding (Grades K - 4)",
  },
  {
    level: "Yellow",
    unitsId: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    grades: ["5", "6", "7", "8"],
    hoverText: "I know some coding (Grades 5 - 8)",
  },
  {
    level: "Orange",
    unitsId: ["12", "11", "9", "13", "10", "14"],
    grades: ["8+"],
    hoverText: "I have been coding for a long time (Grades 8+)",
  },
];

export const availableUnits = [
  {
    id: "1",
<<<<<<< HEAD
    unit: "Basics",
    isCurrent: true,
    startDate: "",
    endDate: "",
    isChosen: false,
    hoverText: "Introduction to programming",
  },
  {
    id: "2",
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "Algorithm",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
    hoverText: "An Algorithm is a set of steps to perform a task",
  },
  {
    id: "3",
=======
    hoverText: "An Algorithm is a set of steps to perform a task",
  },
  {
    id: "2",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "Variables",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    hoverText:
      "Variables are used to stored to be referenced and manipulated in a computer program",
  },
  {
<<<<<<< HEAD
    id: "4",
=======
    id: "3",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "Conditionals",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    hoverText:
      "Conditionals are ways for computers to make decisions based on an action being true or false",
  },
  {
<<<<<<< HEAD
    id: "5",
=======
    id: "4",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "Loops",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    hoverText:
      "Loop is a sequence of instructions that is continually repeated until a certain condition is reached. ",
  },
  {
<<<<<<< HEAD
    id: "6",
=======
    id: "5",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "Modularity",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    hoverText:
      "Modular programming is the process of subdividing a computer program into separate sub-programs",
  },
  {
<<<<<<< HEAD
    id: "7",
=======
    id: "6",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "Program Development I",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    hoverText:
      "Program development is the process of creating application programs",
  },
  {
<<<<<<< HEAD
    id: "8",
=======
    id: "7",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "Program Development II",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
    hoverText: "Process of creating application advanced programs",
  },

=======
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
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
  {
    id: "9",
    unit: "Functions",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    hoverText: "Functions are block of codes in performing specific tasks",
  },
  {
    id: "10",
<<<<<<< HEAD
=======
    unit: "Advance",
    isCurrent: true,
    startDate: "",
    endDate: "",
    hoverText: "Advanced topics in programming",
  },
  {
    id: "11",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "Time Complexity",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
    hoverText: "Time complexity is used to rate how fast a code runs",
  },
  {
    id: "11",
=======
    hoverText: "Time complexity is used to rate how fast a code runs",
  },
  {
    id: "12",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "Data Structure",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    hoverText:
      "There are various data types in programming, e.g: primtive and reference",
  },
  {
<<<<<<< HEAD
    id: "12",
=======
    id: "13",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "Advance Algorithm",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
=======
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    hoverText:
      "There varous types of algorithms, binary search, sorting algorithm and many more",
  },
  {
<<<<<<< HEAD
    id: "13",
=======
    id: "14",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
    unit: "File I/O",
    isCurrent: true,
    startDate: "",
    endDate: "",
<<<<<<< HEAD
    isChosen: false,
    hoverText:
      "File I/O i.e file input/output refers to operations such as open, close, read and write",
  },
  {
    id: "14",
    unit: "Program Development",
    isCurrent: true,
    startDate: "",
    endDate: "",
    isChosen: false,
    hoverText: "Program Development are techniques used to create programs",
  },
=======
    hoverText:
      "File I/O i.e file input/output refers to operations such as open, close, read and write",
  },
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
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
<<<<<<< HEAD
    <section
      className="flex-1 min-h-screen w-full bg-gray-100 px-8 mx-auto rounded-md py-16 relative close-dropdown"
      onClick={(event: any) => {
        if (event.target.classList.contains("close-dropdown")) {
          updateOpenedModal("");
        }
      }}
    >
=======
    <section className="flex-1 w-full bg-gray-100 px-8 mx-auto rounded-md py-16 relative">
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
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
<<<<<<< HEAD
    "absolute w-[100%] max-h-[200px] overflow-hidden overflow-y-scroll z-40 bg-white flex flex-col rounded-b-md top-[100%] left-0 shadow-md outline outline-2 outline-mainPurple text-[15px] font-normal dropdown",
  topic:
    "md:flex-[0.4] flex-[0.5] flex p-6 justify-between items-center bg-white rounded-md text-[17px] font-bold cursor-pointer relative outline outline-2",
  numbersSelectedContainer:
    "close-dropdown md:flex-[0.6] flex-[0.5] p-6 bg-white text-[17px]",
  inputContainer: "flex items-center gap-2 p-3 border-b-2 font-bold dropdown",
=======
    "absolute w-[90vw] max-w-[220px] max-h-[200px] overflow-hidden overflow-y-scroll z-10 bg-white flex flex-col rounded-[15px] shadow-md text-[15px] font-normal",
  topic:
    "md:flex-[0.4] flex-[0.5] flex p-6 justify-between items-center bg-white rounded-md text-[17px] font-bold cursor-pointer",
  numbersSelectedContainer: "md:flex-[0.6] flex-[0.5] p-6 bg-white text-[17px]",
  inputContainer: "flex items-center gap-2 p-3 border-b-2 font-bold",
>>>>>>> f76a84430869081f76ccfb10bf48a14aeed97a7f
  button:
    "py-[12px] text-center md:w-[150px] w-[120px] rounded-md hover:shadow-md font-bold",
};

export default AddUnit;
