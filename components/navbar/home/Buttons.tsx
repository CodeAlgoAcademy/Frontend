import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const styles = {
   lgBtn: "uppercase px-3 py-2 text-white hover:bg-opacity-50 rounded",
};

const Buttons = () => {
   const { t } = useTranslation("common");

   return (
      <>
         <div className="hidden space-x-2 md:flex">
            <Link href="/login">
               <button className={`bg-orange-500 ${styles.lgBtn}`}>{t("login")}</button>
            </Link>
            <Link href="/signup">
               <button className={`bg-amber-500 ${styles.lgBtn}`}>{t("register")}</button>
            </Link>
         </div>

         {/* mobile devices */}
         <div className="grid gap-3 md:hidden">
            <Link href="/login">
               <button className={`bg-orange-500 ${styles.lgBtn}`}>{t("login")}</button>
            </Link>
            <Link href="/signup">
               <button className={`bg-amber-500 ${styles.lgBtn}`}>{t("register")}</button>
            </Link>
         </div>
      </>
   );
};

export default Buttons;
