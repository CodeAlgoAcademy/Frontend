import React, { useEffect, useState, ChangeEvent } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoChatbubblesOutline } from 'react-icons/io5';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import StudentTable from './StudentTable';
import { sample_student_data } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { IUserStudent } from 'types/interfaces';
import { BiEdit } from 'react-icons/bi';
import {
  getStudents,
  addStudentComment as addComment,
  updateStudentComment as editComment,
  deleteStudentComment as deleteComment,
  getStudentComment as getComment,
} from 'store/studentSlice';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import SingleStudent from './singleStudent';

const Students = ({
  commentTabsOpened,
  students,
}: {
  commentTabsOpened: boolean;
  students: any;
}) => {
  const [studentCommentOpen, setStudentCommentOpen] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [studentCommentsTabOpen, setStudentCommentsTabOpen] = useState<string>('');

  useEffect(() => {
    if (!commentTabsOpened) {
      setStudentCommentOpen('');
      setStudentCommentsTabOpen('');
    }
  }, [commentTabsOpened]);

  return (
    <div className={styles.container}>
      {students?.students?.map((student: any) => (
        <SingleStudent
          studentCommentOpen={studentCommentOpen}
          setStudentCommentOpen={setStudentCommentOpen}
          comment={comment}
          setComment={setComment}
          key={student.id}
          student={student}
          setStudentCommentsTabOpen={setStudentCommentsTabOpen}
          studentCommentsTabOpen={studentCommentsTabOpen}
        />
      ))}
    </div>
  );
};

export default Students;

const styles = {
  container: 'px-8 space-y-2 mt-14',
  cardHeader: 'flex justify-between py-6 px-2 sm:px-6 border-b items-center relative',
  cardHeaderName:
    'cursor-pointer w-28 sm:w-40 justify-between px-2 border-r flex space-x-3 items-center',
  studentName: 'text-sm font-medium truncate w-full',
  active: ' rounded-[50%] inline-block w-[8px] h-[8px] mr-2',
  actions: 'flex text-[20px] text-slate-500 space-x-5',
  pointer: 'cursor-pointer',
  commentIcons:
    'w-[28px] h-[28px] rounded-md text-white flex justify-center items-center text-[15px]',
};
