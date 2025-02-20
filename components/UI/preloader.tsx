import React from "react";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
const Preloader = () => {
   const { loading, loadingText } = useSelector((state: RootState) => state.fetch);
   if (!loading) {
      return <></>;
   }
   return (
      <section className="fixed top-0 left-0 z-[90] flex h-screen w-[100vw] flex-col items-center justify-center gap-y-4 bg-[rgba(0,0,0,0.5)]">
         <span className="border-t-mainColor h-[45px] w-[45px] animate-spin rounded-full border-[6px] border-white text-[35px] font-bold"></span>
         <h1 className="text-[20px] font-bold text-white">
            {loadingText} <span className="dots-animation">...</span>
         </h1>
      </section>
   );
};

export default Preloader;
