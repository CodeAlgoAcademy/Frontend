import Button, { CustomButton } from "@/components/UI/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { cn } from "utils";

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
      link: "/signup/student",
   },
];

const GetStarted = () => {
   const { push } = useRouter();

   return (
      <section className="p-6">
         <div className="mx-auto mt-12 mb-8 h-[6px] w-[500px] max-w-[90vw] bg-pinkGradient"></div>

         <h1 className="cursor-pointer text-center font-tiltWarp text-[2.1rem] max-md:text-[1.5rem]" onClick={() => push("/signup")}>
            SIGN UP TODAY!
         </h1>

         <div className="mt-8 flex items-center justify-center gap-y-8 gap-x-24 max-md:flex-col">
            {data?.map((d, index) => {
               return (
                  <div key={index} className="flex flex-col items-center justify-center" onClick={() => d.link && push(d.link)}>
                     <Image src={`/assets/landing/${d.image}`} width={250} height={250} className="w-full" />
                     <CustomButton onClick={() => push("/login")} className="mt-6 !inline-block text-white" variant="filled">
                        <span className="no-contrast-adjust">{d.title}</span>
                     </CustomButton>
                  </div>
               );
            })}
         </div>
      </section>
   );
};

export default GetStarted;
