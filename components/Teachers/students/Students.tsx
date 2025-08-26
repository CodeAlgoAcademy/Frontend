import React, { useEffect, useState } from "react";
import SingleStudent from "./singleStudent";
import { ISingleStudent } from "types/interfaces";

const Students = ({ commentTabsOpened, students }: { commentTabsOpened: boolean; students: ISingleStudent[] }) => {
   const [studentCommentOpen, setStudentCommentOpen] = useState<string>("");
   const [comment, setComment] = useState<string>("");
   const [studentCommentsTabOpen, setStudentCommentsTabOpen] = useState<string>("");
   const [editStudentModalOpened, setEditStudentModalOpened] = useState<string>("");
   
   useEffect(() => {
      if (!commentTabsOpened) {
         setStudentCommentOpen("");
         setStudentCommentsTabOpen("");
      }
   }, [commentTabsOpened]);

   return (
      <div className={styles.container}>
         {students?.map((student: ISingleStudent, index: number) => (
            <SingleStudent
               studentCommentOpen={studentCommentOpen}
               setStudentCommentOpen={setStudentCommentOpen}
               comment={comment}
               setComment={setComment}
               key={student.id}
               student={student}
               setStudentCommentsTabOpen={setStudentCommentsTabOpen}
               studentCommentsTabOpen={studentCommentsTabOpen}
               editStudentModalOpened={editStudentModalOpened}
               setEditStudentModalOpened={setEditStudentModalOpened}
               index={index}
            />
         ))}
      </div>
   );
};

export default Students;

const styles = {
   container: "md:px-8 px-4 space-y-2 mt-14",
   cardHeader: "flex justify-between py-6 px-2 sm:px-6 border-b items-center relative",
   cardHeaderName: "cursor-pointer w-28 sm:w-40 justify-between px-2 border-r flex space-x-3 items-center",
   studentName: "text-sm font-medium truncate w-full",
   active: " rounded-[50%] inline-block w-[8px] h-[8px] mr-2",
   actions: "flex text-[20px] text-slate-500 space-x-5",
   pointer: "cursor-pointer",
   commentIcons: "w-[28px] h-[28px] rounded-md text-white flex justify-center items-center text-[15px]",
};
