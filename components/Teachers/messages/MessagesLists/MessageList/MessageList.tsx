import { Avatar } from '@mui/material'
import React from 'react'
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { IMessage, User } from 'types/interfaces'
import { StyledBadge } from '../../MuiConfig'

interface Message {
    id: number,
    message: IMessage,
    user: User
}

const MessageList = ({ id, message, user }: Message) => {
    const dispatch = useDispatch()

    const setActiveStudent: any = () => {
        dispatch(setActiveStudent(message.user.id))
    }

    return (
        <div className={styles.container} onClick={setActiveStudent}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <div className='block'>
                    <Avatar 
                        alt={message.user.firstName} 
                        src='' 
                        style={{ width: 30, height: 30 }}
                    />
                </div>
            </StyledBadge>
            <div className='text-xs ml-2 font-bold'>
                <p>{`${message.user.firstName} ${message.user.firstName}`}</p>
                <p className='text-[9px] w-36 truncate'>{message.text}</p>
            </div>
            <div className='ml-auto'>
                {/* {!received && (
                    <div>
                        {(sent && !seen) && <IoCheckmark />}
                        {seen && <IoCheckmarkDone />}
                    </div>
                )} */}
            </div>
        </div>
    )
}

export default MessageList

const styles= {
    container: 'px-5 md:px-3 py-3 flex items-center cursor-pointer hover:bg-gray-300 md:hover:bg-slate-100'
}