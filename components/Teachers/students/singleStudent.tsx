import React, { useEffect, useState, ChangeEvent, SetStateAction, Dispatch } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import StudentTable from "./StudentTable";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import {
   getStudents,
   addStudentComment as addComment,
   updateStudentComment as editComment,
   deleteStudentComment as deleteComment,
   getStudentComment as getComment,
   editStudent,
} from "store/studentSlice";
import { FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import Link from "next/link";

const SingleStudent = ({
   student,
   studentCommentOpen,
   setStudentCommentOpen,
   comment,
   setComment,
   studentCommentsTabOpen,
   setStudentCommentsTabOpen,
   editStudentModalOpened,
   setEditStudentModalOpened,
   index,
}: {
   student: any;
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
   const dispatch = useDispatch();
   const [headings, setHeadings] = useState<number[]>([]);
   const { students, studentComments } = useSelector((state: any) => state.students);
   const [editingComment, setEditingComment] = useState<string>("");
   const [isEditingComment, setIsEditingComment] = useState<string>("");
   const [editingStudentDetails, setEditingStudentDetails] = useState({
      firstName: student?.firstName,
      lastName: student?.lastName,
      email: student?.email,
   });
   const updateComment = (text: string): void => {
      if (comment.length < 100) {
         setComment(text);
      }
   };
   const updateEditingComment = (text: string) => {
      if (comment.length < 100) {
         setEditingComment(text);
      }
   };
   const getStudentComment = (id: string) => {
      dispatch(getComment({ id }));
   };

   const handleStudents = (id: number) => {
      const index = headings.indexOf(id);

      if (index !== -1) {
         setHeadings((headings) => [...headings.slice(0, index), ...headings.slice(index + 1)]);
      } else {
         setHeadings((headings) => [...headings, id]);
      }
   };
   const addStudentComment = async (event: ChangeEvent<HTMLFormElement>, id: string) => {
      event.preventDefault();
      if (comment) {
         await dispatch(addComment({ id, comment }));
         setStudentCommentOpen("");
         setComment("");
      }
   };
   const updateStudentComment = async (id: string, comment: string, studentId: string) => {
      setIsEditingComment("");
      await dispatch(
         editComment({
            id,
            comment,
         })
      );
      getStudentComment(studentId);
   };

   const deleteStudentComment = async (id: string, studentId: string) => {
      await dispatch(deleteComment({ id }));
      getStudentComment(studentId);
   };

   const updateEditingDetails = async (e: ChangeEvent<HTMLInputElement>) => {
      setEditingStudentDetails((prev) => {
         return { ...prev, [e.target.name as keyof typeof prev]: e.target.value };
      });
   };

   const handleSubmittionOfEditDetails = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      await dispatch(editStudent({ id: student.id, ...editingStudentDetails }));
      await dispatch(getStudents());
      setEditStudentModalOpened("");
   };

   return (
      <div className="bg-[#fff] shadow-lg" data-testid={`single-student`}>
         {editStudentModalOpened === student.id && (
            <section className="fixed top-0 left-0 z-20 flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.4)]">
               <div className="mx-auto w-[90vw] max-w-[350px] rounded-md bg-white p-6 shadow-md">
                  <header className="mb-3 flex items-center justify-between">
                     <h1 className="font-bold text-mainColor">Edit {"Student's"} Details</h1>
                     <span
                        className="text-[18px] font-bold text-[darkRed]"
                        onClick={() => {
                           setEditStudentModalOpened("");
                        }}
                     >
                        <FaTimes />
                     </span>
                  </header>
                  <form className="flex flex-col gap-y-2" onSubmit={handleSubmittionOfEditDetails}>
                     <input
                        value={editingStudentDetails.firstName}
                        type="text"
                        className={styles.input}
                        name="firstName"
                        required
                        placeholder="Enter Firstname*"
                        onChange={updateEditingDetails}
                     />
                     <input
                        value={editingStudentDetails.lastName}
                        type="text"
                        className={styles.input}
                        name="lastName"
                        required
                        placeholder="Enter Lastname*"
                        onChange={updateEditingDetails}
                     />

                     <button type="submit" className="mt-3 w-full rounded-md bg-mainColor p-3 text-white active:scale-[0.98]">
                        Edit Student Details
                     </button>
                  </form>
               </div>
            </section>
         )}
         <div className={styles.cardHeader}>
            {!studentCommentsTabOpen && studentCommentOpen === student.firstName + student.email && (
               <form
                  onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
                     addStudentComment(event, student.id);
                  }}
                  className="z-2 scale-up absolute right-[100px] bottom-[20%] flex w-[90vw] max-w-[250px] cursor-pointer rounded-md bg-white shadow-md"
               >
                  <input
                     type="text"
                     className="flex-[0.8] rounded-l-md border-2 border-mainColor px-2 py-2 text-black outline-none"
                     placeholder={`Max. of 100 characters`}
                     value={comment}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => updateComment(e.target.value)}
                  />
                  <button type="submit" className="flex flex-[0.2] items-center justify-center rounded-r-md bg-mainColor text-[20px] text-white">
                     <BiEdit />
                  </button>
               </form>
            )}
            {!studentCommentOpen && studentCommentsTabOpen === student.firstName + student.email && (
               <section className="fixed top-0 left-0 z-20 flex min-h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.5)]">
                  <form className="scale-up comment-tab w-[90vw] max-w-[400px] rounded-md bg-white py-2 px-3 shadow-md">
                     <h2 className="text-[20px] font-bold">
                        Comments on {student.firstName} {student.lastName}
                        {"'"}s performance
                     </h2>
                     <div
                        className={`mt-3 flex h-[90vh] max-h-[230px] flex-col gap-y-2 overflow-y-scroll ${
                           studentComments?.length === 0 && "items-center justify-center"
                        }`}
                     >
                        {studentComments?.length === 0 && <h1 className="text-[17px] font-bold">No comment added for this student</h1>}
                        {studentComments?.map((comment: any, index: number) => {
                           return (
                              <article key={index} className="flex items-center justify-between gap-x-2">
                                 {isEditingComment === comment.text + comment.date ? (
                                    <input
                                       onSubmit={(e) => e.preventDefault()}
                                       value={editingComment}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => updateEditingComment(e.target.value)}
                                       type="text"
                                       placeholder="Max. of 100 characters"
                                       className="flex-1 rounded-md border-2 border-mainColor px-4 py-2 outline-none"
                                    />
                                 ) : (
                                    <h1 className="px-4 py-2">{comment.text.length > 28 ? `${comment.text.slice(0, 28)}...` : comment.text}</h1>
                                 )}
                                 <div className="flex items-center gap-x-2">
                                    {isEditingComment === comment.text + comment.date ? (
                                       <span
                                          className={`${styles.commentIcons} bg-green-600`}
                                          onClick={() => {
                                             if (editingComment === comment.text && editingComment === "") {
                                                setIsEditingComment("");
                                             } else {
                                                updateStudentComment(comment.id as string, editingComment, student.id);
                                             }
                                          }}
                                       >
                                          <FaSave />
                                       </span>
                                    ) : (
                                       <span
                                          className={`${styles.commentIcons} bg-green-600`}
                                          onClick={() => {
                                             setEditingComment(comment.text);
                                             setIsEditingComment(comment.text + comment.date);
                                          }}
                                       >
                                          <FaEdit />
                                       </span>
                                    )}
                                    <span
                                       className={`${styles.commentIcons} bg-red-600`}
                                       onClick={() => {
                                          deleteStudentComment(comment.id as string, student.id);
                                       }}
                                    >
                                       <FaTrash />
                                    </span>
                                 </div>
                              </article>
                           );
                        })}
                     </div>

                     <div className="my-4 flex justify-end">
                        <button
                           className="w-[150px] rounded-full bg-mainColor py-3 text-white"
                           onClick={() => {
                              setStudentCommentsTabOpen("");
                           }}
                        >
                           Close
                        </button>
                     </div>
                  </form>
               </section>
            )}
            <div className="flex items-center">
               <div className={styles.cardHeaderName} onClick={() => handleStudents(student.id)}>
                  <div className="flex w-[128px] flex-col gap-y-2 overflow-hidden text-ellipsis">
                     <Link href={`/teachers/students/${student.id}`}>
                        <p className={styles.studentName + " max-w-fit hover:underline"}>{`${student.firstName} ${student.lastName}`}</p>
                     </Link>
                  </div>
                  <span className="text-[17px]" data-testid="chevron">
                     {headings.includes(student.id) ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
               </div>
               <div className="hidden px-2 text-[12px] md:block">
                  <span className={(student.active ? "bg-green-500" : "border-2") + styles.active}></span>
                  {student.active ? `Active in ${student.active}` : "Inactive"}
               </div>
            </div>
            <span
               className="ml-4 flex-1 cursor-pointer underline"
               onClick={() => {
                  setEditStudentModalOpened(student.id);
               }}
            >
               <span className="hidden md:block">Edit {"student's"} details</span>
               <span className="block md:hidden">Edit</span>
            </span>
            <div className={styles.actions}>
               <span
                  onClick={() => {
                     setStudentCommentsTabOpen("");
                     studentCommentOpen === student.firstName + student.email
                        ? setStudentCommentOpen("")
                        : setStudentCommentOpen(student.firstName + student.email);
                     setComment("");
                  }}
               >
                  <IoChatbubblesOutline className={styles.pointer} />
               </span>
               <span
                  onClick={() => {
                     setStudentCommentOpen("");
                     if (studentCommentsTabOpen === student.firstName + student.email) {
                        setStudentCommentsTabOpen("");
                     } else {
                        setStudentCommentsTabOpen(student.firstName + student.email);
                        getStudentComment(student.id);
                     }
                  }}
               >
                  <HiOutlineDotsHorizontal className={styles.pointer} />
               </span>{" "}
            </div>
         </div>
         {students?.assignments?.length === 0 ? (
            <p className="grid h-full w-full place-content-center">
               <span>No lesson available</span>
            </p>
         ) : (
            <>{headings.includes(student?.id) && <StudentTable student={student} details={student?.assignments} />}</>
         )}
      </div>
   );
};

const styles = {
   cardHeader: "flex justify-between py-6 px-2 sm:px-6 border-b items-center relative overflow-x-scroll",
   cardHeaderName: "cursor-pointer min-w-28 sm:min-w-40 justify-between px-2 border-r flex space-x-3 items-center",
   studentName: "text-sm font-medium truncate w-full",
   active: " rounded-[50%] inline-block w-[8px] h-[8px] mr-2",
   actions: "flex text-[20px] text-slate-500 space-x-5",
   pointer: "cursor-pointer",
   commentIcons: "w-[28px] h-[28px] rounded-md text-white flex justify-center items-center text-[15px] cursor-pointer",
   input: "w-full border focus:border-mainColor p-3 rounded-md outline-none",
};

export default SingleStudent;
