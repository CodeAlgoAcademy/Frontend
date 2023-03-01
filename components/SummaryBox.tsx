import React,{useState,useEffect,useCallback} from 'react';
import Image from 'next/image';
import {useDispatch,useSelector} from 'react-redux';
import {RootState} from 'store/store';
import {getAllCurriculums} from 'services/curriculumService';
import {Icurriculum} from 'types/interfaces';

const SummaryBox = () => {
  const {curriculum} = useSelector((state: RootState) => state.allCurriculum);
  const {id} = useSelector((state: RootState) => state.currentClass);
  const [currentLesson,setCurrentLesson] = useState<Icurriculum>({
    title: '',
    description: '',
    end_date: '',
    start_date: '',
    teacher: '',
    grades: [],
    id: 0,
    standard: '',
    level: '',
    is_current: false,
    is_finished: false,
    class_model: '',
  });
  const dispatch = useDispatch();
  const getCurriculums = useCallback(async () => {
    const data = await dispatch(getAllCurriculums());
    if(!data?.error?.message) {
    }
  },[dispatch]);
  useEffect(() => {
    const currentData = curriculum?.filter((tempCurriculum: Icurriculum) => {
      if(tempCurriculum.class_model === id) {
        if(
          tempCurriculum.is_finished === false &&
          new Date(tempCurriculum.start_date) <= new Date()
        ) {
          return tempCurriculum;
        }
      }
    });
    const lessonIndex = currentData?.length
      ? Math.floor(Math.random() * 10) % currentData.length
      : 0;
    const lesson = currentData[lessonIndex];
    currentData?.length && setCurrentLesson(lesson);
  },[id,curriculum]);
  useEffect(() => {
    getCurriculums();
  },[getCurriculums]);
  return (
    <div className="rounded-md shadow-lg p-6 w-[380px] max-w-full bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-[20px] font-bold mb-2 text-[#2073fa]">
          Lesson - <span>{currentLesson.title || ''}</span>
        </h3>
        <p className="leading-normal text-base tracking-tight mb-4">
          {currentLesson.description || ''}
        </p>
      </div>
      <div
        className="rounded-md py-12 w-[100%]"
        style={{backgroundColor: currentLesson.level || 'green'}}
      >
        <div className="w-[38%] relative aspect-[12/10] mx-auto">
          {/* <Image src={ loop } alt="current-lesson" layout="fill" /> */}
        </div>
      </div>
    </div>
  );
};

export default SummaryBox;
