import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import MessageList from './MessageList/MessageList';
import {getConversations} from 'store/messagesSlice';
import {RootState} from 'store/store';

const MessagesLists = () => {
  const {conversations} = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
  },[dispatch]);

  return (
    <div className="overflow-x-auto h-48">
      {conversations?.length !== 0 ? (
        <>
          {conversations?.map(({id,message,user}: any) => (
            <div key={id}>
              <MessageList message={message} user={user} id={id} />
            </div>
          ))}
        </>
      ) : (
        <div className="h-full w-full grid place-content-center">
          <p>There are no Conversations</p>
        </div>
      )}
    </div>
  );
};

export default MessagesLists;
