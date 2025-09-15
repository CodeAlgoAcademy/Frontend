import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { FaSearch } from "react-icons/fa";
import NoItem from "@/components/UI/NoItem";
import OrganizerLayout from "@/components/layouts/OrganizerLayout";
import { UserResponse } from "types/interfaces/organization.interface";
import { getStudentOrganizationUsers } from "services/organizersService";
import { mapUserResponseToISingleStudent } from "utils/transform";
import { useRouter } from "next/router";
import AddStudentModal from "@/components/Teachers/students/AddStudentModal";
import OrganizationStudents from "@/components/organizers/student/students";

const OrganizationStudentsPage = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [commentTabsOpened, setCommentTabsOpened] = useState<boolean>(false);

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
            (student.user.firstname + " " + student.user.lastname)
               .toLowerCase()
               .includes(value.toLowerCase())
         );
      });
   };

   return (
      <div onClick={closeCommentTabs}>
         <OrganizerLayout>
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
                  onSubmit={(e) => e.preventDefault()}
               >
                  <FaSearch className="text-slate-400" />
                  <input
                     className="bg-transparent py-1 text-slate-800 outline-none"
                     placeholder="Search students"
                     onChange={(e) => filterStudents(e.target.value)}
                     data-testid="searchbox"
                  />
                  <button type="submit" hidden></button>
               </form>
            </div>

            {isLoadingStudents ? (
               <p className="mt-4 text-center text-slate-500">Loading students...</p>
            ) : !studentUsers || studentUsers.length === 0 ? (
               <NoItem text="This organization has no students yet" />
            ) : (
               <OrganizationStudents
                  commentTabsOpened={commentTabsOpened}
                  students={mapUserResponseToISingleStudent(filteredStudents)}
               />
            )}

            {isOpen && <AddStudentModal setIsOpen={setIsOpen} />}
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
   pointer: "cursor-pointer",
   plusIcon: "border border-mainColor rounded-full",
};