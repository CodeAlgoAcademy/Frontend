import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import preview1 from "../../public/assets/preview1.png";
import preview2 from "../../public/assets/preview2.png";
import Image from "next/image";

type modalProps = {
   showPreview: boolean;
   cancelPreview: (event: React.MouseEvent) => void;
};

// this is the modal that pops up when preview is clicked

export default function PreviewModal(props: modalProps) {
   const backdropVariant = {
      hidden: {
         opacity: 0,
      },
      visible: {
         opacity: 1,
      },
   };

   const modal = {
      hidden: {
         y: "-100vh",
         opacity: 0,
      },
      visible: {
         y: "20px",
         opacity: 1,
         transition: { delay: 0.5 },
      },
   };

   return (
      <AnimatePresence exitBeforeEnter>
         {props.showPreview && (
            <motion.div
               className="fixed top-0 left-0 z-[50] flex h-screen w-full items-center justify-center bg-black bg-opacity-50"
               variants={backdropVariant}
               initial="hidden"
               animate="visible"
               exit="hidden"
            >
               <motion.div
                  variants={modal}
                  className=" relative mx-auto my-auto flex h-fit max-h-[90vh] w-[90vw] max-w-[50rem] flex-col overflow-hidden overflow-y-scroll rounded-[10px] bg-white px-12 pt-6 pb-10 md:flex-row"
               >
                  <div className="cursor-pointer" onClick={(event) => props.cancelPreview(event)}>
                     <GiCancel className="absolute top-[26px] right-[26px] ml-auto text-[2rem]" />
                  </div>
                  <div className="mt-10 flex-1 md:pr-8">
                     <h1 className="text-2xl font-bold text-black">Curriculum Statements</h1>
                     <h1 className="mt-10 text-xl font-bold text-black">Lesson Description</h1>
                     <p className="">In this lesson students will learn the basics of loops and how to apply loops into their programs.</p>
                     <button className="text-mainColor border-mainColor hover:bg-mainColor mt-10 rounded-full border px-7 py-2 font-bold transition duration-300 hover:text-white">
                        View quiz
                     </button>
                  </div>

                  <div className="mt-8 flex flex-1 flex-col gap-y-10 md:mt-0 md:border-l md:border-[#D1D1D1] md:pl-10">
                     <div>
                        <h1 className="mb-3 text-xl font-bold text-black">Lesson Description</h1>
                        <div className="h-full max-h-[150px] w-full max-w-[250px]">
                           <Image src={preview1} objectFit="cover" width={250} height={150} quality={100} alt="" />
                        </div>
                     </div>
                     <div>
                        <h1 className="mb-3 text-xl font-bold text-black">Lesson Description</h1>
                        <div className="h-full max-h-[150px] w-full max-w-[250px]">
                           <Image src={preview2} objectFit="cover" width={250} height={150} quality={100} alt="" />
                        </div>
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
}
