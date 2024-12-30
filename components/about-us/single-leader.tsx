import React from "react";
import { ILeader } from "types/interfaces/about-us.interface";

interface Props extends ILeader {}

export default function SingleLeader({ name, info, img, position }: Props) {
   return (
      <article>
         <div className="flex flex-col flex-wrap gap-x-[3rem] lg:flex-row">
            {/* image container */}
            <div className="h-[150px] max-w-[150px] flex-[.5] md:h-[200px] md:max-w-[200px] lg:h-[300px] lg:max-w-[300px]">
               <img src={img} className="h-full w-full rounded-md shadow-md hover:shadow-lg" alt="" />
            </div>
            <div className="flex-1 lg:rounded-md lg:bg-white lg:p-2 lg:shadow-md">
               <h2 className="text-[1.6rem] font-bold text-slate-600">{name}</h2>
               <h3 className="text-[1.2rem] font-bold text-slate-600">{position}</h3>
               <p className="mt-2 text-slate-500">{info}</p>
            </div>
         </div>
      </article>
   );
}
