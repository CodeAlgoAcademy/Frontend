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
  "Missiouri Learning Standards",
];

export const availableLevels: ILevels[] = [
  {
    level: "Green",
    units: ["Algorithm", "Variables"],
    grades: ["K", "1", "2", "3", "4"],
    hoverText: "I'm new to coding",
  },
  {
    level: "Yellow",
    units: ["Conditionals", "Loops", "Modularity"],
    grades: ["5", "6", "7", "8"],
    hoverText: "I know some coding",
  },
  {
    level: "Orange",
    units: ["Program Development I", "Program Development II"],
    grades: ["8+"],
    hoverText: "I have been coding for a long time",
  },
];

export const availableUnits = [
  {
    id: "7",
    unit: "Algorithm",
    isCurrent: false,
    date: "",
    hoverText: "An Algorithm is a set of steps to perform a task",
  },
  {
    id: "6",
    unit: "Variables",
    isCurrent: false,
    date: "",
    hoverText:
      "Variables are used to stored to be referenced and manipulated in a computer program",
  },
  {
    id: "5",
    unit: "Conditionals",
    isCurrent: false,
    date: "",
    hoverText:
      "Conditionals are ways for computers to make decisions based on an action being true or false",
  },
  {
    id: "4",
    unit: "Loops",
    isCurrent: false,
    date: "",
    hoverText:
      "Loop is a sequence of instructions that is continually repeated until a certain condition is reached. ",
  },
  {
    id: "3",
    unit: "Modularity",
    isCurrent: false,
    date: "",
    hoverText:
      "Modular programming is the process of subdividing a computer program into separate sub-programs",
  },
  {
    id: "2",
    unit: "Program Development I",
    isCurrent: false,
    date: "",
    hoverText:
      "Program development is the process of creating application programs",
  },
  {
    id: "1",
    unit: "Program Development II",
    isCurrent: false,
    date: "",
    hoverText: "Process of creating application advanced programs",
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
    <section className="w-full min-h-screen overflow-hidden overflow-y-scroll bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-10 flex justify-center items-center">
      {/* main modal */}
      <div className="w-[90vw] max-w-[1100px] bg-gray-100 px-8 mx-auto rounded-md py-16 relative">
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

          <Unit
            openedModal={openedModal}
            updateOpenedModal={updateOpenedModal}
          />

          <Grade
            openedModal={openedModal}
            updateOpenedModal={updateOpenedModal}
          />
        </div>
        <button
          className="w-[90%] max-w-[300px] bg-mainPurple mt-8 rounded-[4px] text-white font-bold py-3 mx-auto block hover:shadow-md cursor-pointer"
          onClick={() => {
            dispatch(closeAddUnitModal());
            dispatch(clearAddUnitsParams());
            updateOpenedModal("");
          }}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export const styles = {
  preview:
    "absolute bottom-[50%] left-0 w-[90vw] max-w-[240px] h-[200px] overflow-hidden overflow-y-scroll bg-white p-4 flex flex-col gap-2 rounded-md shadow-md text-[15px] font-normal",
  topic:
    "md:flex-[0.4] flex-[0.5] flex p-6 justify-between items-center bg-white rounded-md text-[17px] font-bold cursor-pointer",
  numbersSelectedContainer: "md:flex-[0.6] flex-[0.5] p-6 bg-white text-[17px]",
  inputContainer: "flex items-center gap-2",
  button: "py-[12px] text-center w-[100px] rounded-md hover:shadow-md",
};

export default AddUnit;
