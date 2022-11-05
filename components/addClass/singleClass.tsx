import React, { FC } from "react";
import Link from "next/link";
import { IClass } from "../../types/interfaces";

const SingleClass: FC<IClass> = ({ classDetails, students }) => {
  const { className, grade, subject, color } = classDetails;
  return (
    <Link href="/dashboard">
      <article className="col-span-1 bg-white h-[200px] shadow-lg rounded-md overflow-hidden w-full flex cursor-pointer">
        <aside className={`${color} flex-[0.15] h-full`}></aside>
        <div className="flex-[0.85] h-full px-4 pb-4">
          <header className="py-4 border-b-2">
            <h1 className="text-[25px] md:text-[30px] text-black font-bold">
              {className}
            </h1>
          </header>
          <main className="mt-4 flex flex-col justify-between">
            <h2 className="font-bold">Grade {grade}</h2>
            <h2 className="font-bold">{subject}</h2>
            <h2 className="font-bold">{students.length} Student(s)</h2>
          </main>
        </div>
      </article>
    </Link>
  );
};

export default SingleClass;
