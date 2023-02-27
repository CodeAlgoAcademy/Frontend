import Messages from '@/components/Teachers/messages/Messages';
import TeacherLayout from '@/components/Teachers/TeacherLayout';
import React from 'react';

const Index = () => {
  return (
    <TeacherLayout className='md:pl-0 md:pr-0 pt-0 pb-0 pl-0 pr-0 border overflow-hidden relative'>
      <Messages />
    </TeacherLayout>
  );
};

export default Index;
