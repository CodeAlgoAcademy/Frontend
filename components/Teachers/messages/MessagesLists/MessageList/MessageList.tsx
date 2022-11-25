import { Avatar } from '@mui/material'
import React from 'react'
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5'
import { StyledBadge } from '../../MuiConfig'

interface Message {
    message: string, 
    name: string, 
    read?: boolean, 
    online:boolean, 
    received?: boolean,
    seen?: boolean,
    sent?: boolean
}

const MessageList = ({ message, name, online, read, received, seen, sent }: Message) => {
    return (
        <div className={styles.container}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant={online ? 'dot': 'standard'}
            >
                <div className='hidden md:block'>
                    <Avatar 
                        alt={name} 
                        src='' 
                        style={{ width: 30, height: 30 }}
                    />
                </div>
                <div className='md:hidden'>
                    <Avatar 
                        alt={name} 
                        src='' 
                        style={{ width: 50, height: 50 }}
                    />
                </div>
            </StyledBadge>
            <div className={`text-[20px] md:text-xs ml-2 ${(!read && received) && 'font-bold'}` }>
                <p>{name}</p>
                <p className='text-[15px] md:text-[9px] w-60 md:w-36 truncate'>{message}</p>
            </div>
            <div className='ml-auto'>
                {!received && (
                    <div>
                        {(sent && !seen) && <IoCheckmark />}
                        {seen && <IoCheckmarkDone />}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessageList

const styles= {
    container: 'px-5 md:px-3 py-3 flex items-center cursor-pointer hover:bg-gray-300 md:hover:bg-slate-100'
}