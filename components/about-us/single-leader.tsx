import React from "react";
import { ILeader } from "types/interfaces/about-us.interface";

interface Props extends ILeader {}

export default function SingleLeader({ name, info, img, position }: Props) {
   return (
      <article>
         <div className="mx-auto h-[250px] w-[250px]">
            <img src={img} className="h-full w-full rounded-md object-contain" alt="" />
         </div>
         <h1 className="mt-4 text-center font-thabit text-[1.8rem] font-bold leading-tight text-mainPink max-md:text-[1.5rem]">{name}</h1>
         <p className="mt-1 text-center font-thabit text-[1.2rem] font-bold max-md:text-[1.1rem]">{position}</p>
         <p className="mt-1 text-center font-thabit text-[1rem] leading-tight max-md:text-[.9rem]">{info}</p>
      </article>
   );
}
