import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
const Preloader = () => {
  const { loading, loadingText } = useSelector((state: RootState) => state.fetch);
  if (!loading) {
    return <></>;
  }
  return (
    <section className="w-[100vw] h-screen fixed top-0 left-0 flex flex-col gap-y-4 justify-center items-center bg-[rgba(0,0,0,0.5)] z-[90]">
      <span className="text-[35px] font-bold text-[#2073fa] animate-spin">
        <FaSpinner />
      </span>
      <h1 className="text-[20px] font-bold text-white">
        {loadingText} <span className="dots-animation">...</span>
      </h1>
    </section>
  );
};

export default Preloader;
