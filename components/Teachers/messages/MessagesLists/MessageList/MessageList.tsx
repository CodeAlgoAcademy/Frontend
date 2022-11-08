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
                <Avatar alt={name} src='' sx={{ width: 32, height: 32 }} />
            </StyledBadge>
            <div className={`text-xs ml-2 ${(!read && received) && 'font-bold'}` }>
                <p>{name}</p>
                <p className='text-[9px] w-36 truncate'>{message}</p>
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
    container: 'px-3 py-2 flex items-center cursor-pointer hover:bg-slate-100'
}