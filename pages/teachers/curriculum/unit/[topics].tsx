import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddStudent from "@/components/Teachers/curriculum/assignment/AddStudent";
import PreviewModal from "components/modals/PreviewModal";
import Link from "next/link";
import { editLesson } from "services/lessonService";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { openErrorModal } from "store/fetchSlice";
import { addLessons, getAllLessons } from "services/lessonService";
import { RootState } from "store/store";
import { newLesson } from "types/interfaces";
import { getDate } from "utils/getDate";
import SingleLesson from "@/components/Teachers/curriculum/unit/singleLesson";
import { getStudents } from "store/studentSlice";
import { BiArrowBack } from "react-icons/bi";
import TeacherLayout from "@/components/layouts/TeacherLayout";

export default function Unit() {
   const [showModal, setShowModal] = useState(false);
   const [showPreview, setShowPreview] = useState<boolean>(false);
   const [active, setActive] = useState<number[]>([]);
   const [addLessonModalOpen, setAddLessonModalOpen] = useState<boolean>(false);
   const [lessonDetails, setLessonDetails] = useState<newLesson>({
      topic: {
         title: "",
         description: "",
      },
      students: [],
      start_date: getDate(),
      end_date: getDate(),
      status: "published",
   });
   const [studentsAdded, setStudentsAdded] = useState<any[]>([]);
   const [aboutToEditStudent, setAboutToEditStudent] = useState<boolean>(false);
   const updateTitle = (value: string) => {
      setLessonDetails({ ...lessonDetails, topic: { ...lessonDetails.topic, title: value } });
   };
   const updateDescription = (value: string) => {
      setLessonDetails({ ...lessonDetails, topic: { ...lessonDetails.topic, description: value } });
   };
   const updateStartDate = (value: string) => {
      setLessonDetails({ ...lessonDetails, start_date: value });
   };
   const updateEndDate = (value: string) => {
      setLessonDetails({ ...lessonDetails, end_date: value });
   };
   const updateStatus = (value: "published" | "unpublished") => {
      setLessonDetails({ ...lessonDetails, status: value });
   };
   const updateStudentsAddedForEachLesson = (value: any) => {
      setStudentsAdded([...studentsAdded, value]);
   };

   const removeStudentAddedForEachLesson = (value: any) => {
      setStudentsAdded(() => studentsAdded.filter((student) => student.id != value.id));
   };
   const addAllStudentsForEachLesson = (students: any[]) => {
      setStudentsAdded(students);
   };
   const removeAllStudentsAddedForEachLesson = () => {
      setStudentsAdded([]);
   };
   const dispatch = useDispatch();

   const router = useRouter();
   const { topics } = router.query;

   const getLessonsAll = useCallback(async () => {
      const data2 = await dispatch(getAllLessons());
      if (!data2?.error?.message) {
      }
   }, [dispatch]);
   const editStudents = async (data: any) => {
      const newLesson = { ...data };
      newLesson.students = studentsAdded;
      await dispatch(editLesson(newLesson));
      await dispatch(getAllLessons());
      setShowModal(false);
   };
   useEffect(() => {
      getLessonsAll();
   }, [getLessonsAll]);

   const { lessons } = useSelector((state: RootState) => state.allLessons);
   const { currentUnitInView } = useSelector((state: RootState) => state.unit);

   // add student oprions modal
   const cancelPresence = () => {
      setShowModal(false);
   };
   const addLesson = async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const end_date = new Date(lessonDetails.end_date).getTime();
      const start_date = new Date(lessonDetails.start_date).getTime();
      const today_date = new Date(getDate()).getTime();
      const errors: string[] = [];
      if (!currentUnitInView.id) return;
      if (end_date <= today_date || end_date <= start_date) {
         errors.push("Lesson's end date should not be / be before today's date and it's start date");
      }
      if (start_date < today_date) {
         errors.push("Lesson's start date should be today or after");
      }
      if (errors.length === 0) {
         await dispatch(addLessons(lessonDetails));
         await dispatch(getAllLessons());
         setAddLessonModalOpen(false);
      } else {
         dispatch(openErrorModal({ errorText: errors }));
      }
   };
   // curriculm topic preview modal
   const cancelPreview = () => {
      setShowPreview(false);
   };

   const handleClick = (id: number) => {
      const index = active.indexOf(id);
      if (index !== -1) {
         setActive((active) => [...active.slice(0, index), ...active.slice(index + 1)]);
      } else {
         setActive((active) => [...active, id]);
      }
   };
   useEffect(() => {
      dispatch(getStudents());
   }, [dispatch]);

   return (
      <TeacherLayout>
         <div className="flex items-center justify-start gap-6">
            {/* add lesson modal */}
            {addLessonModalOpen && (
               <section className="fixed top-0 left-0 z-20 flex min-h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.6)]">
                  <div className="max-h-[90vh] w-[90vw] max-w-[700px] overflow-hidden overflow-y-scroll rounded-md bg-white p-8 shadow-md">
                     <header className="mb-6 flex w-full items-center justify-between">
                        <h1 className="text-mainColor text-[26px] font-bold">Add Lesson</h1>
                        <span
                           className="text-[22px] text-[darkRed]"
                           onClick={() => {
                              setAddLessonModalOpen(false);
                           }}
                        >
                           <FaTimes />
                        </span>
                     </header>
                     <form onSubmit={addLesson}>
                        <div className="mb-4 w-full">
                           <input
                              type="text"
                              className="focus:border-mainColor w-full rounded-md border-2 p-3 outline-none"
                              placeholder="Enter Lesson Title*"
                              required
                              value={lessonDetails.topic.title}
                              onChange={(e) => {
                                 updateTitle(e.target.value);
                              }}
                           />
                        </div>
                        <div className="mb-4 w-full">
                           <textarea
                              className="focus:border-mainColor h-[200px] w-full resize-none rounded-md border-2 p-3 outline-none"
                              required
                              placeholder="Enter Lesson Description*"
                              value={lessonDetails.topic.description}
                              onChange={(e) => {
                                 updateDescription(e.target.value);
                              }}
                           ></textarea>
                        </div>
                        <div className="mb-2 w-full gap-4 text-center">
                           <h1 className="text-mainColor text-center font-bold">Status</h1>
                        </div>
                        <div className="mb-4 flex gap-5">
                           <div className="w-full">
                              <div
                                 className={`w-full rounded-md border-2 p-3 ${
                                    lessonDetails.status === "published" ? "border-green-600 text-green-600" : "text-black"
                                 }  cursor-pointer text-center`}
                                 onClick={() => {
                                    updateStatus("published");
                                 }}
                              >
                                 Published
                              </div>
                           </div>
                           <div className="w-full">
                              <div
                                 className={`w-full rounded-md border-2 p-3 ${
                                    lessonDetails.status === "unpublished" ? "border-red-600 text-red-600 " : "text-black"
                                 } cursor-pointer text-center`}
                                 onClick={() => {
                                    updateStatus("unpublished");
                                 }}
                              >
                                 Unpublished
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col gap-4 md:flex-row">
                           <div className="flex w-full flex-col gap-y-2">
                              <label htmlFor="start_date" className="text-mainColor font-bold">
                                 Start Date*
                              </label>
                              <input
                                 type="date"
                                 id="start_date"
                                 className="focus:border-mainColor w-full rounded-md border-2 p-3 outline-none"
                                 value={lessonDetails.start_date}
                                 onChange={(e) => {
                                    updateStartDate(e.target.value);
                                 }}
                                 required
                              />
                           </div>
                           <div className="flex w-full flex-col gap-y-2">
                              <label htmlFor="end_date" className="text-mainColor font-bold">
                                 End Date*
                              </label>
                              <input
                                 type="date"
                                 id="end_date"
                                 className="focus:border-mainColor w-full rounded-md border-2 p-3 outline-none"
                                 value={lessonDetails.end_date}
                                 onChange={(e) => {
                                    updateEndDate(e.target.value);
                                 }}
                                 required
                              />
                           </div>
                        </div>
                        <button type="submit" className="bg-mainColor mt-4 w-full rounded-md p-3 text-center text-white">
                           Add Lesson
                        </button>
                     </form>
                  </div>
               </section>
            )}
            <div className="flex flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-center">
               <div className="flex flex-row items-center gap-x-2">
                  <Link href="/teachers/curriculum">
                     <div className="text-mainColor cursor-pointer text-[1.2rem] md:text-[1.4rem]">
                        <i>
                           <BiArrowBack />
                        </i>
                     </div>
                  </Link>
                  <h1 className="text-mainColor text-[22px] font-bold md:text-3xl">{topics}</h1>
               </div>
               <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
                  <div
                     className="text-mainColor flex cursor-pointer items-center gap-2 rounded-lg px-2 hover:bg-gray-50"
                     onClick={() => {
                        setAddLessonModalOpen(true);
                     }}
                  >
                     <IoIosAddCircleOutline className="text-4xl " />
                     <h1 className="text-[1.2rem]">Add Lesson</h1>
                  </div>
                  <Link href="/teachers/curriculum/assignments">
                     <div className="text-mainColor flex cursor-pointer items-center gap-2 rounded-lg px-2 hover:bg-gray-50">
                        <IoIosAddCircleOutline className="text-4xl " />
                        <h1 className="text-[1.2rem]">Add Assignment</h1>
                     </div>
                  </Link>
               </div>
            </div>
         </div>
         <div className="mb-[1.5rem] mt-7 border-b-[1.3px] border-[#BDBDBD] pl-[1.5rem] pb-3 md:mb-[3rem]">
            <h2 className="text-mainColor text-[1.2rem] font-bold md:text-[1.4rem]">Unit Control</h2>
         </div>
         {/* curriculumn topic section */}

         {lessons?.map((data: any, index: number) => {
            return (
               <SingleLesson
                  key={index}
                  data={data}
                  setShowModal={setShowModal}
                  setShowPreview={setShowPreview}
                  active={active}
                  handleClick={handleClick}
                  studentsAdded={studentsAdded}
                  aboutToEditStudent={aboutToEditStudent}
                  cancelPresence={cancelPresence}
                  addAllStudentsForEachLesson={addAllStudentsForEachLesson}
               />
            );
         })}
         {/* Add student modal component  */}
         <AddStudent
            showModal={showModal}
            cancelPresence={cancelPresence}
            studentsAdded={studentsAdded}
            updateStudentsAddedForEachLesson={updateStudentsAddedForEachLesson}
            removeStudentAddedForEachLesson={removeStudentAddedForEachLesson}
            addAllStudentsForEachLesson={addAllStudentsForEachLesson}
            removeAllStudentsAddedForEachLesson={removeAllStudentsAddedForEachLesson}
            setAboutToEditStudent={setAboutToEditStudent}
            editStudent={editStudents}
         />
         {/* preview modal components */}
         <PreviewModal showPreview={showPreview} cancelPreview={cancelPreview} />
      </TeacherLayout>
   );
}
