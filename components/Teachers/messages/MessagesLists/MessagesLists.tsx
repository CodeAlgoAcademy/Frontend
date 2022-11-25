import React from 'react'
import MessageList from './MessageList/MessageList'
import { data } from './sampleData'

const MessagesLists = () => {
  return (
    <div className='overflow-x-auto md:h-48'>
      {data.map(({ id, message, name, online, read, received, seen, sent }) => (
        <div key={id}>
          <MessageList 
            message={message}
            name={name}
            online={online}
            read={read}
            received={received}
            seen={seen}
            sent={sent}
          />
        </div>
      ))}
    </div>
  )
}

export default MessagesLists