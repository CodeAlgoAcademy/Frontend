import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { FaGripLinesVertical, FaTimes, FaTimesCircle } from "react-icons/fa";
import { BsFillCircleFill, BsCircle } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { getDate } from "utils/getDate";
import { useDispatch } from "react-redux";
import { openErrorModal } from "store/fetchSlice";
import { editLesson, getAllLessons } from "services/lessonService";
import { updateLessonOpened } from "store/lessonsSlice";

const getLessonDate = (date: string) => {
   const dates = date.split("-");
   const month = parseInt(dates[1]);
   const day = parseInt(dates[2]);
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   return `${months[month < 10 && month.toString().length === 2 ? parseInt(month.toString()[1]) : month]} ${day}`;
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

   const editStartDate = useCallback(async () => {
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
   }, [data, dispatch, editDateDetails.start_date, today_date]);

   const editEndDate = useCallback(async () => {
      dispatch(updateLessonOpened(data));
      if (data.end_date !== editDateDetails.end_date) {
         const errors: string[] = [];
         if (new Date(editDateDetails.end_date).getTime() < today_date) {
            errors.push("End date can't be before today's date");
         }
         if (new Date(editDateDetails.start_date).getTime() !== new Date(data.start_date).getTime()) {
            if (new Date(editDateDetails.end_date).getTime() < new Date(editDateDetails.start_date).getTime()) {
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
   }, [data, dispatch, editDateDetails.end_date, editDateDetails.start_date, today_date]);

   const editStatus = async (value: "published" | "unpublished" | "inactive") => {
      dispatch(updateLessonOpened(data));
      const newLesson = { ...data };
      newLesson.status = value;
      await dispatch(editLesson(newLesson));
      await dispatch(getAllLessons());
      setStatusContainerOpened(false);
   };
   useEffect(() => {
      editStartDate();
   }, [editDateDetails.start_date, editStartDate]);

   useEffect(() => {
      editEndDate();
   }, [editDateDetails.end_date, editEndDate]);

   return (
      <div className="flex-column rounded-lg bg-white transition duration-200 ease-in-out">
         <div className="mt-[.7rem] flex items-center rounded-lg bg-white py-[0.3rem] pl-[10px] transition duration-200 ease-out">
            <div className="flex w-full flex-1 items-center justify-between border-r-2 border-[#E6E6E6] py-5 pr-[4rem] sm:gap-5 sm:py-2  sm:pr-[1rem] md:pr-[1.5rem] lg:gap-0">
               <div className="flex w-full flex-1 items-center gap-2 sm:gap-3 lg:gap-7">
                  <FaGripLinesVertical className="hidden text-[1.1rem] font-thin text-[#A0A0A0] xs:block" />
                  <p className="text-mainColor min-w-fit flex-1 font-bold sm:text-[15px] lg:text-[20px]">{data.topic.title}</p>
                  {active.includes(data.id) && (
                     <p
                        onClick={() => setShowPreview(true)}
                        className="block cursor-pointer text-[#A0A0A0] transition duration-200 ease-out hover:text-black hover:underline sm:ml-3 sm:text-[14px] lg:text-[18px]"
                     >
                        Preview
                     </p>
                  )}
               </div>
               <div className="hidden justify-around sm:flex">
                  <div className="flex items-center gap-2  sm:ml-[1rem] lg:ml-[5rem]">
                     {data.status.toLowerCase() == "published" ? (
                        <BsFillCircleFill className="text-[9px]  text-[#62C932]" />
                     ) : (
                        <BsCircle className="text-[9px] text-[#B0B0B0]" />
                     )}
                     <p className="font-semibold md:text-[15px] lg:text-[18px]">
                        {data.status.toLowerCase() !== "published" ? "Unpublished" : "Published"}
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
               <div className="flex flex-col border-t-2 border-[#E6E6E6] px-12 py-6 sm:flex-row">
                  {/* first division */}
                  <div className="flex-[.60] border-[#E6E6E6] py-[1rem] sm:border-r-2 sm:pr-[1rem]">
                     <div className="gap-[3rem] md:flex-col lg:flex-row">
                        <p className=" text-mainColor  font-bold md:text-[12px] lg:text-[18px]">Description</p>
                        <p className="md:text-[12px] lg:text-[16px] ">{data.topic.description}</p>
                     </div>
                     <div className="mt-4 flex items-center gap-[1rem]">
                        <p className="text-mainColor  font-bold md:text-[12px] lg:text-[18px]">Date Range</p>
                        <div className="flex items-center gap-[1rem]">
                           <p className="sm:text-[12px] lg:text-[16px] ">
                              {getLessonDate(data.start_date)} - {getLessonDate(data.end_date)}
                           </p>
                           <p
                              className="cursor-pointer underline sm:text-[12px] lg:text-[16px]"
                              onClick={() => {
                                 if (!editDateOpened) {
                                    dispatch(updateLessonOpened(data));
                                 }
                                 setEditDateOpened((prev) => !prev);
                              }}
                           >
                              {editDateOpened ? "Cancel Editing" : "Edit"}
                           </p>
                        </div>
                     </div>
                     {editDateOpened && (
                        <div className="mt-3 flex gap-x-4 ">
                           <div className="relative max-w-fit">
                              <input
                                 type="date"
                                 value={editDateDetails.start_date}
                                 className="hoverElement border-mainColor max-w-[130px] rounded-md border px-3 py-1 text-[15px] outline-none"
                                 onChange={(e) => {
                                    updateScheduleDate("start_date", e.target.value);
                                 }}
                              />
                              <div className="hoverText bg-mainColor after:bg-mainColor right-[0] -top-[56px]">Start date</div>
                           </div>
                           <div className="relative max-w-fit">
                              <input
                                 type="date"
                                 value={editDateDetails.end_date}
                                 className="hoverElement border-mainColor max-w-[130px] rounded-md border px-3 py-1 text-[15px] outline-none"
                                 onChange={(e) => {
                                    updateScheduleDate("end_date", e.target.value);
                                 }}
                              />
                              <div className="hoverText bg-mainColor after:bg-mainColor right-[0] -top-[56px]">End date</div>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* second division */}
                  <div className=" flex  flex-[.40] flex-col justify-between sm:py-5 sm:pl-[1rem]">
                     <div className="flex  items-center gap-[4rem]">
                        <p className="text-mainColor  font-bold md:text-[12px] lg:text-[18px]">Status</p>
                        {!statusContainerOpened && (
                           <div
                              className="flex items-center gap-[6px] border-2 border-[#E6E6E6] px-3 py-1"
                              onClick={() => {
                                 setStatusContainerOpened(true);
                              }}
                           >
                              {data.status.toLowerCase() == "published" ? (
                                 <BsFillCircleFill className="text-[9px]  text-[#62C932]" />
                              ) : (
                                 <BsCircle className="text-[9px] text-[#B0B0B0]" />
                              )}
                              <p className="cursor-pointer  font-semibold md:text-[12px] lg:text-[18px]">
                                 {data.status.toLowerCase() !== "published" ? "Unpublished" : "Published"}
                              </p>
                              <FiChevronDown />
                           </div>
                        )}
                        {statusContainerOpened && (
                           <>
                              <div className="bg-white py-3 text-center shadow-md">
                                 <p
                                    className={`cursor-pointer  border-b px-5 font-semibold md:text-[14px] ${
                                       data.status.toLowerCase() !== "published" ? "text-red-500" : "text-green-500"
                                    }`}
                                    onClick={() => {
                                       setStatusContainerOpened(false);
                                    }}
                                 >
                                    {data.status.toLowerCase() !== "published" ? "Unpublished" : "Published"}
                                 </p>
                                 <p
                                    className={`cursor-pointer  px-5 font-semibold md:text-[14px] ${
                                       data.status.toLowerCase() !== "published" ? "text-green-500" : "text-red-500"
                                    }`}
                                    onClick={(e: any) => {
                                       dispatch(updateLessonOpened(data));
                                       editStatus(e.target.textContent);
                                    }}
                                 >
                                    {data.status.toLowerCase() !== "published" ? "Published" : "Unpublished"}
                                 </p>
                              </div>
                              <span
                                 className="cursor-pointer text-[15px] font-light text-red-600"
                                 onClick={() => {
                                    setStatusContainerOpened(false);
                                 }}
                              >
                                 <FaTimes />
                              </span>
                           </>
                        )}
                     </div>
                     <div className="mt-4  flex items-center gap-[3rem]">
                        <p className="text-mainColor  font-bold md:text-[12px] lg:text-[18px]">Assign To</p>
                        <div
                           className="text-mainColor flex cursor-pointer items-center gap-[1rem]"
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
