import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiSettings, FiChevronDown, FiEdit2, FiFileText, FiTrash2 } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import TeacherLayout from "@/components/layouts/TeacherLayout";
import AddStudentModal from "@/components/Teachers/students/AddStudentModal";
import Students from "@/components/Teachers/students/Students";
import NoItem from "@/components/UI/NoItem";
import { ISingleStudent } from "types/interfaces";
import { getStudents } from "store/studentSlice";
import MoveStudentModal from "@/components/Teachers/students/MoveStudentModal";

const Index = () => {
   const dispatch = useDispatch();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [isMoveStudentModalOpen, setIsMoveStudentModalOpen] = useState<boolean>(false);
   const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
   const settingsRef = useRef<HTMLDivElement>(null);
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

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
            setIsSettingsOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

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
   const settingsMenuItems = [

      // {
      //    label: "Edit Classroom Name",
      //    icon: <FiEdit2 size={18} className="text-gray-500" />,
      //    onClick: () => {
      //       setIsSettingsOpen(false);
      //    },
      //    testId: "edit-classroom-name-option",
      // },

      {
         label: "Move Students",
         icon: <HiOutlineArrowsExpand size={18} className="text-gray-500" />,
         onClick: () => {
            setIsSettingsOpen(false);
            setIsMoveStudentModalOpen(true);
         },
         testId: "move-students-option",
      },
      // {
      //    label: "Delete Classroom",
      //    icon: <FiTrash2 size={18} className="text-gray-500" />,
      //    onClick: () => {
      //       setIsSettingsOpen(false);
      //       // TODO: open delete-classroom confirmation
      //    },
      //    testId: "delete-classroom-option",
      // },
   ];

   return (
      <div onClick={closeCommentTabs}>
         <TeacherLayout className={styles.container}>
            <div className={styles.containerHeader}>
               <p className={styles.headerTitle}>Students</p>
               <div className="flex items-center">
                  <div className="relative" ref={settingsRef}>
                     <div
                        className={`${styles.settingsDiv} rounded-md`}
                        onClick={() => setIsSettingsOpen((prev) => !prev)}
                        data-testid="settings-dropdown"
                     >
                        <FiSettings size={20} className={styles.settingsIcon} />
                        <p className="sm:block">Settings</p>
                        <FiChevronDown
                           size={16}
                           className={`ml-1 text-gray-400 transition-transform duration-200 ${
                              isSettingsOpen ? "rotate-180" : ""
                           }`}
                        />
                     </div>
                     {isSettingsOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-64 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                           <p className="px-4 pb-2 pt-1 text-xs font-semibold tracking-wide text-gray-400">
                              SETTINGS
                           </p>
                           {settingsMenuItems.map((item) => (
                              <button
                                 key={item.testId}
                                 type="button"
                                 onClick={item.onClick}
                                 className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                                 data-testid={item.testId}
                              >
                                 <span className="flex w-5 items-center justify-center">{item.icon}</span>
                                 {item.label}
                              </button>
                           ))}
                        </div>
                     )}
                  </div>
                  <div className={styles.addDiv} onClick={() => setIsOpen(true)}>
                     <FiPlus size={25} className={styles.plusIcon} />
                     <p className="sm:block">Add Student</p>
                  </div>
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
            {isMoveStudentModalOpen && <MoveStudentModal setIsOpen={setIsMoveStudentModalOpen} />}
         </TeacherLayout>
      </div>
   );
};

export default Index;

export const styles = {
   container: "bg-[#ECEDF3] py-5 overflow-x-auto flex-1 w-full students-container",
   containerHeader: "flex justify-between py-3 items-center border-b border-b-slate-400 students-container",
   headerTitle: "font-medium text-[30px] students-container text-mainColor",
   addDiv:
      "flex items-center space-x-2 text-mainColor font-light cursor-pointer hover:bg-slate-100 p-3 transition-all duration-300 students-container",
   settingsDiv:
      "flex items-center space-x-2 text-mainColor font-light cursor-pointer hover:bg-slate-100 p-3 transition-all duration-300 students-container",
   pointer: "cursor-pointer",
   plusIcon: "border border-mainColor rounded-full",
   settingsIcon: "border border-mainColor rounded-full",
};