import React, { useEffect, useState } from "react";
import { ISingleStudent } from "types/interfaces";
import SingleOrganizationStudent from "./singlestudent";

const OrganizationStudents = ({ 
   commentTabsOpened, 
   students, 
}: { 
   commentTabsOpened: boolean; 
   students: ISingleStudent[];
}) => {
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
            <SingleOrganizationStudent
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

export default OrganizationStudents;

const styles = {
   container: "md:px-8 px-4 space-y-2 mt-14",
};