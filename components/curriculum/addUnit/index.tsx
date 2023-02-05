import React,{useState,useEffect,useCallback,MouseEvent} from 'react';
import {FaTimes} from 'react-icons/fa';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'store/store';
import {
  clearAddUnitsParams,
  displayUnitsAndGradesBasedOnLevels,
  rearrangeUnits,
  verifyUnits,
} from 'store/unitsSlice';
import {ILevels} from 'types/interfaces';
import Levels from './levels';
import Standard from './standard';
import Unit from './units';
import Grade from './grades';
import {closeAddUnitModal} from 'store/modalSlice';
import {addUnits,getAllCurriculums} from 'services/curriculumService';

export interface Props {
  openedModal: string;
  updateOpenedModal: (modalToOpen: string) => void;
}

export const standards: string[] = [
  'CSTA',
  'Missiouri Learning Standards',
  'Kansas Computer Science Standards',
  'New York State Computer Science and Digital Fluency Science',
  'Advance',
];

export const availableLevels: ILevels[] = [
  {
    title: 'Green',
    unitsId: ['1','2','3','4','5','6','7','8'],
    grades: ['K','1','2','3','4'],
    hoverText: "I'm new to coding (Grades K - 4)",
  },
  {
    title: 'Yellow',
    unitsId: ['1','2','3','4','5','6','7','8','9'],
    grades: ['5','6','7'],
    hoverText: 'I know some coding (Grades 5 - 8)',
  },
  {
    title: 'Orange',
    unitsId: ['12','11','9','13','10','14'],
    grades: ['8+'],
    hoverText: 'I have been coding for a long time (Grades 8+)',
  },
];

export const availableUnits = [
  {
    id: '1',
    title: 'Basics',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText: 'Introduction to programming',
  },
  {
    id: '2',
    title: 'Algorithm',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText: 'An Algorithm is a set of steps to perform a task',
  },
  {
    id: '3',
    title: 'Variables',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText:
      'Variables are used to stored to be referenced and manipulated in a computer program',
  },
  {
    id: '4',
    title: 'Conditionals',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText:
      'Conditionals are ways for computers to make decisions based on an action being true or false',
  },
  {
    id: '5',
    title: 'Loops',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText:
      'Loop is a sequence of instructions that is continually repeated until a certain condition is reached. ',
  },
  {
    id: '6',
    title: 'Modularity',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText:
      'Modular programming is the process of subdividing a computer program into separate sub-programs',
  },
  {
    id: '7',
    title: 'Program Development I',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText: 'Program development is the process of creating application programs',
  },
  {
    id: '8',
    title: 'Program Development II',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText: 'Process of creating application advanced programs',
  },

  {
    id: '9',
    title: 'Functions',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText: 'Functions are block of codes in performing specific tasks',
  },
  {
    id: '10',
    title: 'Time Complexity',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText: 'Time complexity is used to rate how fast a code runs',
  },
  {
    id: '11',
    title: 'Data Structure',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText: 'There are various data types in programming, e.g: primtive and reference',
  },
  {
    id: '12',
    title: 'Advance Algorithm',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText: 'There varous types of algorithms, binary search, sorting algorithm and many more',
  },
  {
    id: '13',
    title: 'File I/O',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText:
      'File I/O i.e file input/output refers to operations such as open, close, read and write',
  },
  {
    id: '14',
    title: 'Program Development',
    isCurrent: true,
    startDate: '',
    endDate: '',
    isChosen: false,
    hoverText: 'Program Development are techniques used to create programs',
  },
];

function AddUnit() {
  const {addUnitModalOpen} = useSelector((state: RootState) => state.modal);
  const {levels} = useSelector((state: RootState) => state.unit.addUnit);
  const addUnit = useSelector((state: RootState) => state.unit.addUnit);
  const [openedModal,setOpenedModal] = useState<string>('');

  const dispatch = useDispatch();
  const updateOpenedModal = (modalToOpen: string) => {
    if(openedModal === modalToOpen) {
      setOpenedModal('');
    } else {
      setOpenedModal(modalToOpen);
    }
  };

  const changeUnitsAndGrades = useCallback(() => {
    dispatch(displayUnitsAndGradesBasedOnLevels());
  },[dispatch]);

  useEffect(() => {
    changeUnitsAndGrades();
  },[levels,changeUnitsAndGrades]);

  if(!addUnitModalOpen) {
    return <></>;
  }
  return (
    <section
      className="flex-1 max-w-[1200px] min-h-screen w-full bg-gray-100 px-8 mx-auto py-16 absolute left-0 top-0 close-dropdown"
      onClick={(event: any) => {
        if(event.target.classList.contains('close-dropdown')) {
          updateOpenedModal('');
        }
      }}
    >
      <i
        className="absolute top-[15px] right-[15px] text-[28px] text-red-600 font-bold cursor-pointer"
        onClick={() => {
          dispatch(closeAddUnitModal());
          dispatch(clearAddUnitsParams());
          updateOpenedModal('');
        }}
      >
        <FaTimes />
      </i>
      <div className="w-full flex flex-col gap-y-4">
        <Standard openedModal={openedModal} updateOpenedModal={updateOpenedModal} />

        <Levels openedModal={openedModal} updateOpenedModal={updateOpenedModal} />

        <Unit openedModal={openedModal} updateOpenedModal={updateOpenedModal} />

        <Grade openedModal={openedModal} updateOpenedModal={updateOpenedModal} />
      </div>
      <div className="flex justify-center mt-8 gap-x-4 gap-y-2 items-center w-full flex-col md:flex-row">
        <button
          className={styles.mainButton}
          onClick={() => {
            dispatch(clearAddUnitsParams());
            updateOpenedModal('');
          }}
        >
          Clear All Fields
        </button>
        <button
          className={styles.mainButton}
          onClick={async () => {
            updateOpenedModal('');
            dispatch(rearrangeUnits());
            dispatch(verifyUnits());
            const data = await dispatch(addUnits());
            if(!data?.error?.message && data.payload !== undefined) {
              dispatch(clearAddUnitsParams());
              dispatch(closeAddUnitModal());
              await dispatch(getAllCurriculums());
            }
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
    'absolute w-[100%] max-h-[200px] overflow-hidden overflow-y-scroll z-40 bg-white flex flex-col rounded-b-md top-[100%] left-0 shadow-md outline outline-2 outline-mainPurple text-[15px] font-normal dropdown',
  topic:
    'md:flex-[0.4] flex-[0.5] flex p-6 justify-between items-center bg-white rounded-md text-[17px] font-bold cursor-pointer relative outline outline-2',
  numbersSelectedContainer:
    'close-dropdown md:flex-[0.6] flex-[0.5] px-6 py-4 bg-white text-[17px] w-full max-w-[520px] rounded-md overflow-hidden overflow-x-scroll short-scroll-thumb flex flex-row gap-x-3 items-center',
  inputContainer: 'flex items-center gap-2 p-3 border-b-2 font-bold dropdown',
  button: 'py-[12px] text-center md:w-[150px] w-[120px] rounded-md hover:shadow-md font-bold',
  selectedItems:
    'py-2 px-3 rounded-md bg-mainPurple text-white font-bold text-[16px] min-w-fit max-w-fit',
  mainButton:
    'w-[90vw] max-w-[200px] bg-orange-500 rounded-[30px] text-white font-bold py-3 block hover:shadow-md cursor-pointer',
};

export default AddUnit;
