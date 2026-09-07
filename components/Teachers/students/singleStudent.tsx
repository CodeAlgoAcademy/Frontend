import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import StudentTable from "./StudentTable";
import { AssignmentDetails, ISingleStudent } from "types/interfaces";
import { useAppDispatch } from "store/hooks";
import { fetchStudentBlockGameProgress, fetchStudentLineProgressNew } from "store/teacherStudentSlice";
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
   const { t } = useTranslation("teacher");
   const dispatch = useAppDispatch();
   const { id: classId } = useSelector((state: any) => state.currentClass);
   const [headings, setHeadings] = useState<number[]>([]);
   const { students } = useSelector((state: any) => state.students);
   const [studentProgress, setStudentProgress] = useState<any>({
      current: { title: "", level: 0, progress: 0 },
      topic: [],
   });

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

   const getStudentProgress = async () => {
      if (!student?.student_id || !classId) return;

      try {
         const age = calculateAge(student?.dob || "");
         const isPythonStudent = age >= 14;

         const action = isPythonStudent
            ? fetchStudentLineProgressNew({ classId: String(classId), studentId: String(student.student_id) })
            : fetchStudentBlockGameProgress({ classId, studentId: student.student_id });

         const data = await dispatch(action).unwrap();

         if (data) {
            setStudentProgress({
               current: { title: "", level: 0, progress: 0 },
               topic: Array.isArray(data) ? data : data?.topic || [],
            });
         }
      } catch (error) {
         console.error("Failed to fetch student progress:", error);
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
               <span>{t("noLessonAvailable")}</span>
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
