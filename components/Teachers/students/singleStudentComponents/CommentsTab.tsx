import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { useAppDispatch} from "store/hooks";
import { ISingleStudent } from "types/interfaces";
import { useDispatch, useSelector } from "react-redux";
import {
   addStudentComment as addComment,
  updateStudentComment as editComment,
   deleteStudentComment as deleteComment,
   getStudentComment as getComment,
 } from "store/studentSlice";

interface CommentsTabProps {
  student: ISingleStudent;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  setStudentCommentsTabOpen: Dispatch<SetStateAction<string>>;

}

const CommentsTab = ({ student, 
  setStudentCommentsTabOpen,
  comment,
  setComment
 }: CommentsTabProps) => {
  const dispatch = useAppDispatch();
  const { students, studentComments } = useSelector((state: any) => state.students);
  const [editingComment, setEditingComment] = useState<string>("");
  const [isEditingComment, setIsEditingComment] = useState<string>("");

const getStudentComment = (id: string) => {
      dispatch(getComment({ id }));
    };

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


  // Fetch comments when component mounts
  React.useEffect(() => {
    getStudentComment(student.id as string);
  }, [student.id]);

  return (
    <section className="fixed top-0 left-0 z-20 flex min-h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="scale-up comment-tab w-[90vw] max-w-[400px] rounded-md bg-white py-2 px-3 shadow-md">
        <h2 className="text-[20px] font-bold">
          Comments on {student.firstName} {student.lastName}'s performance
        </h2>
        <div
          className={`mt-3 flex h-[90vh] max-h-[230px] flex-col gap-y-2 overflow-y-scroll ${
            studentComments?.length === 0 && "items-center justify-center"
          }`}
        >
          {studentComments?.length === 0 && (
            <h1 className="text-[17px] font-bold">No comment added for this student</h1>
          )}
          {studentComments?.map((comment: any, index: number) => (
            <article key={index} className="flex items-center justify-between gap-x-2">
              {isEditingComment === comment.text + comment.date ? (
                <input
                  value={editingComment}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateEditingComment(e.target.value)}
                  type="text"
                  placeholder="Max. of 100 characters"
                  className="flex-1 rounded-md border-2 border-mainColor px-4 py-2 outline-none"
                  maxLength={100}
                />
              ) : (
                <h1 className="px-4 py-2">
                  {comment.text.length > 28 ? `${comment.text.slice(0, 28)}...` : comment.text}
                </h1>
              )}
              <div className="flex items-center gap-x-2">
                {isEditingComment === comment.text + comment.date ? (
                  <span
                    className="w-[28px] h-[28px] rounded-md text-white flex justify-center items-center text-[15px] cursor-pointer bg-green-600"
                    onClick={() => {
                      if (editingComment === "" || editingComment === comment.text) {
                        setIsEditingComment("");
                      } else {
                        updateStudentComment(comment.id as string, editingComment, student.id as string);
                      }
                    }}
                  >
                    <FaSave />
                  </span>
                ) : (
                  <span
                    className="w-[28px] h-[28px] rounded-md text-white flex justify-center items-center text-[15px] cursor-pointer bg-green-600"
                    onClick={() => {
                      setEditingComment(comment.text);
                      setIsEditingComment(comment.text + comment.date);
                    }}
                  >
                    <FaEdit />
                  </span>
                )}
                <span
                  className="w-[28px] h-[28px] rounded-md text-white flex justify-center items-center text-[15px] cursor-pointer bg-red-600"
                  onClick={() => {
                    deleteStudentComment(comment.id as string, student.id as string);
                  }}
                >
                  <FaTrash />
                </span>
              </div>
            </article>
          ))}
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
      </div>
    </section>
  );
};

export default CommentsTab;