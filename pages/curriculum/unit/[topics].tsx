import React, { useEffect, useRef, useState } from 'react';
import { BsCircle, BsFillCircleFill } from 'react-icons/bs';
import { FaChevronLeft, FaGripLinesVertical } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Sidebar from '../../../components/Sidebar';
import AddStudent from '../../../components/modals/AddStudent';
import PreviewModal from '../../../components/modals/PreviewModal';
import { GeneralNav } from '../../../components';
import Link from 'next/link';
//
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccessToken } from 'utils/getTokens';
import { openErrorModal } from 'store/fetchSlice';
import http from 'axios.config';
import { getAllLessons } from 'services/lessonService';
import { RootState } from 'store/store';

export default function Unit() {
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [active, setActive] = useState<number[]>([]);
  const dispatch = useDispatch();

  const router = useRouter();
  const { topics } = router.query;

  const getLessonsAll = async () => {
    const data2 = await dispatch(getAllLessons(topics));
    if (!data2?.error?.message) {
    }
  };

  useEffect(() => {
    getLessonsAll();
  }, [topics]);

  const { lessons } = useSelector((state: RootState) => state.allLessons);
  const { currentUnitInView } = useSelector((state: RootState) => state.unit);
  console.log(currentUnitInView);
  // add student oprions modal
  const cancelPresence = () => {
    setShowModal(false);
  };

  // curriculm topic preview modal
  const cancelPreview = () => {
    setShowPreview(false);
  };

  const handleClick = (id: number) => {
    const index = active.indexOf(id);
    if (index !== -1) {
      setActive((active) => [...active.slice(0, index), ...active.slice(index + 1)]);
    } else {
      setActive((active) => [...active, id]);
    }
  };

  return (
    <div>
      <GeneralNav />
      <div className="flex items-stretch mb-auto grow bg-[#E5E5E5] ">
        <div className="sidebar bg-white min-w-[270px]">
          <Sidebar />
        </div>

        <div className="px-[5.5rem] py-[2rem] w-full">
          <div className="flex justify-start items-center gap-6">
            <Link href="/curriculum" onClick={() => {}}>
              <div className="text-[1.4rem] cursor-pointer">
                <i>
                  <FaChevronLeft />
                </i>
              </div>
            </Link>
            <div className="flex justify-between flex-1 gap-2">
              <h1 className="font-bold text-3xl">{topics}</h1>
              <Link href="/curriculum/assignments">
                <div className="flex gap-2 items-center cursor-pointer">
                  <IoIosAddCircleOutline className="text-4xl " />
                  <h1 className="text-[1.2rem]">Add Assignment</h1>
                </div>
              </Link>
            </div>
          </div>
          <div className="border-[#BDBDBD] pl-[1.5rem] mb-[3rem] pb-3 mt-7 border-b-[1.3px]">
            <h2 className="text-[1.6rem] font-bold">Unit Control</h2>
          </div>
          {/* curriculumn topic section */}

          {lessons &&
            lessons.map((data: any) => {
              return (
                <div
                  key={data.id}
                  className="flex-column bg-white rounded-lg transition duration-200 ease-in-out"
                >
                  <div className="bg-white flex items-center mt-[.7rem] py-[0.3rem] pl-[10px] rounded-lg transition duration-200 ease-out">
                    <div className="border-r-2 flex items-center sm:gap-5 lg:gap-0 sm:pr-[1rem] sm:py-2 md:pr-[1.5rem] border-[#E6E6E6] py-5 pr-[4rem]  justify-between w-full">
                      <div className="flex items-center sm:gap-3 lg:gap-7">
                        <FaGripLinesVertical className="text-[#A0A0A0] text-[1.1rem] font-thin" />
                        <p className="font-bold sm:text-[15px] lg:text-[20px]">{data.title}</p>
                        {active.includes(data.id) && (
                          <p
                            onClick={() => setShowPreview(true)}
                            className=" sm:text-[10px] lg:text-[18px] text-[#A0A0A0] hover:underline cursor-pointer hover:text-black transition duration-200 ease-out"
                          >
                            Preview
                          </p>
                        )}
                      </div>
                      <div className="flex justify-around">
                        <p className="sm:text-[10px] lg:text-[18px] font-semibold">{data.date}</p>
                        <div className="flex items-center gap-2  sm:ml-[1rem] lg:ml-[5rem]">
                          {data.status == 'Published' ? (
                            <BsFillCircleFill className="text-[9px]  text-[#62C932]" />
                          ) : (
                            <BsCircle className="text-[9px] text-[#B0B0B0]" />
                          )}
                          <p className="sm:text-[10px] lg:text-[18px] font-semibold">
                            {data.status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-5 px-7 text-2xl" onClick={() => handleClick(data.id)}>
                      {active.includes(data.id) ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                  </div>
                  {active.includes(data.id) && (
                    <div>
                      <div className="flex  mx-12 py-6 border-[#E6E6E6] border-t-2 ">
                        {/* first division */}
                        <div className="flex-1 sm:pr-[1rem] lg:pr-[3rem] border-[#E6E6E6] border-r-2 py-[1rem]">
                          <div className="md:flex-col lg:flex-row gap-[3rem]">
                            <p className=" md:text-[12px]  lg:text-[18px] font-bold">Description</p>
                            <p className="md:text-[12px] lg:text-[16px] ">
                              In this lesson students will learn the basics of loops and how to
                              apply loops into their programs.
                            </p>
                          </div>
                          <div className="flex items-center gap-[3rem] mt-4">
                            <p className="md:text-[12px]  lg:text-[18px] font-bold">Date Range</p>
                            <div className="flex items-center gap-[2rem]">
                              <p className="sm:text-[12px] lg:text-[16px] ">April 10 - April 17</p>
                              <p className="sm:text-[12px] lg:text-[16px] underline">edit</p>
                            </div>
                          </div>
                        </div>

                        {/* second division */}
                        <div className=" flex-1 pl-[3rem] flex flex-col justify-between py-5">
                          <div className="flex  items-center gap-[4rem]">
                            <p className="md:text-[12px]  lg:text-[18px] font-bold">Status</p>
                            <div className="flex gap-[6px] items-center border-2 border-[#E6E6E6] px-3 py-1">
                              {data.status == 'Published' ? (
                                <BsFillCircleFill className="text-[9px]  text-[#62C932]" />
                              ) : (
                                <BsCircle className="text-[9px] text-[#B0B0B0]" />
                              )}
                              <p className="md:text-[12px]  lg:text-[18px] font-semibold">
                                {data.status}
                              </p>
                              <FiChevronDown />
                            </div>
                          </div>
                          <div className="flex  items-center mt-4 gap-[3rem]">
                            <p className="md:text-[12px]  lg:text-[18px] font-bold">Assign To</p>
                            <div
                              className="flex items-center gap-[1rem] cursor-pointer"
                              onClick={() => setShowModal(true)}
                            >
                              <IoIosAddCircleOutline className="md:text[10px] lg:text-[1.6rem]" />
                              <p className="md:text-[10px]  lg:text-[16px]">Add Student</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Student progress section */}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        {/* Add student modal component  */}
        <AddStudent showModal={showModal} cancelPresence={cancelPresence} />
        {/* preview modal components */}
        <PreviewModal showPreview={showPreview} cancelPreview={cancelPreview} />
      </div>
    </div>
  );
}
