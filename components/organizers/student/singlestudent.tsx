import React, { useState, ChangeEvent, SetStateAction, Dispatch, FormEvent, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import {
   editOrganizationStudent,
   deleteOrganizationStudent,
   addOrganizationStudentComment as addComment,
   editOrganizationStudentComment as editComment,
   deleteOrganizationStudentComment as deleteComment,
   getOrganizationStudentComments as getComment,
} from "services/organizersService";
import { FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { AssignmentDetails, IChildTopics, ISingleStudent } from "types/interfaces";
import { RootState } from "store/store";
import { getStudentOrganizationLineProgress, getStudentOrganizationProgress, getStudentOrganizationUsers } from "services/organizersService";
import { useAppDispatch } from "store/hooks";
import StudentTable from "@/components/Teachers/students/StudentTable";
import Loader from "@/components/UI/loader";
import useClickOutside from "hooks/useClickOutside";
import { useTranslation } from "react-i18next";

const SingleOrganizationStudent = ({
   student,
   studentCommentOpen,
   setStudentCommentOpen,
   comment,
   setComment,
   studentCommentsTabOpen,
   setStudentCommentsTabOpen,
   editStudentModalOpened,
   setEditStudentModalOpened,
}: {
   student: ISingleStudent;
   studentCommentOpen: string;
   setStudentCommentOpen: Dispatch<SetStateAction<string>>;
   comment: string;
   setComment: Dispatch<SetStateAction<string>>;
   studentCommentsTabOpen: string;
   setStudentCommentsTabOpen: Dispatch<SetStateAction<string>>;
   editStudentModalOpened: string;
   setEditStudentModalOpened: Dispatch<SetStateAction<string>>;
   index: number;
}) => {
   const { t } = useTranslation("organizer");
   const dispatch = useAppDispatch();
   const { selectedOrganization } = useSelector((state: RootState) => state.organizer);

   const [headings, setHeadings] = useState<string[]>([]);
   const [comments, setComments] = useState<any[]>([]);
   const [editingComment, setEditingComment] = useState<string>("");
   const [isEditingComment, setIsEditingComment] = useState<string>("");
   const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const actionMenuRef = useClickOutside<HTMLDivElement>(() => setIsActionMenuOpen(false));

   const [editingStudentDetails, setEditingStudentDetails] = useState({
      firstName: student?.firstName || "",
      lastName: student?.lastName || "",
      email: student?.email || "",
      username: student?.username || "",
   });

   useEffect(() => {
      setEditingStudentDetails({
         firstName: student?.firstName || "",
         lastName: student?.lastName || "",
         email: student?.email || "",
         username: student?.username || "",
      });
   }, [student?.firstName, student?.lastName, student?.email, student?.username]);

   const [studentProgress, setStudentProgress] = useState<IChildTopics>({ current: { title: "", level: 0, progress: 0 }, topic: [] });
   const [isProgressLoading, setIsProgressLoading] = useState(false);

   const calculateAge = (dob: string): number => {
      if (!dob) return 0;
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
         age--;
      }
      return age;
   };

    const fetchStudentProgress = async (studentId: string) => {
       setIsProgressLoading(true);
       try {
          const age = calculateAge(student?.dob || "");
          const thunk = age < 14 ? getStudentOrganizationProgress : getStudentOrganizationLineProgress;
          const result = await dispatch(thunk(studentId) as any);
          if (result?.payload) {
             setStudentProgress({
                current: { title: "", level: 0, progress: 0 },
                topic: Array.isArray(result.payload) ? result.payload : result.payload?.topic || [],
             });
          }
       } catch (err) {
          console.error(err);
       } finally {
          setIsProgressLoading(false);
       }
    };

   const handleToggleDropdown = (id: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const isOpening = !headings.includes(id);
      if (isOpening) {
         setHeadings((prev) => [...prev, id]);
         if (studentProgress.topic.length === 0) fetchStudentProgress(id);
      } else {
         setHeadings((prev) => prev.filter((h) => h !== id));
      }
   };

   // Actions
   const addStudentComment = async (event: FormEvent<HTMLFormElement>, id: string) => {
      event.preventDefault();
      if (comment) {
         await dispatch(addComment({ studentId: id, text: comment }));
         setStudentCommentOpen("");
         setComment("");
      }
   };

   const handleEditSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await dispatch(editOrganizationStudent({ id: student.id, ...editingStudentDetails }));
      // Refresh organization users list
      if (selectedOrganization?.id) {
         await dispatch(getStudentOrganizationUsers(selectedOrganization.id));
      }
      setEditStudentModalOpened("");
   };

   const handleDeleteStudent = async () => {
      await dispatch(deleteOrganizationStudent(student.id as string));
      setIsDeleteModalOpen(false);
      setIsActionMenuOpen(false);
      if (selectedOrganization?.id) {
         await dispatch(getStudentOrganizationUsers(selectedOrganization.id));
      }
   };

   const getStudentComment = async (id: string) => {
      const result = await dispatch(getComment(id));
      if (result?.payload) {
         setComments(result.payload);
      }
   };

   const updateStudentComment = async (commentId: string, text: string) => {
      setIsEditingComment("");
      await dispatch(editComment({ studentId: student.id as string, commentId, text }));
      getStudentComment(student.id as string);
   };

   const deleteStudentComment = async (commentId: string) => {
      await dispatch(deleteComment({ studentId: student.id as string, commentId }));
      getStudentComment(student.id as string);
   };

   return (
      <div className="bg-[#fff] shadow-lg mb-4 rounded-md" data-testid={`single-student`}>
         {/* EDIT MODAL */}
         {editStudentModalOpened === student.id && (
            <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
               <div className="w-[90vw] max-w-[400px] rounded-lg bg-white p-6 shadow-xl">
                  <header className="mb-4 flex items-center justify-between border-b pb-2">
                     <h1 className="font-bold text-mainColor">{t("editStudentDetails")}</h1>
                     <FaTimes className="cursor-pointer text-gray-500 hover:text-red-600" onClick={() => setEditStudentModalOpened("")} />
                  </header>
                  <form className="flex flex-col gap-y-3" onSubmit={handleEditSubmit}>
                     <input className={styles.input} placeholder="First Name" value={editingStudentDetails.firstName} onChange={(e) => setEditingStudentDetails({...editingStudentDetails, firstName: e.target.value})} required />
                     <input className={styles.input} placeholder="Last Name" value={editingStudentDetails.lastName} onChange={(e) => setEditingStudentDetails({...editingStudentDetails, lastName: e.target.value})} required />
                     <input className={styles.input} placeholder="Username" value={editingStudentDetails.username} onChange={(e) => setEditingStudentDetails({...editingStudentDetails, username: e.target.value})} required />
                     <input className={styles.input} placeholder="Email" value={editingStudentDetails.email} onChange={(e) => setEditingStudentDetails({...editingStudentDetails, email: e.target.value})} required />
                     <button type="submit" className="mt-2 w-full rounded-md bg-mainColor py-3 text-white font-bold hover:opacity-90">{t("editStudentDetailsBtn")}</button>
                  </form>
               </div>
            </section>
         )}

         {/* DELETE CONFIRMATION MODAL */}
         {isDeleteModalOpen && (
            <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
               <div className="w-[90vw] max-w-[400px] rounded-lg bg-white p-6 shadow-xl">
                  <header className="mb-4 flex items-center justify-between border-b pb-2">
                     <h1 className="font-bold text-mainColor">{t("deleteStudent")}</h1>
                     <FaTimes className="cursor-pointer text-gray-500 hover:text-red-600" onClick={() => setIsDeleteModalOpen(false)} />
                  </header>
                  <p className="mb-6 text-sm text-gray-600">
                     {t("confirmDeleteStudent")} {student.firstName} {student.lastName}?
                  </p>
                  <div className="flex justify-end gap-3">
                     <button className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsDeleteModalOpen(false)}>{t("cancel")}</button>
                     <button className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:opacity-90" onClick={handleDeleteStudent}>{t("delete")}</button>
                  </div>
               </div>
            </section>
         )}

         {/* VIEW COMMENTS MODAL */}
         {studentCommentsTabOpen === student.firstName + student.email && (
            <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
               <div className="w-[90vw] max-w-[450px] rounded-lg bg-white p-6 shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-bold">{t("commentsOnPerformance", { name: `${student.firstName} ${student.lastName}` })}</h2>
                     <FaTimes className="cursor-pointer" onClick={() => setStudentCommentsTabOpen("")} />
                  </div>
                  <div className="max-h-[300px] overflow-y-auto space-y-3">
                     {comments?.length === 0 ? <p className="text-center py-4">{t("noCommentAdded")}</p> : 
                        comments.map((c: any, i: number) => (
                           <div key={i} className="bg-gray-50 p-3 rounded">
                              {isEditingComment === c.id ? (
                                 <form
                                    className="flex items-center gap-2"
                                    onSubmit={(e) => {
                                       e.preventDefault();
                                       if (editingComment) updateStudentComment(c.id, editingComment);
                                    }}
                                 >
                                    <input
                                       type="text"
                                       className="flex-1 border p-2 rounded text-sm outline-none"
                                       value={editingComment}
                                       onChange={(e) => setEditingComment(e.target.value)}
                                    />
                                    <button type="submit" className="bg-mainColor text-white p-2 rounded text-sm"><FaSave /></button>
                                    <FaTimes className="cursor-pointer text-gray-500" onClick={() => { setIsEditingComment(""); setEditingComment(""); }} />
                                 </form>
                              ) : (
                                 <div className="flex justify-between items-center gap-2">
                                    <p className="text-sm flex-1">{c.text}</p>
                                    <div className="flex gap-2">
                                       <FaEdit className="text-blue-500 cursor-pointer" onClick={() => { setEditingComment(c.text); setIsEditingComment(c.id); }} />
                                       <FaTrash className="text-red-500 cursor-pointer" onClick={() => deleteStudentComment(c.id)} />
                                    </div>
                                 </div>
                              )}
                           </div>
                        ))
                     }
                  </div>
                  <button className="w-full mt-6 bg-mainColor text-white py-2 rounded" onClick={() => setStudentCommentsTabOpen("")}>{t("close")}</button>
               </div>
            </section>
         )}

         <div className={styles.cardHeader}>
            {/* COMMENT INPUT FORM (Triggered by Icon) */}
            {studentCommentOpen === student.firstName + student.email && (
               <form onSubmit={(e) => addStudentComment(e, student.id as string)} className="absolute right-[100px] top-4 z-10 flex shadow-lg border rounded-md overflow-hidden bg-white">
                  <input type="text" className="px-3 py-2 outline-none w-48 text-sm" placeholder={t("max100Characters")} value={comment} onChange={(e) => setComment(e.target.value)} />
                  <button type="submit" className="bg-mainColor px-3 text-white"><BiEdit /></button>
               </form>
            )}

            <div className="flex items-center">
               <div className={styles.cardHeaderName}>
                  <div className="flex w-[140px] border-r pr-2">
                     <Link href={`/organizers/student/${selectedOrganization?.id}/users/students/${student.id}`}>
                        <p className="text-sm font-medium truncate hover:underline cursor-pointer">{student.firstName} {student.lastName.charAt(0)}.</p>
                     </Link>
                  </div>
                  <span className="text-[17px] cursor-pointer ml-3 p-1 hover:bg-gray-100 rounded" onClick={(e) => handleToggleDropdown(student.id as string, e)}>
                     {headings.includes(student.id as string) ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
               </div>
            </div>

            <span className="ml-4 flex-1 cursor-pointer underline text-sm text-blue-600 hover:text-blue-800" onClick={() => setEditStudentModalOpened(student.id as string)}>
               {t("editStudentsDetailsLink")}
            </span>

            <div className={styles.actions}>
               <span onClick={() => studentCommentOpen === student.firstName + student.email ? setStudentCommentOpen("") : setStudentCommentOpen(student.firstName + student.email)}>
                  <IoChatbubblesOutline className="cursor-pointer hover:text-mainColor" />
               </span>
               <div className="relative" ref={actionMenuRef}>
                  <HiOutlineDotsHorizontal className="cursor-pointer hover:text-mainColor" onClick={() => setIsActionMenuOpen(!isActionMenuOpen)} />
                  {isActionMenuOpen && (
                     <div className="absolute top-full right-0 z-50 w-40 rounded-md border bg-white shadow-lg py-2">
                        <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100" onClick={() => { setIsActionMenuOpen(false); setIsDeleteModalOpen(true); }}>{t("deleteStudent")}</button>
                        <button className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100" onClick={() => { setIsActionMenuOpen(false); setStudentCommentsTabOpen(student.firstName + student.email); getStudentComment(student.id as string); }}>{t("viewComments")}</button>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* EXPANDED CONTENT: Summary + Table */}
         {headings.includes(student.id as string) && (
            <div className="p-4 border-t bg-gray-50 bg-opacity-30">
               {isProgressLoading ? (
                  <div className="flex justify-center py-10"><Loader size={28} /></div>
               ) : (
                  <>
                     <div className="mb-4 flex gap-x-8 px-4 py-2 text-sm text-gray-700 font-medium">
                        <p>Email: <span className="font-normal">{student.email}</span></p>
                        <p>Username: <span className="font-normal">{student.username}</span></p>
                     </div>
                     <StudentTable student={student} details={student?.assignments as AssignmentDetails[]} progress={studentProgress} />
                  </>
               )}
            </div>
         )}
      </div>
   );
};

const styles = {
   cardHeader: "flex justify-between py-6 px-4 border-b items-center relative",
   cardHeaderName: "flex items-center min-w-[200px]",
   actions: "flex text-[22px] text-slate-500 space-x-6 items-center",
   input: "w-full border p-3 rounded-md outline-none focus:border-mainColor transition-all",
};

export default SingleOrganizationStudent;