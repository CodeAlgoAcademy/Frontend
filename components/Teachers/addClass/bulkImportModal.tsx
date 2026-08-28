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
    <section className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
         
         <main className="relative w-full max-w-[850px] max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
            <header className="mb-6 flex items-start justify-between">
               <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  {t("bulkImportInstructions")}
               </h1>
               <button
                  className="text-2xl text-red-700 hover:scale-110 transition-transform"
                  onClick={() => setBulkImportModalOpen(false)}
               >
                  <FaTimes />
               </button>
            </header>

            <div className="w-full border rounded-lg overflow-hidden bg-gray-50 mb-6">
               <div className="relative w-full h-[150px] md:h-[220px]">
                  <Image 
                     src="/assets/csv file structure.png" 
                     layout="fill"
                     objectFit="contain" 
                     alt="CSV Structure"
                     priority
                  />
               </div>
            </div>

            <div className="space-y-4">
               {bulkImportData.map((instruction: string, index: number) => (
                  <article key={index} className="flex items-start gap-x-3 text-sm md:text-base text-gray-700 leading-relaxed">
                     <span className="text-green-600 mt-1 flex-shrink-0">
                        <FaCheckDouble size={14} />
                     </span>
                     <p>{instruction}</p>
                  </article>
               ))}
               
               <div className="pt-4">
                  <button
                     onClick={() => setBulkImportModalOpen(false)}
                     className="bg-[#2563eb] hover:bg-blue-700 transition-colors min-w-[140px] rounded-full py-3 px-6 text-white font-semibold shadow-md"
                  >
                      {t("gotIt")}
                   </button>
               </div>
            </div>
         </main>
      </section>
   );
};

export default BulkImportModal;