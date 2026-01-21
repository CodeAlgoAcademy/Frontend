import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudentTable from "./StudentTable";
import { AssignmentDetails, ISingleStudent } from "types/interfaces";
import { useAppDispatch } from "store/hooks";
import { fetchStudentBlockGameProgress } from "store/teacherStudentSlice";
import EditStudentModal from "./singleStudentComponents/EditStudentModal";
import StudentHeader from "./singleStudentComponents/StudentHeader";
import CommentsTab from "./singleStudentComponents/CommentsTab";
import CommentActions from "./singleStudentComponents/CommentActions";

interface SingleStudentProps {
   student: ISingleStudent;
   studentCommentOpen: string;
   setStudentCommentOpen: Dispatch<SetStateAction<string>>;
   comment: string;
   setComment: Dispatch<SetStateAction<string>>;
   studentCommentsTabOpen: string;
   setStudentCommentsTabOpen: Dispatch<SetStateAction<string>>;
   editStudentModalOpened: string;
   setEditStudentModalOpened: (value: string) => void;
   index: number;
}

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
}: SingleStudentProps) => {
   const dispatch = useAppDispatch();
   const { id: classId } = useSelector((state: any) => state.currentClass);
   const [headings, setHeadings] = useState<number[]>([]);
   const { students } = useSelector((state: any) => state.students);
   const [studentProgress, setStudentProgress] = useState<any>({
      current: { title: "", level: 0, progress: 0 },
      topic: [],
   });

   const getStudentProgress = async () => {
      if (!student?.student_id || !classId) return;

      try {
         const data = await dispatch(
            fetchStudentBlockGameProgress({
               classId,
               studentId: student.student_id,
            })
         ).unwrap();

         if (data) {
            setStudentProgress({
               current: { title: "", level: 0, progress: 0 },
               topic: data,
            });
         }
      } catch (error) {
         console.error("Failed to fetch blockgame progress:", error);
      }
   };

   const handleStudents = (id: number) => {
      setHeadings((prev) => (prev.includes(id) ? prev.filter((headingId) => headingId !== id) : [...prev, id]));
   };

   useEffect(() => {
      getStudentProgress();
   }, [student?.student_id, classId]);

   return (
      <div className="bg-[#fff] shadow-lg" data-testid={`single-student`}>
         {/* Modals */}
         {editStudentModalOpened === student.id && <EditStudentModal student={student} setEditStudentModalOpened={setEditStudentModalOpened} />}


<div className="relative">
  {studentCommentOpen === student.firstName + student.email && (
    <CommentActions 
      student={student} 
      comment={comment} 
      setComment={setComment} 
      setStudentCommentOpen={setStudentCommentOpen} 
    />
  )}
</div>

         {studentCommentsTabOpen === student.firstName + student.email && (
            <CommentsTab comment={comment} student={student} setStudentCommentsTabOpen={setStudentCommentsTabOpen} setComment={setComment} />
         )}

         {/* Header */}
         <StudentHeader
            student={student}
            headings={headings}
            handleStudents={handleStudents}
            setEditStudentModalOpened={setEditStudentModalOpened}
            setStudentCommentOpen={setStudentCommentOpen}
            setStudentCommentsTabOpen={setStudentCommentsTabOpen}
            studentCommentOpen={studentCommentOpen}
            studentCommentsTabOpen={studentCommentsTabOpen}
         />

         {/* Student Table */}
         {students?.assignments?.length === 0 ? (
            <p className="grid h-full w-full place-content-center">
               <span>No lesson available</span>
            </p>
         ) : (
            headings.includes(parseInt(student?.id as string)) && (
               <StudentTable student={student} details={student?.assignments as AssignmentDetails[]} progress={studentProgress} />
            )
         )}
      </div>
   );
};

export default SingleStudent;