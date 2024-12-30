import React, { useState } from "react";
import SingleLeader from "./single-leader";
import { ILeader } from "types/interfaces/about-us.interface";

const leaders: ILeader[] = [
   {
      name: "Triumfia Fulks",
      position: "CoFounder and CEO",
      info: "Triumfia Houmbie Fulks, an adept software engineer with 7+ years' experience and a serial entrepreneur, holds a bachelor's degree in business administration and a master's degree in computer science. Driven by her passion for education and impact, she founded CodeAlgo to cultivate critical thinking, problem-solving, and authentic coding skills in students. Her vision is to inspire and empower the next generation of tech innovators by providing a fun and engaging platform for learning essential coding skills.",
      img: "/assets/Triumfia_Fulks.png",
   },
   {
      name: "Sedric Hibler",
      position: "CoFounder and CTO",
      info: `Sedric Hibler is a Software Engineer with 17+ years' of experience in the IT industry. With his profound experience in software development and IT, Sedric stands as a technical authority, guaranteeing the solidity and excellence of CodeAlgo's platform. \n His unwavering dedication to education underscores his commitment to CodeAlgo's mission. He is determined to close the technology literacy gap and empower the upcoming generation.`,
      img: "/assets/Sedric_Hibler.png",
   },
];

export default function Leadership() {
   const [leader, setLeader] = useState<ILeader>(leaders[0]);

   const changeLeader = (index: number) => setLeader(leaders.find((_, idx) => idx === index) as ILeader);

   return (
      <section className="relative mx-auto w-[92vw] max-w-5xl pt-20 pb-0">
         <h2 className="z-[5] mb-6 text-center text-4xl font-bold">Meet Our Leaders</h2>
         <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
            {leaders?.map(({ img, name }, index) => {
               return (
                  <img
                     key={index}
                     src={img}
                     className={`h-[40px] w-[40px] cursor-pointer rounded-full border-2 object-cover object-center hover:border-orange-400 ${
                        leaders?.[index]?.name === leader.name && "border-mainPink"
                     }`}
                     onClick={() => changeLeader(index)}
                     title={name}
                  />
               );
            })}
         </div>
         <SingleLeader {...leader} />
      </section>
   );
}
