import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { FaTimes, FaCheckDouble } from "react-icons/fa";
import style from "styles/styles";

const bulkImportData: string[] = [
   "Kindly check the above image for the structure of the file",
   "Make sure all paramaters (id, email, firstName, lastName and username) are filled",
   "Ensure that the date of birth field (dob) is structured as YYYY-MM-DD (hyphen separated)",
   "Ensure the headers are recorded exactly like in the image above (take not of capitalized letters)",
   "Ensure paramters are comma seperated",
   "Ensure the file is saved in a csv format (i.e the file extension is .csv)",
   "The csv files can be edited with notepad",
];

const BulkImportModal = ({ setBulkImportModalOpen }: { setBulkImportModalOpen: Dispatch<SetStateAction<boolean>> }) => {
   return (
      <section className={`${style.modalOverlay} !z-[40] bg-[rgba(0,0,0,.60)]`}>
         <main className="z-[10] mx-auto w-[90vw] max-w-[900px] rounded-md bg-white px-8 py-6 shadow-lg">
            <header className="mb-6 flex items-center justify-between">
               <h1 className="w-full text-[26px] font-bold">Bulk Import Instructions</h1>
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
                  className="mt-4 min-w-[150px] rounded-full bg-[#2073fa] p-3 text-white"
               >
                  Got it!
               </button>
            </div>
         </main>
      </section>
   );
};

export default BulkImportModal;
