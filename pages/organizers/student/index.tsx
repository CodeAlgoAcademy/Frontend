import React, { useEffect, useState } from "react";
import { FiPlus, FiDownload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { FaSearch, FaFilePdf, FaFileCsv } from "react-icons/fa";
import NoItem from "@/components/UI/NoItem";
import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import { UserResponse } from "types/interfaces/organization.interface";
import {
   getStudentOrganizationUsers,
   downloadOrganizationStudentsPDF,
   downloadOrganizationStudentsCSV,
} from "services/organizersService";
import { mapUserResponseToISingleStudent } from "utils/transform";
import { useRouter } from "next/router";
import AddStudentModal from "@/components/organizers/student/AddStudentModal";
import OrganizationStudents from "@/components/organizers/student/students";
import StudentListSkeleton from "@/components/organizers/UI/StudentListSkeleton";
import GeneratingModal from "@/components/organizers/student/GeneratingModal";
import { useTranslation } from "react-i18next";
import useClickOutside from "hooks/useClickOutside";

const OrganizationStudentsPage = () => {
   const { t } = useTranslation("organizer");
   const dispatch = useDispatch();
   const router = useRouter();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [commentTabsOpened, setCommentTabsOpened] = useState<boolean>(false);
   const [isDownloading, setIsDownloading] = useState<boolean>(false);
   const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState<boolean>(false);
   const downloadMenuRef = useClickOutside<HTMLDivElement>(() => setIsDownloadMenuOpen(false));

   const { selectedOrganization, studentUsers, isLoadingStudents } = useSelector(
      (state: RootState) => state.organizer
   );

   const [filteredStudents, setFilteredStudents] = useState<UserResponse[]>([]);

   useEffect(() => {
      if (selectedOrganization?.id) {
         dispatch(getStudentOrganizationUsers() as any);
      }
   }, [dispatch, selectedOrganization]);

   useEffect(() => {
      setFilteredStudents(studentUsers);
   }, [studentUsers]);

   const closeCommentTabs = (event: any) => {
      if (event.target.classList.contains("students-container")) {
         setCommentTabsOpened(false);
      }
   };

   const filterStudents = (value: string) => {
      setFilteredStudents(() => {
         return studentUsers?.filter((student: UserResponse) =>
             (student.user.firstName + " " + student.user.lastName)
               .toLowerCase()
               .includes(value.toLowerCase())
         );
      });
   };

   const handleDownloadPDF = async () => {
      if (!selectedOrganization?.id) return;
      setIsDownloadMenuOpen(false);
      setIsDownloading(true);
      try {
         const blob = await downloadOrganizationStudentsPDF(selectedOrganization.id);
         const pdfUrl = window.URL.createObjectURL(blob);
         const newWindow = window.open(pdfUrl, "_blank");
         if (!newWindow) {
            alert(t("allowPopupsForPdf"));
         }
         setTimeout(() => window.URL.revokeObjectURL(pdfUrl), 1000);
      } catch (error) {
         console.error("PDF download failed:", error);
         alert(t("pdfGenerationFailed"));
      } finally {
         setIsDownloading(false);
      }
   };

   const handleDownloadCSV = async () => {
      if (!selectedOrganization?.id) return;
      setIsDownloadMenuOpen(false);
      setIsDownloading(true);
      try {
         const blob = await downloadOrganizationStudentsCSV(selectedOrganization.id);
         const csvUrl = window.URL.createObjectURL(blob);
         const a = document.createElement("a");
         a.href = csvUrl;
         a.download = `organization-${selectedOrganization.id}-students.csv`;
         document.body.appendChild(a);
         a.click();
         window.URL.revokeObjectURL(csvUrl);
         document.body.removeChild(a);
      } catch (error) {
         console.error("CSV download failed:", error);
         alert(t("csvDownloadFailed"));
      } finally {
         setIsDownloading(false);
      }
   };

   return (
      <div onClick={closeCommentTabs}>
         <OrganizerLayout>
            <div className={styles.containerHeader}>
               <p className={styles.headerTitle}>{t("students")}</p>
               <div className="flex items-center gap-2 students-container">
                  {studentUsers && studentUsers.length > 0 && (
                     <div className="relative" ref={downloadMenuRef}>
                        <div
                           className={styles.downloadDiv}
                           onClick={() => setIsDownloadMenuOpen((prev) => !prev)}
                           data-testid="download-dropdown"
                        >
                           <FiDownload size={20} className={styles.downloadIcon} />
                           <p className="sm:block">{t("download")}</p>
                        </div>
                        {isDownloadMenuOpen && (
                           <div className="absolute right-0 z-10 mt-2 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-xl">
                              <p className="px-4 pb-2 pt-1 text-xs font-semibold tracking-wide text-gray-400">
                                 {t("download").toUpperCase()}
                              </p>
                              <button
                                 type="button"
                                 onClick={handleDownloadPDF}
                                 disabled={isDownloading}
                                 className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50 disabled:opacity-50"
                                 data-testid="download-pdf-option"
                              >
                                 <FaFilePdf size={16} className="text-red-500" />
                                 {t("downloadPdfLoginCards")}
                              </button>
                              <button
                                 type="button"
                                 onClick={handleDownloadCSV}
                                 disabled={isDownloading}
                                 className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50 disabled:opacity-50"
                                 data-testid="download-csv-option"
                              >
                                 <FaFileCsv size={16} className="text-green-500" />
                                 {t("downloadCsv")}
                              </button>
                           </div>
                        )}
                     </div>
                  )}
                  <div className={styles.addDiv} onClick={() => setIsOpen(true)}>
                     <FiPlus size={25} className={styles.plusIcon} />
                     <p className="sm:block">{t("addStudent")}</p>
                  </div>
               </div>
            </div>

            <div className="mt-4 flex w-full justify-center xs:justify-end">
               <form
                  className="flex w-[90vw] max-w-[250px] items-center space-x-3 rounded-full bg-white p-1 px-2"
                  onSubmit={(e) => e.preventDefault()}
               >
                  <FaSearch className="text-slate-400" />
                  <input
                     className="bg-transparent py-1 text-slate-800 outline-none"
                     placeholder={t("searchStudents")}
                     onChange={(e) => filterStudents(e.target.value)}
                     data-testid="searchbox"
                  />
                  <button type="submit" hidden></button>
               </form>
            </div>

            {isLoadingStudents ? (
               <StudentListSkeleton />
            ) : !studentUsers || studentUsers.length === 0 ? (
               <NoItem text={t("noStudentsYet")} />
            ) : (
               <OrganizationStudents
                  commentTabsOpened={commentTabsOpened}
                  students={mapUserResponseToISingleStudent(filteredStudents)}
               />
            )}

            {isOpen && <AddStudentModal setIsOpen={setIsOpen} />}
            <GeneratingModal isOpen={isDownloading} message={t("generating")} />
         </OrganizerLayout>
      </div>
   );
};

export default OrganizationStudentsPage;

export const styles = {
   container: "bg-[#ECEDF3] py-5 overflow-x-auto flex-1 w-full students-container",
   containerHeader: "flex justify-between py-3 items-center border-b border-b-slate-400 students-container",
   headerTitle: "font-medium text-[30px] students-container text-mainColor",
   addDiv:
      "flex items-center space-x-2 text-mainColor font-light cursor-pointer hover:bg-slate-100 p-3 transition-all duration-300 students-container",
   downloadDiv:
      "flex items-center space-x-2 text-mainColor font-light cursor-pointer hover:bg-slate-100 p-3 transition-all duration-300 students-container rounded-md",
   pointer: "cursor-pointer",
   plusIcon: "border border-mainColor rounded-full",
   downloadIcon: "border border-mainColor rounded-full",
};
