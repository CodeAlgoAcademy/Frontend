import React, { useState, useEffect } from "react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "store/store"
import { getAllCurriculums } from "services/curriculumService"
import { Icurriculum } from "types/interfaces"

const SummaryBox = () => {
  const { curriculum } = useSelector((state: RootState) => state.allCurriculum)
  const { id } = useSelector((state: RootState) => state.currentClass)
  const [currentLesson, setCurrentLesson] = useState<Icurriculum>({
    title: "",
    description: "",
    end_date: "",
    start_date: "",
    teacher: "",
    grades: [],
    id: 0,
    standard: "",
    level: "",
    is_current: false,
    is_finished: false,
    class_model: ""
  })
  const dispatch = useDispatch()
  const getCurriculums = async () => {
    const data = await dispatch(getAllCurriculums())
    if (!data?.error?.message) {
    }
  }

  const getToday = () => {
    return {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }
  }
  const getCurriculumDate = (date: string) => {
    const newDate: string[] = date.split("-")
    return {
      day: parseInt(newDate[2]),
      month: parseInt(newDate[1]),
      year: parseInt(newDate[0]),
    }
  }
  useEffect(() => {
    const currentData = curriculum?.filter(
      (tempCurriculum: Icurriculum) => {
        if (tempCurriculum.class_model === id) {
          const today = getToday()
          const endDate = getCurriculumDate(tempCurriculum.end_date)
          const startDate = getCurriculumDate(tempCurriculum.start_date)
          if (tempCurriculum.is_current === true && tempCurriculum.is_finished === false &&
            (endDate.year > today.year ||
              (endDate.year === today.year && endDate.month > today.month) ||
              (endDate.year === today.year && endDate.month === today.month && endDate.day >= today.day)
            ) &&
            (startDate.year < today.year ||
              (startDate.year === today.year && startDate.month < today.month) ||
              (startDate.year === today.year &&
                startDate.month === today.month &&
                startDate.day <= today.day))
          ) {
            return tempCurriculum
          }
        }
      }
    )
    const lessonIndex = currentData?.length ? (Math.floor(Math.random() * 10) % currentData.length) : 0
    const lesson = currentData[lessonIndex]
    currentData?.length && setCurrentLesson(lesson)
  }, [curriculum])
  useEffect(() => {
    getCurriculums()
  }, [])
  return (
    <div className="rounded-md shadow-lg p-6 max-w-[380px] bg-white flex flex-col justify-between">
      <div>
        <h3 className="text-[20px] font-bold mb-2">
          Lesson - <span>{ currentLesson.title || "" }</span>
        </h3>
        <p className="leading-normal text-base tracking-tight mb-4">{ currentLesson.description || "" }</p>
      </div>
      <div className="rounded-md py-12 w-[100%]" style={ { backgroundColor: currentLesson.level || "green" } }>
        <div className="w-[38%] relative aspect-[12/10] mx-auto">
          {/* <Image src={ loop } alt="current-lesson" layout="fill" /> */ }
        </div>
      </div>
    </div>
  )
}

export default SummaryBox
