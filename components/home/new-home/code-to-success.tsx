import { CustomButton } from "@/components/UI/Button";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { BsBag, BsBagFill, BsPinMapFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";

const CodeToSuccess = () => {
   return (
      <section className="bg-[#040404] px-6 pb-28 pt-12 text-white md:pb-48">
         <div className="mx-auto max-w-[1200px]">
            <h1 className="mx-auto mt-6 max-w-fit rounded-md bg-mainRed py-3 px-5 text-center font-tiltWarp text-[1.9rem] font-bold text-white shadow-md max-md:text-[1.5rem]">
               {"CODE YOUR WAY TO SUCCESS"}
            </h1>

            <div className="mt-8 flex items-center justify-center gap-8 max-md:flex-col">
               <SingleJob jobLink="https://prox.org/students" location="Kansas City, MO" title="Software Engineer Internship" company="ProX" />
            </div>
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
      <div className="w-full max-w-[520px] rounded-3xl border bg-white px-4 pt-4 pb-8 font-tiltWarp text-black">
         <div className="mx-auto mb-2 max-w-fit rounded-md bg-[#d9d9d9]/70 p-2 text-[.9rem]">
            <p className="text-center font-bold">50 Hours of CodeAlgo Experience</p>
         </div>

         <div className="flex items-center justify-between gap-x-8 gap-y-2 max-md:flex-col">
            <div className="flex-[1.3]">
               <p className="mt-4 text-center text-[1.05rem] font-bold tracking-wide">{title}</p>

               <div className="mt-2 flex items-center justify-center gap-4">
                  <p className="flex items-center gap-1 text-[.9rem] font-bold">
                     <span>
                        <BsBagFill className="text-gray-500" />
                     </span>
                     {company}
                  </p>
                  <p className="flex items-center gap-1 text-[.9rem] font-bold">
                     <span>
                        <MdLocationPin className="text-gray-500" />
                     </span>
                     {location}
                  </p>
               </div>
            </div>

            <div className="flex-[1]">
               <CustomButton
                  onClick={() => push(jobLink)}
                  variant="filled"
                  className="mx-auto mt-4 max-w-fit rounded-full bg-mainRed !py-4 text-[.8rem] font-bold tracking-wide text-white !shadow-lg hover:bg-mainRed/80"
                  fullWidth
                  size="medium"
               >
                  {"View Salary & More Info"}
               </CustomButton>
            </div>
         </div>
      </div>
   );
};

export default CodeToSuccess;
