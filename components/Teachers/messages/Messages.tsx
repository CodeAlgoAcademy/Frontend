import { IconButton } from '@mui/material'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { FiPlus } from 'react-icons/fi'
import { HiDotsVertical } from 'react-icons/hi'
import ChatRoom from './Chats/ChatRoom'
import MessagesLists from './MessagesLists/MessagesLists'

const Messages = () => {
    return (
        <>
            {/* Large view */}
            <div className={styles.container}>
                <div className={styles.containerBody}>
                    <div className='space-y-10'>
                        <ul className={styles.informationBox}>
                            <li className={styles.boxList}>
                                <p>All Messages</p>
                                <p className='text-center text-slate-400'>22</p>
                            </li>
                            <li className={styles.boxList}>
                                <p>Important Messages</p>
                                <p className={styles.important}>4</p>
                            </li>
                            <li className={styles.boxList}>
                                <p>Unread Messages</p>
                                <p className='text-center'>15</p>
                            </li>
                            <li className={styles.boxList}>
                                <p>Drafts</p>
                                <p className='text-center'>3</p>
                            </li>
                        </ul>

                        <div className={styles.searchBox}>
                            <div className={styles.inputContainer}>
                                <AiOutlineSearch size={20} />
                                <input 
                                    className={styles.searchBoxInput}
                                    placeholder='Search messages'
                                />
                            </div>
                            <div>
                                <MessagesLists />
                            </div>
                        </div>
                    </div>

                    <div className={styles.chatroom}>
                        <ChatRoom />
                    </div>
                </div>
            </div>


            {/* Mobile View */}
            {/* <div className='md:hidden bg-[#a5a091] h-screen'>
                <div className="bg-[#8D887C] py-5 pl-5 pr-4 flex items-center justify-between">
                    <p className='text-[20px]'>Messages</p>
                    <div className='flex space-x-1'>
                        <IconButton>
                            <AiOutlineSearch size={25} />
                        </IconButton>
                        <IconButton>
                            <HiDotsVertical size={25} />
                        </IconButton>
                    </div>
                </div>

                <div className='py-3'>
                    <MessagesLists />
                </div>

                <div className='fixed bottom-10 right-5'>
                    <IconButton>
                        <FiPlus size={45} color='white' className='bg-yellow-400 rounded-full' />
                    </IconButton>
                </div>
            </div> */}
        </>
    )
}

export default Messages

const styles = {
    container: 'bg-gray-200 block px-5 md:px-20 py-5 h-screen',
    containerBody: 'flex justify-start p-5 space-x-32',
    informationBox: 'bg-white p-5 text-xs font-light w-60 rounded-lg shadow-lg',
    boxList: 'flex justify-between p-2 items-center',
    important: 'bg-red-500 rounded-full p-[3px] text-[9px] w-4 h-4 flex justify-center items-center text-white font-semibold',
    searchBox: 'bg-white rounded-lg pb-1 text-slate-800 shadow-lg',
    inputContainer: 'bg-gray-300 flex p-2 rounded-t-lg items-center px-2',
    searchBoxInput: 'outline-none bg-transparent pl-2 p-1 text-sm placeholder:text-slate-700',
    chatroom: 'w-[528px] bg-slate-50 rounded-xl shadow pt-3',
}