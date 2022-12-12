import { FiPlus } from 'react-icons/fi'
import { IconButton, TextField } from '@mui/material'
import React, { useRef } from 'react'
import { RiCloseLine } from 'react-icons/ri'

const AddStudentModal = ({ setIsOpen }: { setIsOpen: any }) => {
    const filePickerRef = useRef<HTMLInputElement>(null)

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
                        <form className='grid gap-5 pb-2'>
                            <div className='flex space-x-5'>
                                <TextField 
                                    label='Student ID'
                                    name='id'
                                    size='small'
                                    required
                                />
                                <TextField 
                                    label='Student Name'
                                    name='name'
                                    size='small'
                                    required
                                />
                            </div>
                            <TextField 
                                label='Student Email'
                                name='name'
                                size='small'
                                required
                            />
                            <div>
                                <button className={styles.addBtn} type='submit'>
                                    Add Student
                                </button>
                            </div>
                        </form>
                        <p className='italic text-lg'>or</p>
                        <div className='grid place-items-center'>
                            <button 
                                onClick={() => filePickerRef.current?.click()} 
                                className={styles.bulkBtn}
                            >
                                <FiPlus size={23} className={styles.plusIcon} />
                                <p className='sm:block'>Bulk Import</p>
                            </button>
                            <input 
                                ref={filePickerRef}
                                hidden 
                                type='file' 
                                accept='.xls, .xlsx' 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStudentModal

const styles = {
    bgBlack: 'bg-black bg-opacity-60 w-[100vw] h-[100vh] z-0 top-0 left-0 grid place-items-center absolute',
    centered: ' place-items-center fixed',
    modal: 'border-l-[40px] border-l-yellow-500 relative w-4/5 bg-[#f4f4f4] z-10 rounded-xl shadow-lg',
    modalHeader: 'h-14 bg-[#f4f4f4] overflow-hidden rounded-tl-2xl rounded-tr-2xl',
    heading: 'm-0 p-3 text-[#2c3e50] font-medium text-2xl text-center',
    closeBtn: 'absolute top-0 right-0 text-[#f4f4f4] hover:bg-opacity-50 -mt-2 -mr-2 text-lg cursor-pointer p-1 rounded-full bg-red-500',
    modalBody: 'p-3 text-sm text-[#2c3e50] text-center',
    addBtn: 'bg-purple-900 p-3 rounded-3xl text-white hover:bg-opacity-90 transition-all duration-500',
    bulkBtn: 'flex space-x-3 text-center items-center hover:bg-slate-200 p-3',
    plusIcon: 'border border-slate-700 rounded-full'
}