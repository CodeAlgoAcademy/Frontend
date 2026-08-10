import React from "react";
import { FaSearch } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ModalFooter from "./ModalFooter";
import useClickOutside from "hooks/useClickOutside";

interface TeacherSelectStepProps {
   teachers: any[];
   teachersLoading: boolean;
   teacherQuery: string;
   setTeacherQuery: (value: string) => void;
   isDropdownOpen: boolean;
   setIsDropdownOpen: (value: boolean) => void;
   selectedTeacher: any;
   onSelectTeacher: (teacher: any) => void;
   onBack: () => void;
   onNext: () => void;
}

const TeacherSelectStep = ({
   teachers,
   teachersLoading,
   teacherQuery,
   setTeacherQuery,
   isDropdownOpen,
   setIsDropdownOpen,
   selectedTeacher,
   onSelectTeacher,
   onBack,
   onNext,
}: TeacherSelectStepProps) => {
   const { t } = useTranslation("teacher");
   const teacherSelectRef = useClickOutside<HTMLDivElement>(() => setIsDropdownOpen(false));
   return (
   <div>
      <div className="relative" ref={teacherSelectRef}>
         <button
            type="button"
            className="flex w-full items-center gap-x-2 rounded-full border border-gray-200 bg-white px-5 py-3.5 text-left outline-none focus:border-blue-400"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            data-testid="teacher-select"
         >
            <FaSearch className="text-gray-400" />
            {selectedTeacher ? (
               <span className="text-[15px] font-medium text-gray-800">
                  {selectedTeacher.firstName} {selectedTeacher.lastName}
                  {selectedTeacher.username ? ` (${selectedTeacher.username})` : ""}
               </span>
            ) : (
               <span className="text-[15px] text-gray-400">{t("selectATeacher")}</span>
            )}
         </button>

         {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
               <div className="flex items-center gap-x-2 border-b border-gray-100 px-4 py-3">
                  <FaSearch className="text-gray-400" />
                  <input
                     autoFocus
                     className="w-full py-1 text-[15px] text-gray-800 outline-none"
                     placeholder={t("searchByNameUsernameOrEmail")}
                     value={teacherQuery}
                     onChange={(e) => setTeacherQuery(e.target.value)}
                     data-testid="teacher-search-input"
                  />
               </div>
               <ul className="max-h-[220px] overflow-y-auto">
                  {teachersLoading && <li className="px-4 py-3 text-[13px] text-gray-500">{t("loadingTeachers")}</li>}
                  {!teachersLoading && teachers.length === 0 && (
                     <li className="px-4 py-3 text-[13px] text-gray-500">{t("noTeachersFound")}</li>
                  )}
                  {!teachersLoading &&
                     teachers.map((teacher: any) => (
                        <li key={teacher.id}>
                           <button
                              type="button"
                              className="flex w-full items-center gap-x-3 px-4 py-2.5 text-left transition-colors duration-150 hover:bg-gray-50"
                              onClick={() => onSelectTeacher(teacher)}
                           >
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[13px] font-bold text-blue-600">
                                 {`${teacher.firstName || "?"}`.charAt(0).toUpperCase()}
                              </span>
                              <span className="flex-1 truncate text-[15px] font-medium text-gray-800">
                                 {teacher.firstName} {teacher.lastName}
                              </span>
                              <span className="text-[13px] text-gray-400">{teacher.username}</span>
                           </button>
                        </li>
                     ))}
               </ul>
            </div>
         )}
      </div>

      <ModalFooter onBack={onBack} onPrimary={onNext} primaryLabel={t("nextStep")} primaryDisabled={!selectedTeacher} testId="move-teacher-next" />
   </div>
   );
};

export default TeacherSelectStep;