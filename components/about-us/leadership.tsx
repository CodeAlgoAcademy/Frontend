import React from "react";
import SingleLeader from "./single-leader";
import { useTranslation } from "react-i18next";

const leaders = [
   {
      id: "triumfiaFulks",
      img: "/assets/Triumfia_Fulks.png",
   },
];

export default function Leadership() {
   const { t } = useTranslation("pages");
   const { t: ta } = useTranslation("about");

   return (
      <section className="relative mx-auto mb-20 w-[92vw] max-w-5xl px-6 pb-0">
         <h2 className="z-[5] mb-12 text-center font-thabit text-4xl font-bold max-md:text-2xl">{t("meetOurLeader")}</h2>
         <div className="mb-4 flex items-center justify-center gap-x-20 gap-y-10 max-md:flex-col">
            {leaders?.map((leader) => {
               return (
                  <SingleLeader
                     key={leader.id}
                     img={leader.img}
                     name={ta(`leaders.${leader.id}.name`)}
                     position={ta(`leaders.${leader.id}.position`)}
                     info={ta(`leaders.${leader.id}.info`)}
                  />
               );
            })}
         </div>
      </section>
   );
}