import { IconButton } from "@mui/material";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { GeneralNav, Sidebar } from "../components";
import AddStudentModal from "../components/Teachers/students/AddStudentModal";
import Students from "../components/Teachers/students/Students";
import { RootState } from "store/store";
import { getStudents } from "store/studentSlice";
import { FaSearch } from "react-icons/fa";
import toast from "utils/toast";
import Toast from "@/components/Toast";
import { reset } from "store/notificationSlice";

const Index = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id } = useSelector((state: RootState) => state.currentClass);
  const [commentTabsOpened, setCommentTabsOpened] = useState<boolean>(false);
  const { students, errorMessage, isError } = useSelector((state: RootState) => state.students);
  const [filteredStudents, setFilteredStudents] = useState({
    students: students?.students,
  });

  useEffect(() => {
    dispatch(getStudents());
  }, [id]);

  useEffect(() => {
    setFilteredStudents(() => ({ students: students?.students }));
  }, [students?.students]);

  useLayoutEffect(() => {
    console.log(isError, errorMessage)
    if (isError) {
      toast.error(errorMessage, dispatch)
    }
  }, [])

  const closeCommentTabs = (event: any) => {
    if (event.target.classList.contains("students-container")) {
      setCommentTabsOpened(false);
    }
  };

  const filterStudents = (value: string) => {
    setFilteredStudents((prev) => {
      return {
        students: students?.students?.filter((student: any) => {
          if (
            (student.firstName + " " + student.lastName)
              .toLowerCase()
              .includes(value.toLowerCase())
          ) {
            return student;
          }
        }),
      };
    });
  };

  return (
    <>
      <Toast />
      <GeneralNav />
      <div className="flex items-stretch mb-auto">
        <div className="sidebar bg-white w-[270px]">
          <Sidebar />
        </div>
        <div className={styles.container} onClick={closeCommentTabs}>
          <div className={styles.containerHeader}>
            <p className={styles.headerTitle}>Students</p>
            <div className={styles.addDiv} onClick={() => setIsOpen(true)}>
              <FiPlus size={25} className={styles.plusIcon} />
              <p className="sm:block">Add Student</p>
            </div>
          </div>
          <div className="flex justify-end w-full mt-4">
            <form
              className="bg-white flex items-center space-x-3 rounded-full p-1 px-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <FaSearch className="text-slate-400" />
              <input 
                className="bg-transparent outline-none text-slate-800 py-1"
                onChange={(e) => {
                  filterStudents(e.target.value);
                }}
              />
              <button type="submit" hidden></button>
            </form>
          </div>

          <Students
            commentTabsOpened={commentTabsOpened}
            students={filteredStudents}
          />
          {isOpen && <AddStudentModal setIsOpen={setIsOpen} />}
        </div>
      </div>
    </>
  );
};

export default Index;

const styles = {
  container:
    "bg-[#E5E5E5] h-full px-5 md:px-20 py-5 overflow-x-auto min-h-screen flex-1 w-full students-container",
  containerHeader:
    "flex justify-between py-3 items-center border-b border-b-slate-400 students-container",
  headerTitle: "font-medium text-[30px] students-container",
  addDiv:
    "flex items-center space-x-2 font-light cursor-pointer hover:bg-slate-100 p-3 transition-all duration-300 students-container",
  pointer: "cursor-pointer",
  plusIcon: "border border-slate-700 rounded-full",
};
