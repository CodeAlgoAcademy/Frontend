import ParentLayout from '@/components/parents/ParentLayout';
import SideNav from '@/components/parents/ParentSideNav';
import React from 'react';
import ContentBox from '@/components/parents/ContentBox';
import RecentInteraction from '@/components/parents/RecentInteraction';
import KidsFriend from '@/components/parents/KidsFriend';
import AddAFriend from '@/components/parents/AddAFriend';

const Multiplayer = () => {
  return (
    <ParentLayout>
      <div className="flex items-start justify-around flex-wrap mx-auto gap-x-3 gap-y-10 mb-6">
        <ContentBox size="base" title="Multiplayer" padding="large" link="parents/multiplayer">
          <RecentInteraction />
        </ContentBox>
        <ContentBox size="base" title="Friends" padding="large" link="parents/multiplayer">
          <KidsFriend />
        </ContentBox>
        <ContentBox size="large" title="Add a friend" padding="large">
          <AddAFriend />
        </ContentBox>
      </div>
    </ParentLayout>
  );
};

export default Multiplayer;
