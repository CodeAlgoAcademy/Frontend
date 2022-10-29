import { useState } from 'react';
import {GiCancel} from 'react-icons/gi';
import {motion, AnimatePresence} from 'framer-motion'


type modalProps = {
    showModal: boolean
    cancelPresence:(event: React.MouseEvent) => void
}


// this is the modal that pops up when add Student is clicked


export default function AddStudent(props:modalProps) {
    
    const backdropVariant = {
        hidden: {
            opacity: 0
        },
        visible:  {
            opacity: 1,
        }
    }
    
    const modal = {
        hidden: {
            y: '-100vh',
            opacity: 0
        }, 
        visible: {
            y: '20px',
            opacity: 1,
            transition: {delay: 0.5}
        }
    }
    
  return (
    <AnimatePresence exitBeforeEnter>
    {props.showModal && (<motion.div 
        className='bg-black z-[500] bg-opacity-50 top-0 fixed w-full h-full'
        variants={backdropVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
    >
        <motion.div  variants={modal} className=' bg-white mt-[4rem] w-[60%] mx-auto px-12 pt-6 pb-10 rounded-[10px]'>
            <div className='cursor-pointer' onClick={(event) => props.cancelPresence(event)}><GiCancel className='text-[2rem] ml-auto'/></div>
            <h1 className='text-3xl font-bold text-black px-4'>
                Add Student
            </h1>
            <div>
                <div className='flex items-center justify-between border-b-2 mt-10 px-4'>
                    <p className='text-2xl font-bold'>Class C</p>
                    <div className='flex gap-[1rem] items-center'>
                        <input type="checkbox"  className='w-[20px] h-[20px] border-black border-2'/>
                        <p className='text-[1rem]'>Select All Student</p>
                    </div>
                </div>
            </div>
            <div className='mt-[2rem] flex justify-end'>
                <button className="px-8 py-4  text-white rounded-full font-bold bg-[#412281]">Add Student(s)</button>
            </div>
        </motion.div>
    </motion.div>)}
    </AnimatePresence>
  )
}
