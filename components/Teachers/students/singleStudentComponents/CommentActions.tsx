import React, { ChangeEvent } from "react";
import { useAppDispatch } from "store/hooks";
import { BiEdit } from "react-icons/bi";
import { ISingleStudent } from "types/interfaces";
import {addStudentComment as addComment,} from "store/studentSlice";

interface CommentActionsProps {
  student: ISingleStudent;
  comment: string;
  setComment: (value: string) => void;
  setStudentCommentOpen: (value: string) => void;
}

const CommentActions = ({
  student,
  comment,
  setComment,
  setStudentCommentOpen,
}: CommentActionsProps) => {
  const dispatch = useAppDispatch();

  const updateComment = (text: string): void => {
    if (text.length <= 100) {
      setComment(text);
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

  return (
    <form
      onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
                     addStudentComment(event, student.id as string);}}
                     className="z-20 scale-up absolute right-[100px] flex w-[90vw] max-w-[250px] cursor-pointer rounded-md bg-white shadow-md"
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
  );
};

export default CommentActions;