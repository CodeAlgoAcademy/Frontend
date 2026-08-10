import React, { useEffect, useState } from "react";
import { FiPlus, FiSettings, FiChevronDown } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import TeacherLayout from "@/components/layouts/TeacherLayout";
import AddStudentModal from "@/components/Teachers/students/AddStudentModal";
import Students from "@/components/Teachers/students/Students";
import NoItem from "@/components/UI/NoItem";
import { ISingleStudent, IClass } from "types/interfaces";
import { getStudents } from "store/studentSlice";
import MoveStudentModal from "@/components/Teachers/students/MoveStudentModal";
import Modal from "@/components/Teachers/addClass/modal";
import DeleteConfirmationModal from "@/components/Teachers/UI/common/DeleteConfirmationModal";
import { deleteClass, getAllClasses } from "services/classesService";
import { openEditClassModal } from "store/modalSlice";
import { populateClassForEdit } from "store/addClassSlice";
import { useTranslation } from "react-i18next";
import useClickOutside from "hooks/useClickOutside";

const Index = () => {
   const { t } = useTranslation("teacher");
   const dispatch = useDispatch();
   const router = useRouter();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [isMoveStudentModalOpen, setIsMoveStudentModalOpen] = useState<boolean>(false);
   const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
   const [isDeleteClassModalOpen, setIsDeleteClassModalOpen] = useState<boolean>(false);
   const [isDeletingClass, setIsDeletingClass] = useState<boolean>(false);
   const settingsRef = useClickOutside<HTMLDivElement>(() => setIsSettingsOpen(false));
   const { id } = useSelector((state: RootState) => state.currentClass);
   const currentClass = useSelector((state: RootState) => state.currentClass);
   const classes = useSelector((state: RootState) => state.allClasses.classes);
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

   const handleEditClass = () => {
      const current = classes?.find((cls: IClass) => String(cls.id) === String(id));
      const classData = current
         ? {
              className: current.className,
              grade: current.grade,
              subject: current.subject,
              roomNumber: current.roomNumber,
              color: current.color,
              organization: current.organization?.id || current.organization?.name || "",
              coTeachers: current.coTeacher || "",
           }
         : {
              className: currentClass.className,
              grade: "",
              subject: "",
              roomNumber: "",
              color: currentClass.color,
              organization: "",
              coTeachers: "",
           };
      dispatch(populateClassForEdit(classData));
      dispatch(openEditClassModal(current?.id ?? id));
      setIsSettingsOpen(false);
   };

   const handleDeleteClassClick = () => {
      setIsSettingsOpen(false);
      setIsDeleteClassModalOpen(true);
   };

   const handleDeleteClassConfirm = async () => {
      setIsDeletingClass(true);
      try {
         await dispatch(deleteClass(id));
         dispatch(getAllClasses());
         setIsDeleteClassModalOpen(false);
         router.push("/teachers/addClass");
      } catch (error) {
         console.error("Failed to delete class:", error);
      } finally {
         setIsDeletingClass(false);
      }
   };

   const settingsMenuItems = [
      {
         label: t("moveStudents"),
         icon: <HiOutlineArrowsExpand size={18} className="text-gray-500" />,
         onClick: () => {
            setIsSettingsOpen(false);
            setIsMoveStudentModalOpen(true);
         },
         testId: "move-students-option",
      },
      {
         label: t("editClass"),
         icon: <RiEditLine size={18} className="text-gray-500" />,
         onClick: handleEditClass,
         testId: "edit-class-option",
      },
      {
         label: t("deleteClass"),
         icon: <RiDeleteBin6Line size={18} className="text-red-500" />,
         danger: true,
         onClick: handleDeleteClassClick,
         testId: "delete-class-option",
      },
   ];

   return (
      <div onClick={closeCommentTabs}>
         <TeacherLayout className={styles.container}>
            <div className={styles.containerHeader}>
               <p className={styles.headerTitle}>{t("students")}</p>
               <div className="flex items-center">
                  <div className="relative" ref={settingsRef}>
                     <div
                        className={`${styles.settingsDiv} rounded-md`}
                        onClick={() => setIsSettingsOpen((prev) => !prev)}
                        data-testid="settings-dropdown"
                     >
                        <FiSettings size={20} className={styles.settingsIcon} />
                        <p className="sm:block">{t("settings")}</p>
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
                              {t("settings").toUpperCase()}
                           </p>
                           {settingsMenuItems.map((item) => (
                              <button
                                 key={item.testId}
                                 type="button"
                                 onClick={item.onClick}
                                 className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                                    item.danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-50"
                                 }`}
                                 data-testid={item.testId}
                              >
                                 <span className={`flex w-5 items-center justify-center ${item.danger ? "text-red-500" : ""}`}>{item.icon}</span>
                                 {item.label}
                              </button>
                           ))}
                        </div>
                     )}
                  </div>
                  <div className={styles.addDiv} onClick={() => setIsOpen(true)}>
                     <FiPlus size={25} className={styles.plusIcon} />
                     <p className="sm:block">{t("addStudent")}</p>
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
                     placeholder={t("searchStudents")}
                     onChange={(e) => {
                        filterStudents(e.target.value);
                     }}
                     data-testid="searchbox"
                  />
                  <button type="submit" hidden></button>
               </form>
            </div>
            {!students || students?.length === 0 ? (
               <NoItem text={t("noStudentsAdded")} />
            ) : (
               <Students commentTabsOpened={commentTabsOpened} students={filteredStudents} />
            )}
            {isOpen && <AddStudentModal setIsOpen={setIsOpen} />}
            {isMoveStudentModalOpen && <MoveStudentModal setIsOpen={setIsMoveStudentModalOpen} />}
            <DeleteConfirmationModal
               isOpen={isDeleteClassModalOpen}
               onClose={() => setIsDeleteClassModalOpen(false)}
               onConfirm={handleDeleteClassConfirm}
               title={t("deleteClass")}
               itemName={currentClass.className}
               isLoading={isDeletingClass}
               warningMessage={currentClass.isOrganizationClass ? t("orgClassPermissionWarning") : undefined}
            />
            <Modal />
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