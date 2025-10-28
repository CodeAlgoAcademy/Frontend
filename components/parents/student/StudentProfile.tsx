import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import ContentBox from "../UI/ContentBox";
import StudentProfileInfo from "../UI/StudentProfileInfo";
import ResetPassword from "./ResetPassword";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useAppDispatch } from "store/hooks";
import { deleteChild } from "store/parentChildSlice";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";


const StudentProfile = () => {
   const { currentChild } = useSelector((state: RootState) => state.parentChild);
   const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
   const dispatch = useAppDispatch();
   const [resetPasswordOpen, setResetPasswordOpen] = useState<boolean>(false);
   const [isDeleting, setIsDeleting] = useState(false);

   const handleDeleteStudent = async () => {
      if (!currentChild?.id) return;
      
      setIsDeleting(true);
      try {
         await dispatch(deleteChild({ child_id: currentChild.id })).unwrap();
         setConfirmDeleteOpen(false);
      } catch (error) {
         console.error('Failed to delete child:', error);
      } finally {
         setIsDeleting(false);
      }
   };

   return (
      <ContentBox padding="small" size="large" title="Child's Profile" style={{ minWidth: "100%", maxWidth: "100%", marginBottom: "1.5rem" }}>
         <div className="flex h-[240px] w-full flex-col gap-[2rem] p-8 lg:flex-row lg:gap-[3rem] relative">
            <div className="h-full w-full min-w-fit max-w-fit">
               <img
                  src="/assets/no user.png"
                  alt="user "
                  className="h-[120px] w-[120px] rounded-full object-cover object-center lg:h-[200px] lg:w-[200px]"
               />
            </div>
            <div className="grid flex-1 grid-cols-2 gap-[1rem]">
               <StudentProfileInfo header="Name" body={currentChild?.fullName} />
               <StudentProfileInfo header="Username" body={currentChild?.username} />
               <StudentProfileInfo header="Coding Experience" body={currentChild?.codingExperience} />
               <StudentProfileInfo header="Date of birth" body={currentChild?.dob} />
            </div>
            
            <div className="absolute top-8 right-8">
               <div className="relative">
                  <span onClick={() => setIsActionMenuOpen((prev) => !prev)}>
                     <HiOutlineDotsHorizontal className={styles.pointer} />
                  </span>

                  {isActionMenuOpen && (
                     <div className="absolute top-full right-0 z-50 w-40 rounded-md border bg-white shadow-lg mt-1">
                        <button
                           className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                           onClick={() => {
                              setIsActionMenuOpen(false);
                              setConfirmDeleteOpen(true);
                           }}
                        >
                           Delete student
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <ConfirmDeleteModal
            isOpen={confirmDeleteOpen}
            onClose={() => setConfirmDeleteOpen(false)}
            onConfirm={handleDeleteStudent}
            title="Are you sure you want to delete"
            itemName={currentChild?.fullName || ""}
            isDeleting={isDeleting}
            confirmText="Delete"
            cancelText="Cancel"
         />

         {currentChild && (
            <div className="relative ml-auto max-w-fit">
               <p className="cursor-pointer font-medium underline" onClick={() => setResetPasswordOpen(!resetPasswordOpen)}>
                  Reset Password
               </p>
               {resetPasswordOpen && <ResetPassword closeModal={() => setResetPasswordOpen(false)} />}
            </div>
         )}
      </ContentBox>
   );
};
const styles = {
   pointer: "cursor-pointer",
};

export default StudentProfile;