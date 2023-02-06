import { useEffect, useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import loopImg from '../../public/assets/loopImg.png';
import connect from '../../public/assets/connect.png';
import bracket from '../../public/assets/bracket.png';
import Image from 'next/image';
import { HiDotsHorizontal } from 'react-icons/hi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GeneralNav from '@/components/GeneralNav';
import Sidebar from '@/components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { openAddUnitModal } from 'store/modalSlice';
import AddUnit from '@/components/curriculum/addUnit';
import { RootState } from 'store/store';
import { SlLoop } from 'react-icons/sl';
import { deleteCurriculum, getAllCurriculums } from 'services/curriculumService';
import { IAllCurriculum, Icurriculum } from 'types/interfaces';
import { BiArrowBack } from 'react-icons/bi';
import SingleCurriculum from '@/components/curriculum/singleCurriculum';
import { getDate } from 'utils/getDate';

export default function Index() {
  const [past, setPast] = useState<boolean>(false);
  const [current, setCurrent] = useState<boolean>(true);
  const [upcoming, setUpcoming] = useState<boolean>(false);
  const [active, setActive] = useState('current');
  const { addUnitModalOpen } = useSelector((state: RootState) => state.modal);
  const { id } = useSelector((state: RootState) => state.currentClass);
  const dispatch = useDispatch();
  const router = useRouter();

  const getCurriculums = async () => {
    const data = await dispatch(getAllCurriculums());
    if (!data?.error?.message) {
    }
  };

  useEffect(() => {
    if (!addUnitModalOpen) {
      getCurriculums();
    }
  }, []);

  const { curriculum } = useSelector((state: RootState) => state.allCurriculum);

  // curriculumn tab click functions

  const handlePast = () => {
    setCurrent(false);
    setUpcoming(false);
    setPast(true);
    setActive('past');
  };

  const handleCurrent = () => {
    setPast(false);
    setUpcoming(false);
    setCurrent(true);
    setActive('current');
  };
  const handleUpcoming = () => {
    setPast(false);
    setCurrent(false);
    setUpcoming(true);
    setActive('upcoming');
  };

  const todayDate = getDate();

  const currentCurriculum = curriculum?.filter((tempCurriculum: Icurriculum) => {
    if (tempCurriculum.class_model === id) {
      if (
        tempCurriculum.is_finished === false &&
        new Date(tempCurriculum.start_date).getTime() <= new Date(todayDate).getTime()
      ) {
        return tempCurriculum;
      }
    }
  });

  const pastCurriculum = curriculum?.filter((tempCurriculum: Icurriculum) => {
    return tempCurriculum.is_finished === true && tempCurriculum.class_model === id;
  });

  const upcomingCurriculum = curriculum?.filter((tempCurriculum: Icurriculum) => {
    if (tempCurriculum.class_model === id) {
      if (
        tempCurriculum.is_current === false &&
        tempCurriculum.is_finished === false &&
        new Date(tempCurriculum.start_date).getTime() > new Date(todayDate).getTime()
      ) {
        return tempCurriculum;
      }
    }
  });

  useEffect(() => {
    pastCurriculum?.forEach((curriculum: Icurriculum) => {
      const todayDate: any = new Date();
      const endDate: any = new Date(curriculum.end_date);
      const timeDifference: any = todayDate - endDate;
      // check if it is up to 30 days
      if (timeDifference / 1000 / 60 / 60 / 24 / 30 === 1) {
        dispatch(deleteCurriculum(curriculum.id));
      }
    });
  }, []);

  return (
    <div className="min-h-[100vh] flex flex-col">
      <GeneralNav />
      <div className="flex items-stretch mb-auto grow">
        <div className="sidebar bg-white w-[270px]">
          <Sidebar />
        </div>
        {addUnitModalOpen ? (
          <AddUnit />
        ) : (
          <div className="px-[5.5rem] py-[2rem] flex-1 bg-[#ECEDF3]">
            <div className="flex justify-between">
              <h1 className="font-bold text-3xl text-[#2073fa]">Curriculum</h1>
              <div
                className="flex gap-2 items-center cursor-pointer text-[#2073fa]"
                onClick={() => {
                  dispatch(openAddUnitModal());
                }}
              >
                <IoIosAddCircleOutline className="text-4xl " />
                <h1 className="text-[1.2rem]">Add Unit</h1>
              </div>
            </div>
            <div className="flex px-[30%] justify-center mt-[3rem] items-center border-b border-[#BDBDBD] select-none">
              <h1
                className={
                  active === 'past'
                    ? 'text-[1.2rem]  mr-8  border-b-[3px] text-[#2073fa] hover:font-bold border-b-[#2073fa] hover:border-b-[#2073fa] transition duration-300 ease-out box-border'
                    : 'text-[1.2rem] text-[#2073fa]  mr-8 hover:font-bold  hover:border-b-[#2073fa] hover:border-b-[3px] box-border  transition duration-300 ease-out'
                }
                onClick={handlePast}
              >
                Past
              </h1>
              <div className="border-x-[1px] border-[#BDBDBD]  px-8 py-3 ">
                <h1
                  className={
                    active === 'current'
                      ? 'text-[1.2rem]   border-b-[3px] text-[#2073fa] hover:font-bold border-b-[#2073fa] hover:border-b-[#2073fa] transition duration-300 ease-out box-border'
                      : 'text-[1.2rem] text-[#2073fa]  hover:font-bold  hover:border-b-[#2073fa] hover:border-b-[3px] box-border  transition duration-300 ease-out'
                  }
                  onClick={handleCurrent}
                >
                  Current
                </h1>
              </div>
              <h1
                className={
                  active === 'upcoming'
                    ? 'text-[1.2rem]  ml-8  border-b-[3px] text-[#2073fa] hover:font-bold border-b-[#2073fa] hover:border-b-[#2073fa] transition duration-300 ease-out box-border'
                    : 'text-[1.2rem] text-[#2073fa]  hover:font-bold  hover:border-b-[#2073fa] ml-8 hover:border-b-[3px] box-border  transition duration-300 ease-out'
                }
                onClick={handleUpcoming}
              >
                Upcoming
              </h1>
            </div>

            {/* curriculumn section */}

            <div>
              {/* current curriculum */}
              {current && (
                <>
                  <h1 className="text-[1.5rem] font-bold mt-10 w-full text-[#2073fa]">
                    Current Unit
                  </h1>
                  <div className="flex flex-col md:flex-row justify-center md:justify-start flex-wrap  box-border lg:gap-[2rem] md:gap-[1rem]">
                    {currentCurriculum?.map((curriculum: Icurriculum) => {
                      return (
                        <SingleCurriculum
                          active={active}
                          curriculum={curriculum}
                          key={curriculum.id}
                        />
                      );
                    })}
                  </div>
                </>
              )}

              {/* Past */}

              {past && (
                <div>
                  <h1 className="text-[1.5rem] font-bold mt-10 text-[#2073fa]">Past Units</h1>
                  <div className="flex flex-col md:flex-row justify-center md:justify-start flex-wrap  box-border lg:gap-[2rem] md:gap-[1rem]">
                    {pastCurriculum.map((curriculum: Icurriculum) => {
                      return (
                        <SingleCurriculum
                          active={active}
                          key={curriculum.id}
                          curriculum={curriculum}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* upcoming */}

              {upcoming && (
                <div>
                  <h1 className="text-[1.5rem] font-bold mt-10 text-[#2073fa]">Upcoming Units</h1>
                  <div className="flex flex-col md:flex-row justify-center md:justify-start flex-wrap  box-border lg:gap-[2rem] md:gap-[1rem]">
                    {upcomingCurriculum.map((curriculum: Icurriculum) => {
                      return (
                        <SingleCurriculum
                          active={active}
                          key={curriculum.id}
                          curriculum={curriculum}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
