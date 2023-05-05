import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const SkillBox = ({ children }: Props) => {
  return (
    <div className="rounded-xl bg-[#ECEDF3] h-fit w-full p-3">
      <div className="overflow-y-auto h-[190px] small-scroll-thumb blue-scroll-thumb skill-box">
        {children}
      </div>
    </div>
  );
};

export default SkillBox;
