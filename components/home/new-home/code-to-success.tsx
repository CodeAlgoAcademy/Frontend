import { CustomButton } from "@/components/UI/Button";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { BsBag, BsBagFill, BsPinMapFill } from "react-icons/bs";

const CodeToSuccess = () => {
   return (
      <section className="mx-auto max-w-[1200px] p-6">
         <h1 className="text-center font-tiltWarp text-[2.1rem] max-md:text-[1.5rem]">CODE YOUR WAY TO SUCCESS</h1>

         <div className="mt-8 flex items-center justify-center gap-8 max-md:flex-col">
            <SingleJob jobLink="https://prox.org/students" location="Kansas City, MO" title="Software Engineer Internship" company="ProX" />
         </div>
      </section>
   );
};

interface JobProps {
   title: string;
   company: string;
   location: string;
   jobLink: string;
}

const SingleJob: FC<JobProps> = ({ title, company, location, jobLink }) => {
   const { push } = useRouter();
   return (
      <div className="max-w-[260px] rounded-xl border p-6 font-thabitBold">
         <div className="mx-auto max-w-fit rounded-xl bg-gray-300 p-2 text-[.8rem]">
            <p className="text-center font-bold">
               50 Hours of CodeAlgo <br /> Experience
            </p>
         </div>

         <p className="mt-4 text-center text-[.8rem] font-bold">{title}</p>

         <div className="mt-5 flex items-center justify-center gap-4">
            <p className="flex items-center gap-2  text-[.8rem]">
               <span>
                  <BsBagFill className="text-gray-500" />
               </span>
               {company}
            </p>
            <p className="flex items-center gap-2  text-[.8rem]">
               <span>
                  <BsPinMapFill className="text-gray-500" />
               </span>
               {location}
            </p>
         </div>

         <CustomButton onClick={() => push(jobLink)} variant="filled" className="mx-auto mt-4  text-[.8rem] text-mainBlack" fullWidth>
            {"View Salary & More Info"}
         </CustomButton>
      </div>
   );
};

export default CodeToSuccess;
