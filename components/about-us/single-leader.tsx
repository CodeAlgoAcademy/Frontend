import React from "react";
import { ILeader } from "types/interfaces/about-us.interface";

interface Props extends ILeader {}

export default function SingleLeader({ name, info, img, position }: Props) {
   return (
      <article>
         <div className="mx-auto h-[250px] w-[250px]">
            <img src={img} className="h-full w-full rounded-md object-cover shadow-md hover:shadow-lg" alt="" />
         </div>
         <h1 className="mt-4 text-center font-thabit text-[1.8rem] font-bold leading-tight text-mainPink">{name}</h1>
         <p className="mt-1 text-center font-thabit text-[1.2rem] font-bold">{position}</p>
         <p className="mt-1 text-center font-thabit text-[1rem] font-bold leading-tight">{info}</p>
      </article>
   );
}
