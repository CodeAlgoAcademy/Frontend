import React,{useEffect,useState,ChangeEvent,SetStateAction,Dispatch} from 'react';
import {IoIosArrowDown,IoIosArrowUp} from 'react-icons/io';
import {IoChatbubblesOutline} from 'react-icons/io5';
import {HiOutlineDotsHorizontal} from 'react-icons/hi';
import StudentTable from './StudentTable';
import {useDispatch,useSelector} from 'react-redux';
import {BiEdit} from 'react-icons/bi';
import {
  getStudents,
  addStudentComment as addComment,
  updateStudentComment as editComment,
  deleteStudentComment as deleteComment,
  getStudentComment as getComment,
  editStudent,
} from 'store/studentSlice';
import {FaEdit,FaSave,FaTimes,FaTrash} from 'react-icons/fa';

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
}) => {
  const dispatch = useDispatch();
  const [headings,setHeadings] = useState<number[]>([]);
  const {students,studentComments} = useSelector((state: any) => state.students);
  const [editingComment,setEditingComment] = useState<string>('');
  const [isEditingComment,setIsEditingComment] = useState<string>('');
  const [editingStudentDetails,setEditingStudentDetails] = useState({
    firstName: student?.firstName,
    lastName: student?.lastName,
    email: student?.email,
  });
  const updateComment = (text: string): void => {
    if(comment.length < 100) {
      setComment(text);
    }
  };
  const updateEditingComment = (text: string) => {
    if(comment.length < 100) {
      setEditingComment(text);
    }
  };
  const getStudentComment = (id: string) => {
    dispatch(getComment({id}));
  };

  const handleStudents = (id: number) => {
    const index = headings.indexOf(id);

    if(index !== -1) {
      setHeadings((headings) => [...headings.slice(0,index),...headings.slice(index + 1)]);
    } else {
      setHeadings((headings) => [...headings,id]);
    }
  };
  const addStudentComment = async (event: ChangeEvent<HTMLFormElement>,id: string) => {
    event.preventDefault();
    if(comment) {
      await dispatch(addComment({id,comment}));
      setStudentCommentOpen('');
      setComment('');
    }
  };
  const updateStudentComment = async (id: string,comment: string,studentId: string) => {
    setIsEditingComment('');
    await dispatch(
      editComment({
        id,
        comment,
      }),
    );
    getStudentComment(studentId);
  };

  const deleteStudentComment = async (id: string,studentId: string) => {
    await dispatch(deleteComment({id}));
    getStudentComment(studentId);
  };

  const updateEditingDetails = async (e: ChangeEvent<HTMLInputElement>) => {
    setEditingStudentDetails((prev) => {
      return {...prev,[e.target.name as keyof typeof prev]: e.target.value};
    });
  };

  const handleSubmittionOfEditDetails = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(editStudent({id: student.id,...editingStudentDetails}));
    await dispatch(getStudents());
    setEditStudentModalOpened('');
  };

  return (
    <div className="bg-[#fff] shadow-lg">
      {editStudentModalOpened === student.id && (
        <section className="fixed top-0 left-0 bg-[rgba(0,0,0,0.4)] z-20 w-full h-screen flex justify-center items-center">
          <div className="w-[90vw] max-w-[350px] mx-auto p-6 bg-white shadow-md rounded-md">
            <header className="mb-3 flex justify-between items-center">
              <h1 className="font-bold text-[#2073fa]">Edit {"Student's"} Details</h1>
              <span
                className="text-[18px] text-[darkRed] font-bold"
                onClick={() => {
                  setEditStudentModalOpened('');
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
              <input
                value={editingStudentDetails.email}
                type="email"
                className={styles.input}
                name="email"
                required
                placeholder="Enter email*"
                onChange={updateEditingDetails}
              />
              <button
                type="submit"
                className="rounded-md text-white w-full mt-3 p-3 bg-[#2073fa] active:scale-[0.98]"
              >
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
              addStudentComment(event,student.id);
            }}
            className="absolute right-[100px] bottom-[20%] w-[90vw] max-w-[250px] cursor-pointer rounded-md bg-white shadow-md z-2 flex scale-up"
          >
            <input
              type="text"
              className="flex-[0.8] px-2 py-2 border-2 border-[#2073fa] outline-none rounded-l-md text-black"
              placeholder={`Max. of 100 characters`}
              value={comment}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#2073fa] text-white flex-[0.2] rounded-r-md text-[20px] flex justify-center items-center"
            >
              <BiEdit />
            </button>
          </form>
        )}
        {!studentCommentOpen && studentCommentsTabOpen === student.firstName + student.email && (
          <section className="fixed top-0 left-0 w-full min-h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-20">
            <form className="w-[90vw] max-w-[400px] rounded-md bg-white shadow-md scale-up py-2 px-3 comment-tab">
              <h2 className="font-bold text-[20px]">
                Comments on {student.firstName} {student.lastName}
                {"'"}s performance
              </h2>
              <div
                className={`flex flex-col gap-y-2 mt-3 h-[90vh] max-h-[230px] overflow-y-scroll ${studentComments?.length === 0 && 'justify-center items-center'
                  }`}
              >
                {studentComments?.length === 0 && (
                  <h1 className="text-[17px] font-bold">No comment added for this student</h1>
                )}
                {studentComments?.map((comment: any,index: number) => {
                  return (
                    <article key={index} className="flex justify-between items-center gap-x-2">
                      {isEditingComment === comment.text + comment.date ? (
                        <input
                          onSubmit={(e) => e.preventDefault()}
                          value={editingComment}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateEditingComment(e.target.value)
                          }
                          type="text"
                          placeholder="Max. of 100 characters"
                          className="flex-1 px-4 py-2 rounded-md border-2 border-[#2073fa] outline-none"
                        />
                      ) : (
                        <h1 className="px-4 py-2">
                          {comment.text.length > 28
                            ? `${comment.text.slice(0,28)}...`
                            : comment.text}
                        </h1>
                      )}
                      <div className="flex items-center gap-x-2">
                        {isEditingComment === comment.text + comment.date ? (
                          <span
                            className={`${styles.commentIcons} bg-green-600`}
                            onClick={() => {
                              if(editingComment === comment.text && editingComment === '') {
                                setIsEditingComment('');
                              } else {
                                updateStudentComment(
                                  comment.id as string,
                                  editingComment,
                                  student.id,
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
                              setIsEditingComment(comment.text + comment.date);
                            }}
                          >
                            <FaEdit />
                          </span>
                        )}
                        <span
                          className={`${styles.commentIcons} bg-red-600`}
                          onClick={() => {
                            deleteStudentComment(comment.id as string,student.id);
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
                  className="w-[150px] py-3 rounded-full text-white bg-[#2073fa]"
                  onClick={() => {
                    setStudentCommentsTabOpen('');
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
            <div className="flex flex-col gap-y-2 w-[128px] text-ellipsis overflow-hidden">
              <p className={styles.studentName}>{`${student.firstName} ${student.lastName}`}</p>
            </div>
            <span className="text-[17px]">
              {headings.includes(student.id) ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>
          <div className="text-[12px] px-2 md:block hidden">
            <span className={(student.active ? 'bg-green-500' : 'border-2') + styles.active}></span>
            {student.active ? `Active in ${student.active}` : 'Inactive'}
          </div>
        </div>
        <span
          className="flex-1 ml-4 underline cursor-pointer"
          onClick={() => {
            setEditStudentModalOpened(student.id);
          }}
        >
          <span className="hidden md:block">Edit {"student's"} details</span>
          <span className="md:hidden block">Edit</span>
        </span>
        <div className={styles.actions}>
          <span
            onClick={() => {
              setStudentCommentsTabOpen('');
              studentCommentOpen === student.firstName + student.email
                ? setStudentCommentOpen('')
                : setStudentCommentOpen(student.firstName + student.email);
              setComment('');
            }}
          >
            <IoChatbubblesOutline className={styles.pointer} />
          </span>
          <span
            onClick={() => {
              setStudentCommentOpen('');
              if(studentCommentsTabOpen === student.firstName + student.email) {
                setStudentCommentsTabOpen('');
              } else {
                setStudentCommentsTabOpen(student.firstName + student.email);
                getStudentComment(student.id);
              }
            }}
          >
            <HiOutlineDotsHorizontal className={styles.pointer} />
          </span>{' '}
        </div>
      </div>
      {students?.assignments?.length === 0 ? (
        <p className="w-full h-full grid place-content-center">
          <span>No lesson available</span>
        </p>
      ) : (
        <>
          {headings.includes(student?.id) && (
            <StudentTable student={student} details={student?.assignments} />
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  cardHeader:
    'flex justify-between py-6 px-2 sm:px-6 border-b items-center relative overflow-x-scroll',
  cardHeaderName:
    'cursor-pointer min-w-28 sm:min-w-40 justify-between px-2 border-r flex space-x-3 items-center',
  studentName: 'text-sm font-medium truncate w-full',
  active: ' rounded-[50%] inline-block w-[8px] h-[8px] mr-2',
  actions: 'flex text-[20px] text-slate-500 space-x-5',
  pointer: 'cursor-pointer',
  commentIcons:
    'w-[28px] h-[28px] rounded-md text-white flex justify-center items-center text-[15px] cursor-pointer',
  input: 'w-full border focus:border-[#2073fa] p-3 rounded-md outline-none',
};

export default SingleStudent;
