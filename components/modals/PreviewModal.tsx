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
          className="bg-black z-[500] bg-opacity-50 top-0 fixed w-full h-full"
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={modal}
            className=" bg-white mt-[4rem] w-[50rem] mx-auto px-12 pt-6 pb-10 rounded-[10px] flex"
          >
            <div className="flex-1 pr-8 mt-10">
              <h1 className="text-2xl font-bold text-black">
                Curiculumn Statements
              </h1>
              <h1 className="text-xl font-bold text-black mt-10">
                Lesson Description
              </h1>
              <p className="">
                In this lesson students will learn the basics of loops and how
                to apply loops into their programs.
              </p>
              <button className="px-7 py-2 rounded-full font-bold text-[#412281] border border-[#412281] mt-10">
                View quiz
              </button>
            </div>

            <div className="flex-1 pl-10 border-l border-[#D1D1D1]">
              <div
                className="cursor-pointer"
                onClick={(event) => props.cancelPreview(event)}
              >
                <GiCancel className="text-[2rem] ml-auto" />
              </div>
              <h1 className="text-xl font-bold text-black mt-8">
                Lesson Description
              </h1>
              <Image
                src={preview1}
                objectFit="cover"
                width={250}
                height={150}
                quality={100}
                alt=""
              />
              <h1 className="text-xl font-bold text-black mt-10">
                Lesson Description
              </h1>
              <Image
                src={preview2}
                objectFit="cover"
                width={250}
                height={150}
                quality={100}
                alt=""
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
