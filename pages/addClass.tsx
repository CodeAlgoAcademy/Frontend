import React, { useEffect } from 'react';
import Head from 'next/head';
import Modal from '../components/addClass/modal';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddClassModal, openAddClassModal } from '../store/modalSlice';
import Classes from '../components/addClass/classes';
import { getAllClasses } from 'services/classesService';
import { RootState } from 'store/store';

const AddClass = () => {
  const dispatch = useDispatch();
  const { allClasses } = useSelector((state: RootState) => state);

  const getClasses = async () => {
    const data = await dispatch(getAllClasses());
    if (!data?.error?.message) {
    }
  };

  useEffect(() => {
    getClasses();
    dispatch(closeAddClassModal());
  }, []);

  return (
    <main>
      <Head>
        <title>CodeAlgo Academy | Add Class</title>
      </Head>

      {/* navbar here */}
      <section className="w-full bg-[#ECEDF3] min-h-screen">
        <div className="w-full px-[16px] py-[30px] max-w-[1250px] mx-auto">
          <div className="w-full flex flex-wrap justify-between items-center">
            <h1 className="text-[2rem] font-bold">Home</h1>
            <div
              className="flex flex-row gap-x-2 items-center cursor-pointer"
              data-testid="open-modal"
              onClick={() => {
                dispatch(openAddClassModal());
              }}
            >
              <span className="w-[30px] h-[30px] border-2 border-black rounded-full flex justify-center items-center text-[20px] text-black font-lighter">
                <FaPlus />
              </span>
              <h3 className="text-[16px] font-bold">Add Class</h3>
            </div>
          </div>

          <section className="mt-12">
            <Classes />
          </section>
        </div>
      </section>

      {/* it has a position of fixed */}
      <Modal />
    </main>
  );
};

export default AddClass;
