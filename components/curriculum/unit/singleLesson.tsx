import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FaGripLinesVertical } from 'react-icons/fa';
import { BsFillCircleFill, BsCircle } from 'react-icons/bs';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { getDate } from 'utils/getDate';
import { useDispatch } from 'react-redux';
import { openErrorModal } from 'store/fetchSlice';
import { editLesson, getAllLessons } from 'services/lessonService';

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
}: {
  data: any;
  active: number[];
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleClick: (id: number) => void;
}) => {
  const dispatch = useDispatch();
  const [editDateOpened, setEditDateOpened] = useState<boolean>(false);
  const [editDateDetails, setEditDateDetails] = useState({
    start_date: data.start_date,
    end_date: data.end_date
  });

  const today_date = new Date(getDate()).getTime();
  const updateScheduleDate = (key: string, value: string) => {
    setEditDateDetails((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const editStartDate = async ()=>{
    if(data.start_date !== editDateDetails.start_date){
      const errors : string[] = [];

    if(new Date(editDateDetails.start_date).getTime() < today_date){
      errors.push("Start date can't be before today's date");
    }
    if(new Date(editDateDetails.start_date).getTime() > new Date(data.end_date).getTime()){
      errors.push("Start date can't be after / on the same day with end date");
    }
    if(errors.length === 0){
      const newLesson = {...data};
      newLesson.start_date = editDateDetails.start_date;
      await dispatch(editLesson(newLesson));
      await dispatch(getAllLessons());
      setEditDateOpened(false);
    }else{
      dispatch(openErrorModal({errorText: errors}))
    }
    }
  }
  const editEndDate = async ()=>{
    if(data.end_date !== editDateDetails.end_date){
      const errors : string [] = []
    if(new Date(editDateDetails.end_date).getTime() < today_date){
      errors.push("End date can't be before today's date");
    }
    if(new Date(editDateDetails.start_date).getTime() !== new Date(data.start_date).getTime()){
      if(new Date(editDateDetails.end_date).getTime() < new Date(editDateDetails.start_date).getTime()){
        errors.push("End date can't be less than start date")
      }
    }else{
      if(new Date(editDateDetails.end_date).getTime() < new Date(data.start_date).getTime()){
        errors.push("End date can't be less than start date")
      }
    }
    if(errors.length === 0){
      const newLesson = {...data};
      newLesson.end_date = editDateDetails.end_date;
      await dispatch(editLesson(newLesson));
      await dispatch(getAllLessons());
      setEditDateOpened(false);
    }else{
      dispatch(openErrorModal({errorText: errors}))
    }
    }
  }
  useEffect(()=>{
    editStartDate();
  }, [editDateDetails.start_date])
  

  useEffect(()=>{
    editEndDate()
  }, [editDateDetails.end_date])


  return (
    <div className="flex-column bg-white rounded-lg transition duration-200 ease-in-out">
      <div className="bg-white flex items-center mt-[.7rem] py-[0.3rem] pl-[10px] rounded-lg transition duration-200 ease-out">
        <div className="border-r-2 flex items-center sm:gap-5 lg:gap-0 sm:pr-[1rem] sm:py-2 md:pr-[1.5rem] border-[#E6E6E6] py-5 pr-[4rem]  justify-between w-full">
          <div className="flex items-center sm:gap-3 lg:gap-7">
            <FaGripLinesVertical className="text-[#A0A0A0] text-[1.1rem] font-thin" />
            <p className="font-bold sm:text-[15px] lg:text-[20px]">{data.topic.title}</p>
            {active.includes(data.id) && (
              <p
                onClick={() => setShowPreview(true)}
                className=" sm:text-[10px] lg:text-[18px] text-[#A0A0A0] hover:underline cursor-pointer hover:text-black transition duration-200 ease-out"
              >
                Preview
              </p>
            )}
          </div>
          <div className="flex justify-around">
            <p className="sm:text-[10px] lg:text-[18px] font-semibold">{data.date}</p>
            <div className="flex items-center gap-2  sm:ml-[1rem] lg:ml-[5rem]">
              {data.status == 'Published' ? (
                <BsFillCircleFill className="text-[9px]  text-[#62C932]" />
              ) : (
                <BsCircle className="text-[9px] text-[#B0B0B0]" />
              )}
              <p className="sm:text-[10px] lg:text-[18px] font-semibold">{data.status}</p>
            </div>
          </div>
        </div>
        <div className="py-5 px-7 text-2xl" onClick={() => handleClick(data.id)}>
          {active.includes(data.id) ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>
      {active.includes(data.id) && (
        <div>
          <div className="flex  mx-12 py-6 border-[#E6E6E6] border-t-2 ">
            {/* first division */}
            <div className="flex-[.60] sm:pr-[1rem] lg:pr-[1rem] border-[#E6E6E6] border-r-2 py-[1rem]">
              <div className="md:flex-col lg:flex-row gap-[3rem]">
                <p className=" md:text-[12px]  lg:text-[18px] font-bold">Description</p>
                <p className="md:text-[12px] lg:text-[16px] ">{data.topic.description}</p>
              </div>
              <div className="flex items-center gap-[1rem] mt-4">
                <p className="md:text-[12px]  lg:text-[18px] font-bold">Date Range</p>
                <div className="flex items-center gap-[1rem]">
                  <p className="sm:text-[12px] lg:text-[16px] ">
                    {getLessonDate(data.start_date)} - {getLessonDate(data.end_date)}
                  </p>
                  <p className="sm:text-[12px] lg:text-[16px] underline cursor-pointer" onClick={()=>{
                    setEditDateOpened(prev=> !prev)
                  }}>{editDateOpened ? "Cancel Editing" : "Edit"}</p>
                </div>
              </div>
              {editDateOpened && <div className='mt-3 flex gap-x-4 '>
              <div className="relative max-w-fit">
                        <input
                          type="date"
                          value={editDateDetails.start_date}
                          className="hoverElement max-w-[130px] px-3 py-1 rounded-md outline-none border border-mainPurple text-[15px]"
                          onChange={(e) => {
                            updateScheduleDate('start_date', e.target.value);
                          }}
                        />
                        <div className="hoverText right-[0] -top-[56px] bg-mainPurple after:bg-mainPurple">
                          Start date
                        </div>
                      </div>
                    <div className="relative max-w-fit">
                      <input
                        type="date"
                        value={editDateDetails.end_date}
                        className="hoverElement max-w-[130px] px-3 py-1 rounded-md outline-none border border-mainPurple text-[15px]"
                        onChange={(e) => {
                          updateScheduleDate('end_date', e.target.value);
                        }}
                      />
                      <div className="hoverText right-[0] -top-[56px] bg-mainPurple after:bg-mainPurple">
                        End date
                      </div>
                    </div>
              </div>}
            </div>

            {/* second division */}
            <div className=" flex-[.40]  pl-[1rem] flex flex-col justify-between py-5">
              <div className="flex  items-center gap-[4rem]">
                <p className="md:text-[12px]  lg:text-[18px] font-bold">Status</p>
                <div className="flex gap-[6px] items-center border-2 border-[#E6E6E6] px-3 py-1">
                  {data.status == 'Published' ? (
                    <BsFillCircleFill className="text-[9px]  text-[#62C932]" />
                  ) : (
                    <BsCircle className="text-[9px] text-[#B0B0B0]" />
                  )}
                  <p className="md:text-[12px]  lg:text-[18px] font-semibold">{data.status}</p>
                  <FiChevronDown />
                </div>
              </div>
              <div className="flex  items-center mt-4 gap-[3rem]">
                <p className="md:text-[12px]  lg:text-[18px] font-bold">Assign To</p>
                <div
                  className="flex items-center gap-[1rem] cursor-pointer"
                  onClick={() => setShowModal(true)}
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
