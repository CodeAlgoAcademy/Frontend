import Messages from '@/components/Teachers/messages/Messages';
import TeacherLayout from '@/components/Teachers/TeacherLayout';
import React from 'react';

const index = () => {
  return (
    <TeacherLayout className='pl-0 pr-0 pt-0 pb-0 border-t'>
      <Messages />
    </TeacherLayout>
  );
};

export default index;
