import React,{ChangeEvent,useEffect,useRef,useState} from 'react';
import {BsCircle,BsFillCircleFill} from 'react-icons/bs';
import {FaCheck,FaChevronLeft,FaGripLinesVertical,FaTimes} from 'react-icons/fa';
import {IoIosAddCircleOutline} from 'react-icons/io';
import {FiChevronDown,FiChevronUp} from 'react-icons/fi';
import Sidebar from '@/components/Sidebar';
import AddStudent from '@/components/modals/AddStudent';
import PreviewModal from '@/components/modals/PreviewModal';
import {GeneralNav} from '@/components/index';
import Link from 'next/link';
//
import {editLesson} from 'services/lessonService';
import {useDispatch,useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAccessToken} from 'utils/getTokens';
import {openErrorModal} from 'store/fetchSlice';
import http from 'axios.config';
import {addLessons,getAllLessons} from 'services/lessonService';
import {RootState} from 'store/store';
import {ISingleStudent,newLesson} from 'types/interfaces';
import {getDate} from 'utils/getDate';
import SingleLesson from '@/components/curriculum/unit/singleLesson';
import {getStudents} from 'store/studentSlice';
import TeacherLayout from '@/components/Teachers/TeacherLayout';

export default function Unit() {
  const [showModal,setShowModal] = useState(false);
  const [showPreview,setShowPreview] = useState<boolean>(false);
  const [active,setActive] = useState<number[]>([]);
  const [addLessonModalOpen,setAddLessonModalOpen] = useState<boolean>(false);
  const [lessonDetails,setLessonDetails] = useState<newLesson>({
    topic: {
      title: '',
      description: '',
    },
    students: [],
    start_date: getDate(),
    end_date: getDate(),
    status: 'published',
  });
  const [studentsAdded,setStudentsAdded] = useState<any[]>([]);
  const [aboutToEditStudent,setAboutToEditStudent] = useState<boolean>(false);
  const updateTitle = (value: string) => {
    setLessonDetails({...lessonDetails,topic: {...lessonDetails.topic,title: value}});
  };
  const updateDescription = (value: string) => {
    setLessonDetails({...lessonDetails,topic: {...lessonDetails.topic,description: value}});
  };
  const updateStartDate = (value: string) => {
    setLessonDetails({...lessonDetails,start_date: value});
  };
  const updateEndDate = (value: string) => {
    setLessonDetails({...lessonDetails,end_date: value});
  };
  const updateStatus = (value: 'published' | 'unpublished') => {
    setLessonDetails({...lessonDetails,status: value});
  };
  const updateStudentsAddedForEachLesson = (value: any) => {
    setStudentsAdded([...studentsAdded,value]);
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
  const {topics} = router.query;

  const getLessonsAll = async () => {
    const data2 = await dispatch(getAllLessons());
    if(!data2?.error?.message) {
    }
  };
  const editStudents = async (data: any) => {
    const newLesson = {...data};
    newLesson.students = studentsAdded;
    await dispatch(editLesson(newLesson));
    await dispatch(getAllLessons());
    setShowModal(false);
  };
  useEffect(() => {
    getLessonsAll();
  },[]);

  const {lessons} = useSelector((state: RootState) => state.allLessons);
  const {currentUnitInView} = useSelector((state: RootState) => state.unit);

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
    if(!currentUnitInView.id) return;
    if(end_date <= today_date || end_date <= start_date) {
      errors.push("Lesson's end date should not be / be before today's date and it's start date");
    }
    if(start_date < today_date) {
      errors.push("Lesson's start date should be today or after");
    }
    if(errors.length === 0) {
      await dispatch(addLessons(lessonDetails));
      await dispatch(getAllLessons());
      setAddLessonModalOpen(false);
    } else {
      dispatch(openErrorModal({errorText: errors}));
    }
  };
  // curriculm topic preview modal
  const cancelPreview = () => {
    setShowPreview(false);
  };

  const handleClick = (id: number) => {
    const index = active.indexOf(id);
    if(index !== -1) {
      setActive((active) => [...active.slice(0,index),...active.slice(index + 1)]);
    } else {
      setActive((active) => [...active,id]);
    }
  };
  useEffect(() => {
    dispatch(getStudents());
  },[]);

  return (
    <TeacherLayout>
      <div className="flex justify-start items-center gap-6">
        <Link href="/curriculum">
          <div className="text-[1.4rem] cursor-pointer">
            <i>
              <FaChevronLeft />
            </i>
          </div>
        </Link>
        {/* add lesson modal */}
        {addLessonModalOpen && (
          <section className="fixed top-0 left-0 w-full min-h-screen bg-[rgba(0,0,0,0.6)] z-20 flex justify-center items-center">
            <div className="bg-white w-[90vw] max-w-[700px] max-h-[90vh] overflow-hidden overflow-y-scroll rounded-md shadow-md p-8">
              <header className="justify-between items-center flex w-full mb-6">
                <h1 className="text-[26px] font-bold">Add Lesson</h1>
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
                <div className="w-full mb-4">
                  <input
                    type="text"
                    className="w-full p-3 border-2 focus:border-mainPurple outline-none rounded-md"
                    placeholder="Enter Lesson Title*"
                    required
                    value={lessonDetails.topic.title}
                    onChange={(e) => {
                      updateTitle(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full mb-4">
                  <textarea
                    className="w-full h-[200px] resize-none p-3 border-2 focus:border-mainPurple outline-none rounded-md"
                    required
                    placeholder="Enter Lesson Description*"
                    value={lessonDetails.topic.description}
                    onChange={(e) => {
                      updateDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="w-full text-center gap-4 mb-2">
                  <h1 className="text-center">Status</h1>
                </div>
                <div className="mb-4 flex gap-5">
                  <div className="w-full">
                    <div
                      className={`w-full p-3 rounded-md border-2 ${lessonDetails.status === 'published'
                        ? 'border-green-600 text-green-600'
                        : 'text-black'
                        }  text-center cursor-pointer`}
                      onClick={() => {
                        updateStatus('published');
                      }}
                    >
                      Published
                    </div>
                  </div>
                  <div className="w-full">
                    <div
                      className={`w-full p-3 rounded-md border-2 ${lessonDetails.status === 'unpublished'
                        ? 'border-red-600 text-red-600 '
                        : 'text-black'
                        } text-center cursor-pointer`}
                      onClick={() => {
                        updateStatus('unpublished');
                      }}
                    >
                      Unpublished
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 md:flex-row flex-col">
                  <div className="w-full flex flex-col gap-y-2">
                    <label htmlFor="start_date">Start Date*</label>
                    <input
                      type="date"
                      id="start_date"
                      className="w-full p-3 border-2 focus:border-mainPurple outline-none rounded-md"
                      value={lessonDetails.start_date}
                      onChange={(e) => {
                        updateStartDate(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="w-full flex flex-col gap-y-2">
                    <label htmlFor="end_date">End Date*</label>
                    <input
                      type="date"
                      id="end_date"
                      className="w-full p-3 border-2 focus:border-mainPurple outline-none rounded-md"
                      value={lessonDetails.end_date}
                      onChange={(e) => {
                        updateEndDate(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-mainPurple text-white rounded-md p-3 text-center w-full"
                >
                  Add Lesson
                </button>
              </form>
            </div>
          </section>
        )}
        <div className="flex justify-between items-center flex-1 gap-2">
          <h1 className="font-bold text-3xl">{topics}</h1>
          <div className="flex items-center gap-x-2">
            <div
              className="flex gap-2 items-center cursor-pointer px-2 py-3 hover:bg-gray-50"
              onClick={() => {
                setAddLessonModalOpen(true);
              }}
            >
              <IoIosAddCircleOutline className="text-4xl " />
              <h1 className="text-[1.2rem]">Add Lesson</h1>
            </div>
            <Link href="/curriculum/assignments">
              <div className="flex gap-2 items-center cursor-pointer px-2 py-3 hover:bg-gray-50">
                <IoIosAddCircleOutline className="text-4xl " />
                <h1 className="text-[1.2rem]">Add Assignment</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-[#BDBDBD] pl-[1.5rem] mb-[3rem] pb-3 mt-7 border-b-[1.3px]">
        <h2 className="text-[1.6rem] font-bold">Unit Control</h2>
      </div>
      {/* curriculumn topic section */}

      {lessons?.map((data: any,index: number) => {
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
