import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { FaSearch } from "react-icons/fa";
import TeacherLayout from "@/components/layouts/TeacherLayout";
import AddStudentModal from "@/components/Teachers/students/AddStudentModal";
import Students from "@/components/Teachers/students/Students";
import { getStudents } from "store/studentSlice";
import NoItem from "@/components/UI/NoItem";
import { ISingleStudent } from "types/interfaces";

const Index = () => {
   const dispatch = useDispatch();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const { id } = useSelector((state: RootState) => state.currentClass);
   const [commentTabsOpened, setCommentTabsOpened] = useState<boolean>(false);
   const students = useSelector((state: RootState) => state?.students?.students);
   const [filteredStudents, setFilteredStudents] = useState<ISingleStudent[]>([]);

   useEffect(() => {
      if (id) {
         dispatch(getStudents());
      }
   }, [dispatch, id]);

   useEffect(() => {
      setFilteredStudents(students);
   }, [students]);

   const closeCommentTabs = (event: any) => {
      if (event.target.classList.contains("students-container")) {
         setCommentTabsOpened(false);
      }
   };

   const filterStudents = (value: string) => {
      setFilteredStudents((prev) => {
         return students?.filter((student: any) => {
            if ((student.firstName + " " + student.lastName).toLowerCase().includes(value.toLowerCase())) {
               return student;
            }
         });
      });
   };

   return (
      <div onClick={closeCommentTabs}>
         <TeacherLayout className={styles.container}>
            <div className={styles.containerHeader}>
               <p className={styles.headerTitle}>Students</p>
               <div className={styles.addDiv} onClick={() => setIsOpen(true)}>
                  <FiPlus size={25} className={styles.plusIcon} />
                  <p className="sm:block">Add Student</p>
               </div>
            </div>

            <div className="mt-4 flex w-full justify-center xs:justify-end">
               <form
                  className="flex w-[90vw] max-w-[250px] items-center space-x-3 rounded-full bg-white p-1 px-2"
                  onSubmit={(e) => {
                     e.preventDefault();
                  }}
               >
                  <FaSearch className="text-slate-400" />
                  <input
                     className="bg-transparent py-1 text-slate-800 outline-none"
                     placeholder="Search students"
                     onChange={(e) => {
                        filterStudents(e.target.value);
                     }}
                     data-testid="searchbox"
                  />
                  <button type="submit" hidden></button>
               </form>
            </div>
            {!students || students?.length === 0 ? (
               <NoItem text="You have not added any student" />
            ) : (
               <Students commentTabsOpened={commentTabsOpened} students={filteredStudents} />
            )}
            {isOpen && <AddStudentModal setIsOpen={setIsOpen} />}
         </TeacherLayout>
      </div>
   );
};

export default Index;

const styles = {
   container: "bg-[#ECEDF3] py-5 overflow-x-auto flex-1 w-full students-container",
   containerHeader: "flex justify-between py-3 items-center border-b border-b-slate-400 students-container",
   headerTitle: "font-medium text-[30px] students-container text-mainColor",
   addDiv:
      "flex items-center space-x-2 text-mainColor font-light cursor-pointer hover:bg-slate-100 p-3 transition-all duration-300 students-container",
   pointer: "cursor-pointer",
   plusIcon: "border border-mainColor rounded-full",
};
