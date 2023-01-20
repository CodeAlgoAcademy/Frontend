import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getTeachers } from 'services/teacherService';
import { RootState } from 'store/store';
import { getStudents } from 'store/studentSlice';
import { getAccessToken } from 'utils/getTokens';

const MessagesModal = ({
  setModalOpen,
  modalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [active, setActive] = useState(0);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const dispatch = useDispatch();
  const { students } = useSelector((state: RootState) => state.students.students);
  const { teachers } = useSelector((state: RootState) => state.allTeachers);

  // const filterTeachers = (value: string) => {
  //   setFilteredTeachers((prev:any) => {
  //     return {
  //       teachers: teachers?.filter((teacher: any) => {
  //         if (
  //           (teacher.firstName + ' ' + teacher.lastName).toLowerCase().includes(value.toLowerCase())
  //         ) {
  //           return teacher;
  //         }
  //       }),
  //     };
  //   });
  // };

  const [openedTab, setOpenedTab] = useState<string>('students');

  useEffect(() => {
    dispatch(getStudents());
    dispatch(getTeachers());
  }, []);
  return (
    <section
      className={`w-[100vw] min-h-screen flex justify-center items-center fixed left-0 top-0 z-20  backdrop-blur-sm bg-gray-100/50`}
    >
      <div
        className={`w-[90vw] relative max-w-[900px] mx-auto h-[700px] max-h-[90vh] bg-white shadow-md rounded-md flex overflow-hidden`}
      >
        <span
          className="absolute top-[30px] right-[30px] z-20 text-[20px] font-bold text-[darkRed]"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <FaTimes />
        </span>
        <div className="flex-[30%] md:border-r-2 border-b-2">
          <article
            className={`${styles.tabsOpener} ${openedTab === 'students' && 'bg-gray-100'}`}
            onClick={() => {
              setOpenedTab('students');
            }}
          >
            <p>My Students</p>
            <span className="text-[20px]">
              <BiChevronRight />
            </span>
          </article>
          <article
            className={`${styles.tabsOpener} ${openedTab === 'teachers' && 'bg-gray-100'}`}
            onClick={() => {
              setOpenedTab('teachers');
            }}
          >
            <p>Teachers</p>
            <span className="text-[20px]">
              <BiChevronRight />
            </span>
          </article>
        </div>
        <div className="flex flex-col flex-[70%] justify-between">
          <div className="flex-[80%] overflow-scroll scroll">
            {openedTab === 'students' && (
              <div className="pr-8 py-8">
                <h1 className={styles.title}>Students</h1>
                <div className="overflow-hidden">
                  {students?.map((student: any) => {
                    return (
                      <p
                        onClick={() => setActive(student.id)}
                        key={student.id}
                        className={
                          active === student.id
                            ? `p-5 border-y border-r bg-[#efecf5]  hover:bg-[#e9e2f5] `
                            : `p-5 hover:bg-[#e9e2f5] border-y border-r`
                        }
                      >
                        {student.firstName}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
            {openedTab === 'teachers' && (
              <div className="pr-8 py-8 ">
                <h1 className={styles.title}>Teachers</h1>
                {teachers?.map((teacher: any) => {
                  return (
                    <p
                      onClick={() => setActive(teacher.id)}
                      key={teacher.id}
                      className={
                        active === teacher.id
                          ? `p-5 border-y border-r bg-[#efecf5]  hover:bg-[#e9e2f5] `
                          : `p-5 hover:bg-[#e9e2f5] border-y border-r`
                      }
                    >
                      {teacher.firstName}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div className="w-full flex gap-x-2 border-t-2">
            <input
              placeholder="Type Message..."
              className="w-[70%] md:w-[75%] px-2 py-3 outline-none border-none"
            />
            <button className="bg-mainPurple text-white px-2 py-3 text-center w-[30%] md:w-[25%]">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  title: 'text-[19px] font-bold pl-5 pb-5',
  tabsOpener:
    'cursor-pointer border-b-2 flex justify-between gap-x-2 px-3 py-3 items-center hover:bg-gray-50',
};

export default MessagesModal;
