import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { addStudent } from 'store/studentSlice'
import { Student } from 'types/interfaces'

interface State {
    firstName: string,
    lastName: string,
    email: string
}

const AddStudentModal = ({ setIsOpen }: { setIsOpen: any }) => {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState<State>({
        firstName: '',
        lastName: '',
        email: ''
    })
    const { email, firstName, lastName } = formData;

    const onChange = (e: any) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const onSubmit = (e: any) => {
        e.preventDefault()

        const data: Student = {
            firstName,
            lastName,
            email
        }

        dispatch(addStudent(data))
    }

    return (
        <div className={styles.bgBlack}>
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <p className={styles.heading}>
                            Add Student
                        </p>
                    </div>
                    <div onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                        <RiCloseLine />
                    </div>
                    <div className={styles.modalBody}>
                        <form className='grid gap-5 pb-2' onSubmit={onSubmit}> 
                            <div className='flex space-x-5'>
                                <TextField 
                                    label='Student First Name'
                                    name='firstname'
                                    value={firstName}
                                    onChange={onChange}
                                    size='small'
                                    required
                                />
                                <TextField 
                                    label='Student Last Name'
                                    name='lastname'
                                    size='small'
                                    value={lastName}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <TextField 
                                label='Student Email'
                                name='email'
                                size='small'
                                value={email}
                                onChange={onChange}
                                required
                            />
                            <div>
                                <button className={styles.addBtn} type='submit'>
                                    Add Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStudentModal

const styles = {
    bgBlack: 'bg-black bg-opacity-60 w-[100vw] h-[100vh] z-0 top-0 left-0 grid place-items-center absolute',
    centered: 'grid place-items-center fixed',
    modal: 'border-l-[40px] border-l-yellow-500 relative w-4/5 bg-[#f4f4f4] z-10 rounded-xl shadow-lg',
    modalHeader: 'h-14 bg-[#f4f4f4] overflow-hidden rounded-tl-2xl rounded-tr-2xl',
    heading: 'm-0 p-3 text-[#2c3e50] font-medium text-2xl text-center',
    closeBtn: 'absolute top-0 right-0 text-[#f4f4f4] hover:bg-opacity-50 -mt-2 -mr-2 text-lg cursor-pointer p-1 rounded-full bg-red-500',
    modalBody: 'p-3 text-sm text-[#2c3e50] text-center',
    addBtn: 'bg-purple-900 p-3 rounded-3xl text-white hover:bg-opacity-90 transition-all duration-500',
    bulkBtn: 'flex space-x-3 text-center items-center hover:bg-slate-200 p-3',
    plusIcon: 'border border-slate-700 rounded-full'
}