import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { IClass } from '../../types/interfaces';
import { FaChevronRight } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateCurrentClass } from 'store/currentClassSlice';
import { BiPlus } from 'react-icons/bi';
import AddStudentModal from '../Teachers/students/AddStudentModal';
import { getAllClasses } from 'services/classesService';

const SingleClass: FC<IClass> = ({ id, className, grade, subject, color, totalStudent }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <article className="col-span-1 bg-white min-h-[200px] shadow-md hover:shadow-lg rounded-md overflow-hidden w-full flex">
      <aside className={`flex-[0.15] h-full`} style={{ backgroundColor: color }}></aside>
      <div className="flex-[0.85] h-full px-4 pb-4">
        <header className="py-4 border-b-2">
          <h1 className="text-[25px] md:text-[30px] text-black font-bold">{className}</h1>
        </header>
        <main className="mt-4 flex flex-col justify-between">
          <h2 className="font-bold">Grade {grade}</h2>
          <h2 className="font-bold">{subject}</h2>
          <h2 className="font-bold">{totalStudent} Student(s)</h2>
        </main>
        <footer className="flex justify-between mt-[16px] pb-2">
          <div
            className="text-[16px] font-semibold flex gap-x-2 items-center px-2 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
              dispatch(updateCurrentClass({ className, color, id }));
            }}
          >
            Add Students
            <span className="text-[18px] font-bold">
              <BiPlus />
            </span>
          </div>
          <Link href="/dashboard">
            <div
              className="flex justify-end items-center gap-x-2 w-fit cursor-pointer"
              onClick={() => {
                dispatch(updateCurrentClass({ className, color, id }));
              }}
            >
              <p className="text-[16px] font-semibold">Dashboard</p>
              <span className="text-[18px] w-[30px] h-[30px] border-2 border-black flex justify-center items-center rounded-full">
                <FaChevronRight />
              </span>
            </div>
          </Link>
        </footer>
      </div>
      {isOpen && <AddStudentModal setIsOpen={setIsOpen} />}
    </article>
  );
};

export default SingleClass;
