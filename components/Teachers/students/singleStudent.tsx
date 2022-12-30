import React, { useEffect, useState, ChangeEvent, SetStateAction } from "react";
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
} from "store/studentSlice";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

const SingleStudent = ({
  student,
  studentCommentOpen,
  setStudentCommentOpen,
  comment,
  setComment,
  studentCommentsTabOpen,
  setStudentCommentsTabOpen,
}: {
  student: any;
  studentCommentOpen: string;
  setStudentCommentOpen: any;
  comment: string;
  setComment: any;
  studentCommentsTabOpen: string;
  setStudentCommentsTabOpen: any;
}) => {
  const dispatch = useDispatch();
  const [headings, setHeadings] = useState<number[]>([]);
  const { students, studentComments } = useSelector(
    (state: any) => state.students
  );
  const [editingComment, setEditingComment] = useState<string>("");
  const [isEditingComment, setIsEditingComment] = useState<string>("");

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
      setHeadings((headings) => [
        ...headings.slice(0, index),
        ...headings.slice(index + 1),
      ]);
    } else {
      setHeadings((headings) => [...headings, id]);
    }
  };
  const addStudentComment = async (
    event: ChangeEvent<HTMLFormElement>,
    id: string
  ) => {
    event.preventDefault();
    if (comment) {
      await dispatch(addComment({ id, comment }));
      setStudentCommentOpen("");
      setComment("");
    }
  };

  const updateStudentComment = async (
    id: string,
    comment: string,
    studentId: string
  ) => {
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

  return (
    <div key={student.id} className="bg-[#fff] shadow-lg">
      <div className={styles.cardHeader}>
        {!studentCommentsTabOpen &&
          studentCommentOpen === student.firstName + student.email && (
            <form
              onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
                addStudentComment(event, student.id);
              }}
              className="absolute right-[100px] bottom-[20%] w-[90vw] max-w-[250px] cursor-pointer rounded-md bg-white shadow-md z-2 flex scale-up"
            >
              <input
                type="text"
                className="flex-[0.8] px-2 py-2 border-2 border-mainPurple outline-none rounded-l-md text-black"
                placeholder={`Max. of 100 characters`}
                value={comment}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateComment(e.target.value)
                }
              />
              <button
                type="submit"
                className="bg-mainPurple text-white flex-[0.2] rounded-r-md text-[20px] flex justify-center items-center"
              >
                <BiEdit />
              </button>
            </form>
          )}
        {!studentCommentOpen &&
          studentCommentsTabOpen === student.firstName + student.email && (
            <section className="fixed top-0 left-0 w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-20">
              <form className="w-[90vw] max-w-[400px] rounded-md bg-white shadow-md scale-up py-2 px-3 comment-tab">
                <h2 className="font-bold text-[20px]">
                  Comments on {student.firstName} {student.lastName}'s
                  performance
                </h2>
                <div
                  className={`flex flex-col gap-y-2 mt-3 h-[90vh] max-h-[230px] overflow-y-scroll ${
                    studentComments?.length === 0 &&
                    "justify-center items-center"
                  }`}
                >
                  {studentComments?.length === 0 && (
                    <h1 className="text-[17px] font-bold">
                      No comment added for this student
                    </h1>
                  )}
                  {studentComments?.map((comment: any, index: number) => {
                    return (
                      <article
                        key={index}
                        className="flex justify-between items-center gap-x-2"
                      >
                        {isEditingComment === comment.text + comment.date ? (
                          <input
                            onSubmit={(e) => e.preventDefault()}
                            value={editingComment}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              updateEditingComment(e.target.value)
                            }
                            type="text"
                            placeholder="Max. of 100 characters"
                            className="flex-1 px-4 py-2 rounded-md border-2 border-mainPurple outline-none"
                          />
                        ) : (
                          <h1 className="px-4 py-2">
                            {comment.text.length > 28
                              ? `${comment.text.slice(0, 28)}...`
                              : comment.text}
                          </h1>
                        )}
                        <div className="flex items-center gap-x-2">
                          {isEditingComment === comment.text + comment.date ? (
                            <span
                              className={`${styles.commentIcons} bg-green-600`}
                              onClick={() => {
                                if (
                                  editingComment === comment.text &&
                                  editingComment === ""
                                ) {
                                  setIsEditingComment("");
                                } else {
                                  updateStudentComment(
                                    comment.id as string,
                                    editingComment,
                                    student.id
                                  );
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
                                setIsEditingComment(
                                  comment.text + comment.date
                                );
                              }}
                            >
                              <FaEdit />
                            </span>
                          )}
                          <span
                            className={`${styles.commentIcons} bg-red-600`}
                            onClick={() => {
                              deleteStudentComment(
                                comment.id as string,
                                student.id
                              );
                            }}
                          >
                            <FaTrash />
                          </span>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="flex justify-end my-4">
                  <button
                    className="w-[150px] py-3 rounded-full text-white bg-mainPurple"
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
          <div
            className={styles.cardHeaderName}
            onClick={() => handleStudents(student.id)}
          >
            <p
              className={styles.studentName}
            >{`${student.firstName} ${student.lastName}`}</p>
            {headings.includes(student.id) ? (
              <IoIosArrowUp />
            ) : (
              <IoIosArrowDown />
            )}
          </div>
          <div className="text-[12px] px-2">
            <span
              className={
                (student.active ? "bg-green-500" : "border-2") + styles.active
              }
            ></span>
            {student.active ? `Active in ${student.active}` : "Inactive"}
          </div>
        </div>

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
              if (
                studentCommentsTabOpen ===
                student.firstName + student.email
              ) {
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

      {students?.courses?.length === 0 ? (
        <p className="w-full h-full grid place-content-center">
          <span>No lesson available</span>
        </p>
      ) : (
        <>
          {headings.includes(student?.id) && (
            <StudentTable details={student?.courses} />
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  cardHeader:
    "flex justify-between py-6 px-2 sm:px-6 border-b items-center relative",
  cardHeaderName:
    "cursor-pointer w-28 sm:w-40 justify-between px-2 border-r flex space-x-3 items-center",
  studentName: "text-sm font-medium truncate w-full",
  active: " rounded-[50%] inline-block w-[8px] h-[8px] mr-2",
  actions: "flex text-[20px] text-slate-500 space-x-5",
  pointer: "cursor-pointer",
  commentIcons:
    "w-[28px] h-[28px] rounded-md text-white flex justify-center items-center text-[15px] cursor-pointer",
};

export default SingleStudent;
