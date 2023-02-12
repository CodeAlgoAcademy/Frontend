import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaGripLinesVertical, FaTimes, FaTimesCircle } from 'react-icons/fa';
import { BsFillCircleFill, BsCircle } from 'react-icons/bs';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { getDate } from 'utils/getDate';
import { useDispatch } from 'react-redux';
import { openErrorModal } from 'store/fetchSlice';
import { editLesson, getAllLessons } from 'services/lessonService';
import { updateLessonOpened } from 'store/lessonsSlice';

const getLessonDate = (date: string) => {
  const dates = date.split('-');
  const month = parseInt(dates[1]);
  const day = parseInt(dates[2]);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${
    months[month < 10 && month.toString().length === 2 ? parseInt(month.toString()[1]) : month]
  } ${day}`;
};

const SingleLesson = ({
  data,
  setShowModal,
  setShowPreview,
  handleClick,
  active,
  studentsAdded,
  aboutToEditStudent,
  cancelPresence,
  addAllStudentsForEachLesson,
}: {
  data: any;
  active: number[];
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  addAllStudentsForEachLesson: (students: any[]) => void;
  handleClick: (id: number) => void;
  studentsAdded: any[];
  aboutToEditStudent: boolean;
  cancelPresence: () => void;
}) => {
  const dispatch = useDispatch();
  const [studentsUpdatedBefore, setStudentsUpdatedBefore] = useState<boolean>(true);
  const [editDateOpened, setEditDateOpened] = useState<boolean>(false);
  const [editDateDetails, setEditDateDetails] = useState({
    start_date: data.start_date,
    end_date: data.end_date,
  });
  const [statusContainerOpened, setStatusContainerOpened] = useState<boolean>(false);

  const today_date = new Date(getDate()).getTime();
  const updateScheduleDate = (key: string, value: string) => {
    setEditDateDetails((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const editStartDate = async () => {
    dispatch(updateLessonOpened(data));
    if (data.start_date !== editDateDetails.start_date) {
      const errors: string[] = [];

      if (new Date(editDateDetails.start_date).getTime() < today_date) {
        errors.push("Start date can't be before today's date");
      }
      if (new Date(editDateDetails.start_date).getTime() > new Date(data.end_date).getTime()) {
        errors.push("Start date can't be after / on the same day with end date");
      }
      if (errors.length === 0) {
        const newLesson = { ...data };
        newLesson.start_date = editDateDetails.start_date;
        await dispatch(editLesson(newLesson));
        await dispatch(getAllLessons());
        setEditDateOpened(false);
      } else {
        dispatch(openErrorModal({ errorText: errors }));
      }
    }
  };
  const editEndDate = async () => {
    dispatch(updateLessonOpened(data));
    if (data.end_date !== editDateDetails.end_date) {
      const errors: string[] = [];
      if (new Date(editDateDetails.end_date).getTime() < today_date) {
        errors.push("End date can't be before today's date");
      }
      if (new Date(editDateDetails.start_date).getTime() !== new Date(data.start_date).getTime()) {
        if (
          new Date(editDateDetails.end_date).getTime() <
          new Date(editDateDetails.start_date).getTime()
        ) {
          errors.push("End date can't be less than start date");
        }
      } else {
        if (new Date(editDateDetails.end_date).getTime() < new Date(data.start_date).getTime()) {
          errors.push("End date can't be less than start date");
        }
      }
      if (errors.length === 0) {
        const newLesson = { ...data };
        newLesson.end_date = editDateDetails.end_date;
        await dispatch(editLesson(newLesson));
        await dispatch(getAllLessons());
        setEditDateOpened(false);
      } else {
        dispatch(openErrorModal({ errorText: errors }));
      }
    }
  };

  const editStatus = async (value: 'published' | 'unpublished' | 'inactive') => {
    dispatch(updateLessonOpened(data));
    const newLesson = { ...data };
    newLesson.status = value;
    await dispatch(editLesson(newLesson));
    await dispatch(getAllLessons());
    setStatusContainerOpened(false);
  };
  // const editStudents = async () => {
  //   const newLesson = { ...data };
  //   console.log(newLesson);
  //   newLesson.students = studentsAdded;
  //   await dispatch(editLesson(newLesson));
  //   await dispatch(getAllLessons());
  //   setShowModal(false);
  // };

  useEffect(() => {
    editStartDate();
  }, [editDateDetails.start_date]);
  // useEffect(() => {
  //   if (!studentsUpdatedBefore) {
  //     editStudents();
  //   } else {
  //     setStudentsUpdatedBefore(false);
  //   }
  // }, [aboutToEditStudent]);

  useEffect(() => {
    editEndDate();
  }, [editDateDetails.end_date]);

  return (
    <div className="flex-column bg-white rounded-lg transition duration-200 ease-in-out">
      <div className="bg-white flex items-center mt-[.7rem] py-[0.3rem] pl-[10px] rounded-lg transition duration-200 ease-out">
        <div className="border-r-2 flex items-center sm:gap-5 lg:gap-0 sm:pr-[1rem] sm:py-2 md:pr-[1.5rem] border-[#E6E6E6] py-5 pr-[4rem]  justify-between w-full flex-1">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-7 flex-1 w-full">
            <FaGripLinesVertical className="text-[#A0A0A0] text-[1.1rem] font-thin xs:block hidden" />
            <p className="font-bold sm:text-[15px] lg:text-[20px] text-[#2073fa] flex-1 min-w-fit">
              {data.topic.title}
            </p>
            {active.includes(data.id) && (
              <p
                onClick={() => setShowPreview(true)}
                className="sm:text-[14px] sm:ml-3 block lg:text-[18px] text-[#A0A0A0] hover:underline cursor-pointer hover:text-black transition duration-200 ease-out"
              >
                Preview
              </p>
            )}
          </div>
          <div className="sm:flex justify-around hidden">
            <div className="flex items-center gap-2  sm:ml-[1rem] lg:ml-[5rem]">
              {data.status.toLowerCase() == 'published' ? (
                <BsFillCircleFill className="text-[9px]  text-[#62C932]" />
              ) : (
                <BsCircle className="text-[9px] text-[#B0B0B0]" />
              )}
              <p className="md:text-[15px] lg:text-[18px] font-semibold">
                {data.status.toLowerCase() !== 'published' ? 'Unpublished' : 'Published'}
              </p>
            </div>
          </div>
        </div>
        <div className="py-5 px-7 text-2xl" onClick={() => handleClick(data.id)}>
          {active.includes(data.id) ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>
      {active.includes(data.id) && (
        <div>
          <div className="flex px-12 py-6 border-[#E6E6E6] border-t-2 sm:flex-row flex-col">
            {/* first division */}
            <div className="flex-[.60] sm:pr-[1rem] border-[#E6E6E6] sm:border-r-2 py-[1rem]">
              <div className="md:flex-col lg:flex-row gap-[3rem]">
                <p className=" md:text-[12px]  lg:text-[18px] font-bold text-[#2073fa]">
                  Description
                </p>
                <p className="md:text-[12px] lg:text-[16px] ">{data.topic.description}</p>
              </div>
              <div className="flex items-center gap-[1rem] mt-4">
                <p className="md:text-[12px]  lg:text-[18px] font-bold text-[#2073fa]">
                  Date Range
                </p>
                <div className="flex items-center gap-[1rem]">
                  <p className="sm:text-[12px] lg:text-[16px] ">
                    {getLessonDate(data.start_date)} - {getLessonDate(data.end_date)}
                  </p>
                  <p
                    className="sm:text-[12px] lg:text-[16px] underline cursor-pointer"
                    onClick={() => {
                      if (!editDateOpened) {
                        dispatch(updateLessonOpened(data));
                      }
                      setEditDateOpened((prev) => !prev);
                    }}
                  >
                    {editDateOpened ? 'Cancel Editing' : 'Edit'}
                  </p>
                </div>
              </div>
              {editDateOpened && (
                <div className="mt-3 flex gap-x-4 ">
                  <div className="relative max-w-fit">
                    <input
                      type="date"
                      value={editDateDetails.start_date}
                      className="hoverElement max-w-[130px] px-3 py-1 rounded-md outline-none border border-[#2073fa] text-[15px]"
                      onChange={(e) => {
                        updateScheduleDate('start_date', e.target.value);
                      }}
                    />
                    <div className="hoverText right-[0] -top-[56px] bg-[#2073fa] after:bg-[#2073fa]">
                      Start date
                    </div>
                  </div>
                  <div className="relative max-w-fit">
                    <input
                      type="date"
                      value={editDateDetails.end_date}
                      className="hoverElement max-w-[130px] px-3 py-1 rounded-md outline-none border border-[#2073fa] text-[15px]"
                      onChange={(e) => {
                        updateScheduleDate('end_date', e.target.value);
                      }}
                    />
                    <div className="hoverText right-[0] -top-[56px] bg-[#2073fa] after:bg-[#2073fa]">
                      End date
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* second division */}
            <div className=" flex-[.40]  sm:pl-[1rem] flex flex-col justify-between sm:py-5">
              <div className="flex  items-center gap-[4rem]">
                <p className="md:text-[12px]  lg:text-[18px] font-bold text-[#2073fa]">Status</p>
                {!statusContainerOpened && (
                  <div
                    className="flex gap-[6px] items-center border-2 border-[#E6E6E6] px-3 py-1"
                    onClick={() => {
                      setStatusContainerOpened(true);
                    }}
                  >
                    {data.status.toLowerCase() == 'published' ? (
                      <BsFillCircleFill className="text-[9px]  text-[#62C932]" />
                    ) : (
                      <BsCircle className="text-[9px] text-[#B0B0B0]" />
                    )}
                    <p className="md:text-[12px]  lg:text-[18px] font-semibold cursor-pointer">
                      {data.status.toLowerCase() !== 'published' ? 'Unpublished' : 'Published'}
                    </p>
                    <FiChevronDown />
                  </div>
                )}
                {statusContainerOpened && (
                  <>
                    <div className="py-3 bg-white shadow-md text-center">
                      <p
                        className={`md:text-[14px]  font-semibold cursor-pointer border-b px-5 ${
                          data.status.toLowerCase() !== 'published'
                            ? 'text-red-500'
                            : 'text-green-500'
                        }`}
                        onClick={() => {
                          setStatusContainerOpened(false);
                        }}
                      >
                        {data.status.toLowerCase() !== 'published' ? 'Unpublished' : 'Published'}
                      </p>
                      <p
                        className={`md:text-[14px]  font-semibold cursor-pointer px-5 ${
                          data.status.toLowerCase() !== 'published'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                        onClick={(e: any) => {
                          dispatch(updateLessonOpened(data));
                          editStatus(e.target.textContent);
                        }}
                      >
                        {data.status.toLowerCase() !== 'published' ? 'Published' : 'Unpublished'}
                      </p>
                    </div>
                    <span
                      className="text-[15px] font-light cursor-pointer text-red-600"
                      onClick={() => {
                        setStatusContainerOpened(false);
                      }}
                    >
                      <FaTimes />
                    </span>
                  </>
                )}
              </div>
              <div className="flex  items-center mt-4 gap-[3rem]">
                <p className="md:text-[12px]  lg:text-[18px] font-bold text-[#2073fa]">Assign To</p>
                <div
                  className="flex items-center gap-[1rem] cursor-pointer text-[#2073fa]"
                  onClick={() => {
                    addAllStudentsForEachLesson(data.students);
                    setShowModal(true);
                    dispatch(updateLessonOpened(data));
                  }}
                >
                  <IoIosAddCircleOutline className="md:text[10px] lg:text-[1.6rem]" />
                  <p className="md:text-[10px]  lg:text-[16px]">Add Student</p>
                </div>
              </div>
            </div>
          </div>

          {/* Student progress section */}
        </div>
      )}
    </div>
  );
};

export default SingleLesson;
