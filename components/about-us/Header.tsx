import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";

const Header = () => {
   const { t } = useTranslation("pages");
   return (
      <header className="">
         <div className="mx-auto max-w-[1200px] space-y-5 py-10 px-6 text-center sm:px-20 md:px-60">
            <Fade triggerOnce={true} cascade duration={1000} direction={"up"}>
                <p className="font-thabit text-4xl font-bold max-md:text-2xl">{t("ourMission")}</p>
               <p className="max-md:text-[.9rem]">
                  {t("ourMissionText")}
               </p>

                <p className="font-thabit text-4xl font-bold max-md:text-2xl">{t("ourVision")}</p>
               <p className="max-md:text-[.9rem]">
                  {t("ourVisionText")}
               </p>
            </Fade>
         </div>
      </header>
   );
};

export default Header;
