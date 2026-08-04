import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { FaTimes, FaCheckDouble } from "react-icons/fa";
import style from "styles/styles";
import { useTranslation } from "react-i18next";

const BulkImportModal = ({ setBulkImportModalOpen }: { setBulkImportModalOpen: Dispatch<SetStateAction<boolean>> }) => {
   const { t } = useTranslation("teacher");
   const bulkImportData: string[] = [
      t("instruction1"),
      t("instruction2"),
      t("instruction3"),
      t("instruction4"),
      t("instruction5"),
      t("instruction6"),
      t("instruction7"),
   ];
   return (
      <section className={`${style.modalOverlay} !z-[40] bg-[rgba(0,0,0,.60)]`}>
         <main className="z-[10] mx-auto w-[90vw] max-w-[900px] rounded-md bg-white px-8 py-6 shadow-lg">
            <header className="mb-6 flex items-center justify-between">
               <h1 className="w-full text-[26px] font-bold">{t("bulkImportInstructions")}</h1>
               <span
                  className="cursor-pointer text-[24px] font-bold text-[darkRed]"
                  onClick={() => {
                     setBulkImportModalOpen(false);
                  }}
               >
                  <FaTimes />
               </span>
            </header>
            <div className="z-[10] w-full">
               <Image src={"/assets/csv file structure.png"} width={"1750px"} height={"250px"} objectFit={"cover"} objectPosition={"center"} alt="" />
            </div>
            <div className="my-4">
               {bulkImportData.map((instruction: string, index: number) => {
                  return (
                     <article key={index} className="mb-2 flex items-center gap-x-4">
                        <span className="text-green-600">
                           <FaCheckDouble />
                        </span>
                        {instruction}
                     </article>
                  );
               })}
               <button
                  onClick={() => {
                     setBulkImportModalOpen(false);
                  }}
                  className="bg-mainColor mt-4 min-w-[150px] rounded-full p-3 text-white"
               >
                   {t("gotIt")}
                </button>
            </div>
         </main>
      </section>
   );
};

export default BulkImportModal;
