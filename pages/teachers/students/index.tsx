import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { GeneralNav, Sidebar } from "../../../components";
import AddStudentModal from "../../../components/Teachers/students/AddStudentModal";
import Students from "../../../components/Teachers/students/Students";
import { RootState } from "store/store";
import { getStudents } from "store/studentSlice";

const Index = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useSelector((state: RootState) => state.currentClass);
  useEffect(() => {
    dispatch(getStudents());
  }, [id]);
  return (
    <>
      <GeneralNav />
      <div className="flex items-stretch mb-auto">
        <div className="sidebar bg-white w-[270px]">
          <Sidebar />
        </div>
        <div className={styles.container}>
          <div className={styles.containerHeader}>
            <p className={styles.headerTitle}>Students</p>
            <div className={styles.addDiv} onClick={() => setIsOpen(true)}>
              <FiPlus size={25} className={styles.plusIcon} />
              <p className="sm:block">Add Student</p>
            </div>
          </div>

          {/* <div className="flex p-5 justify-end">
            <div className="flex text-xs items-center">
              <IconButton>
                <IoIosArrowBack size={25} className={styles.pointer} />
              </IconButton>
              <p>1 of 3</p>
              <IconButton>
                <IoIosArrowForward size={25} className={styles.pointer} />
              </IconButton>
            </div>
          </div> */}

          <Students />
          {isOpen && <AddStudentModal setIsOpen={setIsOpen} />}
        </div>
      </div>
    </>
  );
};

export default Index;

const styles = {
  container:
    "bg-gray-200 h-full px-5 md:px-20 py-5 overflow-x-auto min-h-screen flex-1 w-full",
  containerHeader:
    "flex justify-between py-3 items-center border-b border-b-slate-400",
  headerTitle: "font-medium text-[30px]",
  addDiv:
    "flex items-center space-x-2 font-light cursor-pointer hover:bg-slate-100 p-3 transition-all duration-300",
  pointer: "cursor-pointer",
  plusIcon: "border border-slate-700 rounded-full",
};
