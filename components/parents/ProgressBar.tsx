import React, { StyleHTMLAttributes } from 'react';

interface Props {
  title: string;
  titleSize: 'small' | 'base';
  percentage: number;
  color: 'red' | 'green';
}

const ProgressBar = ({ title, titleSize, percentage, color }: Props) => {
  const progressBarStyle = {
    width: `${percentage <= 100 ? percentage : ''}%`,
  };
  const baseTitle = 'min-w-[84px] max-w-[84px] text-base font-semibold';
  const smallTitle = 'min-w-[84px] max-w-[84px] text-sm font-medium text-[#A8ABB0]';
  return (
    <div className="h-5 flex items-center">
      <p className={titleSize === 'base' ? baseTitle : smallTitle}>{title}</p>
      <span className="rounded-r-xl bg-[#ECEDF3] h-full w-full progress-indicator-bar relative">
        <span
          className={`rounded-r-xl h-full top-0 left-0 pr-[10px] text-right text-sm text-white block ${
            color === 'green' ? 'green-progress-bar' : 'red-progress-bar'
          }`}
          style={progressBarStyle}
        >
          {percentage}%
        </span>
      </span>
    </div>
  );
};

export default ProgressBar;
