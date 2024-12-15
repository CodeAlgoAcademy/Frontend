import Image from "next/image";
import React from "react";

const data = [
   {
      title: "Create Your Avatar",
      image: "get-started-1.png",
   },
   {
      title: "Learn by playing",
      image: "get-started-2.png",
   },
   {
      title: "Code your world",
      image: "get-started-3.png",
   },
];

const GetStarted = () => {
   return (
      <section className="p-6">
         <h1 className="text-center font-tiltWarp text-[2.1rem]">LET'S GET STARTED</h1>

         <div className="mt-6 flex items-center justify-center">
            {data?.map((d, index) => {
               return (
                  <div key={index} className="flex flex-1 flex-col items-center justify-center">
                     <Image src={`/assets/landing/${d.image}`} width={250} height={250} className="w-full" />
                     <h1 className="mt-6 text-center font-thabit text-[1.4rem] font-light">
                        {index + 1}. {d.title}
                     </h1>
                  </div>
               );
            })}
         </div>
      </section>
   );
};

export default GetStarted;
