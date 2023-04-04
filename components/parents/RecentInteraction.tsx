import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

interface Props {}

const recents = [
   {
      image: "3DAvatar3.png",
      name: "elitrevor",
      id: "1",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "2",
   },
   {
      image: "3DAvatar1.png",
      name: "ilovemydog",
      id: "3",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "4",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "5",
   },
   {
      image: "3DAvatar1.png",
      name: "ilovemydog",
      id: "6",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "7",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "8",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "9",
   },
   {
      image: "3DAvatar1.png",
      name: "ilovemydog",
      id: "10",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "11",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "12",
   },
   {
      image: "3DAvatar3.png",
      name: "elitrevor",
      id: "13",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "14",
   },
   {
      image: "3DAvatar1.png",
      name: "ilovemydog",
      id: "15",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "16",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "17",
   },
   {
      image: "3DAvatar1.png",
      name: "ilovemydog",
      id: "18",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "19",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "20",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "21",
   },
   {
      image: "3DAvatar1.png",
      name: "ilovemydog",
      id: "22",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "23",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "24",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "25",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "26",
   },
   {
      image: "3DAvatar1.png",
      name: "ilovemydog",
      id: "27",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "28",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "29",
   },
   {
      image: "3DAvatar2.png",
      name: "hannah12",
      id: "30",
   },
];

const RecentInteraction = ({}: Props) => {
   const [recentIndex, setRecentIndex] = useState(0);
   const [sliceStart, setSliceStart] = useState(recentIndex * 3);
   const [sliceEnd, setSliceEnd] = useState(recentIndex * 3 + 3);
   const maxIndex = Math.ceil(recents.length / 3);
   const positionX = useMotionValue(0);
   useEffect(() => {
      setSliceStart(() => recentIndex * 3);
      setSliceEnd(() => recentIndex * 3 + 3);
   }, [recentIndex]);
   return (
      <>
         <p className="mt-14 text-sm font-light">Recent interactions (last 30 days)</p>
         <p className="text-slate-400 text-2xl grid h-40 place-content-center italic">Coming soon...</p>
         {/* UNCOMMENT BLOCK OF CODE WHEN NECESSARY DETAILS ARE READY */}
         {/* <div className="mt-5 w-[320px] overflow-hidden">
            <motion.ul className="flex gap-3" style={{ x: positionX }} transition={{ duration: 2 }}>
               {recents.map(({image,name,id}) => (
            <li className='min-w-[100px] flex flex-col gap-1 text-center items-center' key={id}>
              <Image src={`/assets/${image}`} alt={image} height={100} width={100} className="select-none" />
              <p className='text-[#2073FA] text-sm'>{name}</p>
              <Image src="/assets/message.svg" alt="messages" width={18} height={18} className="blue-svg" />
            </li>
          ))}
            </motion.ul>
         </div> */}
         <p className="text-[#A8ABB0] absolute text-sm bottom-5 text-center left-0 opacity-80 w-full select-none">
            All mail communication will go to the user’s parent account.{" "}
         </p>
         {/* UNCOMMENT BLOCK OF CODE WHEN NECESSARY DETAILS ARE READY */}
         {/* {recentIndex !== maxIndex - 1 && (
            <svg
               width="12"
               height="22"
               viewBox="0 0 12 22"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               className="absolute hover:scale-x-125 hover:opacity-100 opacity-80 right-6 top-[50%] translate-y-[-50%]"
               onClick={() => {
                  setRecentIndex(() => recentIndex + 1);
                  // positionX.set((recentIndex + 1) * -336);
                  animate(positionX, (recentIndex + 1) * -336);
               }}
            >
               <path
                  d="M0.748372 22C0.558522 22 0.364234 21.9262 0.21854 21.7829C-0.0728468 21.4962 -0.0728468 21.0272 0.21854 20.7405L10.1921 10.9251L0.364234 1.25736C0.072847 0.970698 0.072847 0.501622 0.364234 0.214981C0.655622 -0.0716603 1.13244 -0.0716603 1.42383 0.214981L11.7815 10.4039C12.0728 10.6905 12.0728 11.1596 11.7815 11.4462L1.27814 21.7828C1.13244 21.9261 0.9382 22 0.74835 22L0.748372 22Z"
                  fill="#2073FA"
               />
            </svg>
         )}
         {recentIndex !== 0 && (
            <svg
               width="12"
               height="22"
               viewBox="0 0 12 22"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               className="absolute hover:scale-x-125 hover:opacity-100 opacity-80 rotate-180 left-6 top-[50%] translate-y-[-50%]"
               onClick={() => {
                  setRecentIndex(() => recentIndex - 1);
                  animate(positionX, (recentIndex - 1) * -336);
               }}
            >
               <path
                  d="M0.748372 22C0.558522 22 0.364234 21.9262 0.21854 21.7829C-0.0728468 21.4962 -0.0728468 21.0272 0.21854 20.7405L10.1921 10.9251L0.364234 1.25736C0.072847 0.970698 0.072847 0.501622 0.364234 0.214981C0.655622 -0.0716603 1.13244 -0.0716603 1.42383 0.214981L11.7815 10.4039C12.0728 10.6905 12.0728 11.1596 11.7815 11.4462L1.27814 21.7828C1.13244 21.9261 0.9382 22 0.74835 22L0.748372 22Z"
                  fill="#2073FA"
               />
            </svg>
         )} */}
      </>
   );
};

export default RecentInteraction;
