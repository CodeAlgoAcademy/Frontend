import React, { useEffect, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import StudentTable from './StudentTable'
import { sample_student_data } from './data'
import { useDispatch, useSelector } from 'react-redux'
import { getStudents } from 'store/studentSlice'
import { IUserStudent } from 'types/interfaces'

const Students = () => {
    const dispatch = useDispatch()
    const [headings, setHeadings] = useState<number[]>([])
    const { students } = useSelector((state: any) => state.students)

    useEffect(() => {
        dispatch(getStudents())
    }, [dispatch])

    const handleStudents = (id: number) => {
        const index = headings.indexOf(id)
        
        if(index !== -1) {
            setHeadings((headings) => [...headings.slice(0, index), ...headings.slice(index + 1)])
        } else {
            setHeadings((headings) => [...headings, id])
        }
    }

    console.log(students)

    return (
        <div className={styles.container}>
            {students?.students?.map((student: any) => (
                <div key={student.id} className='bg-[#fff] shadow-lg'>
                    <div className={styles.cardHeader}>
                        <div className='flex items-center'>
                            <div className={styles.cardHeaderName} onClick={() => handleStudents(student.id)}>
                                <p className={styles.studentName}>{`${student.firstName} ${student.lastName}`}</p>
                                {headings.includes(student.id) ? <IoIosArrowUp />: <IoIosArrowDown />}
                            </div>
                            <div className='text-[12px] px-2'>
                                <span className={(student.active ? 'bg-green-500': 'border-2') + styles.active}></span>
                                {student.active ? `Active in ${student.active}`: 'Inactive'}
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <IoChatbubblesOutline className={styles.pointer} />
                            <HiOutlineDotsHorizontal className={styles.pointer} />
                        </div>
                    </div>

                    {students?.courses?.length === 0 ? (
                        <p className='w-full h-full grid place-content-center'>
                            <span>No lesson available</span>
                        </p>
                    ) : (
                        <>
                            {headings.includes(student?.id) && (
                                <StudentTable details={student?.courses} />
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Students

const styles = {
    container: 'sm:px-10 md:px-20 space-y-1',
    cardHeader: 'flex justify-between py-6 px-2 sm:px-6 border-b items-center',
    cardHeaderName: 'cursor-pointer w-28 sm:w-40 justify-between px-2 border-r flex space-x-3 items-center',
    studentName: 'text-sm font-medium truncate w-full',
    active: ' rounded-[50%] inline-block w-[8px] h-[8px] mr-2',
    actions: 'flex text-[20px] text-slate-500 space-x-5',
    pointer: 'cursor-pointer'
}