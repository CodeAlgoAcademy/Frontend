import React, { FC } from "react";
import Link from "next/link";
import { IClass } from "../../types/interfaces";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateCurrentClass } from "store/currentClassSlice";

const SingleClass: FC<IClass> = ({
  className,
  grade,
  subject,
  color,
  totalStudent,
}) => {
  const dispatch = useDispatch();
  return (
    <article className="col-span-1 bg-white min-h-[200px] shadow-md hover:shadow-lg rounded-md overflow-hidden w-full flex">
      <aside
        className={`flex-[0.15] h-full`}
        style={{ backgroundColor: color }}
      ></aside>
      <div className="flex-[0.85] h-full px-4 pb-4">
        <header className="py-4 border-b-2">
          <h1 className="text-[25px] md:text-[30px] text-black font-bold">
            {className}
          </h1>
        </header>
        <main className="mt-4 flex flex-col justify-between">
          <h2 className="font-bold">Grade {grade}</h2>
          <h2 className="font-bold">{subject}</h2>
          <h2 className="font-bold">
            {totalStudent?.toString().length} Student(s)
          </h2>
        </main>
        <footer className="flex justify-end">
          <Link href="/dashboard">
            <div
              className="pt-[16px] pb-2 flex justify-end items-center gap-x-4 w-fit cursor-pointer"
              onClick={() => {
                dispatch(updateCurrentClass({ className, color }));
              }}
            >
              <p className="text-[16px] font-semibold">Go To Dashboard</p>
              <span className="text-[18px] w-[30px] h-[30px] border-2 border-black flex justify-center items-center rounded-full">
                <FaChevronRight />
              </span>
            </div>
          </Link>
        </footer>
      </div>
    </article>
  );
};

export default SingleClass;
