import React, { useState } from "react";

interface CharactersArrangementProps {
   children: React.ReactElement | React.ReactElement[];
   displayOtherChars?: boolean;
}

const CharactersArrangement = (props: CharactersArrangementProps) => {
   const [x, setX] = useState(0);
   const [y, setY] = useState(0);
   const mouseMove = (e: any) => {
      setX(e.clientX / 30);
      setY(e.clientY / 30);
   };
   return (
      <div
         className="relative  flex min-h-fit max-w-[1000px] cursor-pointer items-center justify-center lg:flex-1 "
         style={{ left: x, top: y }}
         onMouseMove={mouseMove}
      >
         {props.displayOtherChars && (
            <>
               <div className="absolute top-0 left-[20px] w-[120px] lg:-left-[20px] 2xl:left-[20px]">
                  <img src={"/assets/hello.png"} alt="" className="w-full" />
               </div>
               <div className="absolute top-0 right-[30px] w-[120px]">
                  <img src={"/assets/and.png"} alt="" className="w-full" />
               </div>
               <div className="absolute -bottom-[20px] right-[80px] w-[120px]">
                  <img src={"/assets/slash.png"} alt="" className="w-full" />
               </div>
               <div className="absolute bottom-0 w-[120px] lg:-left-[50px] 2xl:left-[50px] ">
                  <img src={"/assets/smaller.png"} alt="" />
               </div>
            </>
         )}
         <div className="mx-auto w-full max-w-[1000px]">{props.children}</div>
      </div>
   );
};

export default CharactersArrangement;
