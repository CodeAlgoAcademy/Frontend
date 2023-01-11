import { AnimatePresence, AnimateSharedLayout, Variants, motion } from 'framer-motion'
import React, { ReactNode, useEffect, useState } from 'react'
import { dismissNotification, reset, useToasts } from 'store/notificationSlice'
import { Notification } from 'types/interfaces/notifications'
import { RxCross2 } from 'react-icons/rx'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { AiOutlineWarning, AiOutlineInfoCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

const motionVariants = {
    fadeLeft:{
        initial:{
            opacity:0,
            x:'100%'
        },

        animate:{
            opacity:1,
            x:0
        },
        exit:{
            opacity:0,
            x:'100%'
        }
    }
}

const Toast = () => {
    let timeout: any;
    const notifications = useToasts()
    const dispatch = useDispatch()

    const removeNotification = (id: number, secs: number) => {
        timeout = setTimeout(() => {
            dispatch(dismissNotification(id))
        }, secs)

        clearTimeout(timeout)
    }

    const handleDismiss = (id: number) => {
        dispatch(dismissNotification(id))
    }

    console.log(notifications)

    return (
        <AnimateSharedLayout>
            <ul aria-live='assertive' className='flex fixed z-50 flex-col gap-4 m-4 lg:m-8 pointer-events-none w-full'>
                <AnimatePresence initial={false}>
                    {notifications.map(({id, type, message, autoHideDuration}, index) => (
                        <motion.li
                            key={index}
                            className={`flex w-max items-center shadow px-4 py-3 rounded border transition-colors duration-100 min-w-[260px] text-sm pointer-events-auto ${notificationStyleVariants[type]}`}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={motionVariants['fadeLeft']}
                            layout="position"
                            onMouseLeave={() => removeNotification(id, autoHideDuration)}
                        >
                            <div className="flex gap-2 items-center">
                                {notificationIcons[type]}
                                <span className="max-w-sm font-medium">{message}</span>
                            </div>

                            <div className="pl-4 ml-auto">
                                <button
                                onClick={() => handleDismiss(id)}
                                className={`p-1 rounded transition-colors duration-100 ${closeButtonStyleVariants[type]}`}
                                >
                                    <RxCross2 />
                                </button>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </AnimateSharedLayout>
    )
}

export default Toast

const notificationStyleVariants: Record<NonNullable<Notification['type']>, string> = {
    success: 'bg-green-300 border-green-600',
    error: 'bg-red-300 border-red-600',
    info: 'bg-purple-300 border-purple-600',
}

const closeButtonStyleVariants: Record<NonNullable<Notification['type']>, string> = {
    success: 'hover:bg-green-500 active:bg-green-600',
    error: 'hover:bg-red-500 active:bg-red-600',
    info: 'hover:bg-purple-500 active:bg-purple-600',
}

const notificationIcons: Record<NonNullable<Notification['type']>, ReactNode> = {
    success: <BsFillCheckCircleFill />,
    error: <AiOutlineWarning />,
    info: <AiOutlineInfoCircle />,
}