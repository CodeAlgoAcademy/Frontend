import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { FaTimes, FaCheckDouble } from 'react-icons/fa';
import style from '@/styles/styles';

const bulkImportData: string[] = [
  'Kindly check the above image for the structure of the file',
  'Make sure all paramaters (id, email, firstName, lastName and username) are filled',
  'Ensure the headers are recorded exactly like in the image above (take not of capitalized letters)',
  'Ensure paramters are comma seperated',
  'Ensure the file is saved in a csv format (i.e the file extension is .csv)',
];

const BulkImportModal = ({
  setBulkImportModalOpen,
}: {
  setBulkImportModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <section className={`${style.modalOverlay} z-[40] bg-[rgba(0,0,0,.60)]`}>
      <main className="w-[90vw] max-w-[900px] mx-auto bg-white px-8 py-6 shadow-lg rounded-md">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-[26px] font-bold w-full">Bulk Import Instructions</h1>
          <span
            className="font-bold text-[24px] text-[darkRed] cursor-pointer"
            onClick={() => {
              setBulkImportModalOpen(false);
            }}
          >
            <FaTimes />
          </span>
        </header>
        <div className="w-full">
          <Image
            src={'/assets/csv file structure.png'}
            width={'1750px'}
            height={'250px'}
            objectFit={'cover'}
            objectPosition={'center'}
          />
        </div>
        <div className="my-4">
          {bulkImportData.map((instruction: string, index: number) => {
            return (
              <article key={index} className="flex gap-x-4 items-center mb-2">
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
            className="mt-4 p-3 min-w-[150px] rounded-full text-white bg-[#2073fa]"
          >
            Got it!
          </button>
        </div>
      </main>
    </section>
  );
};

export default BulkImportModal;
