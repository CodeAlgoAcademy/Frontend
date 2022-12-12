import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import loopImg from "../../public/assets/loopImg.png";
import connect from "../../public/assets/connect.png";
import bracket from "../../public/assets/bracket.png";
import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import GeneralNav from "@/components/GeneralNav";
import Sidebar from "@/components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { openAddUnitModal } from "store/modalSlice";
import AddUnit from "@/components/curriculum/addUnit";
import { RootState } from "store/store";
import { SlLoop } from "react-icons/sl";
import { getAllCurriculums } from "services/curriculumService";
import { IAllCurriculum, Icurriculum } from "types/interfaces";
import { BiArrowBack } from "react-icons/bi";
import SingleCurrentCurriculum from "@/components/curriculum/singleCurrentCurriculum";
import SingleCurriculum from "@/components/curriculum/singleCurriculum";

export default function Index() {
  const [past, setPast] = useState<boolean>(false);
  const [current, setCurrent] = useState<boolean>(true);
  const [upcoming, setUpcoming] = useState<boolean>(false);
  const [active, setActive] = useState("current");
  const { addUnitModalOpen } = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();

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
    setActive("past");
  };

  const handleCurrent = () => {
    setPast(false);
    setUpcoming(false);
    setCurrent(true);
    setActive("current");
  };
  const handleUpcoming = () => {
    setPast(false);
    setCurrent(false);
    setUpcoming(true);
    setActive("upcoming");
  };

  const getToday = () => {
    return {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };
  };
  const getCurriculumDate = (date: string) => {
    const newDate: string[] = date.split("-");
    return {
      day: parseInt(newDate[2]),
      month: parseInt(newDate[1]),
      year: parseInt(newDate[0]),
    };
  };
  const currentCurriculum = curriculum?.filter(
    (tempCurriculum: Icurriculum) => {
      if (tempCurriculum.end_date) {
        const today = getToday();
        const tempStartDate = tempCurriculum.start_date.split("-");
        const tempEndDate = tempCurriculum.end_date.split("-");
        const endDate = getCurriculumDate(tempCurriculum.end_date);
        const startDate = getCurriculumDate(tempCurriculum.start_date);
        if (
          tempCurriculum.is_current === true &&
          tempCurriculum.is_finished === false &&
          (endDate.year > today.year ||
            (endDate.year === today.year && endDate.month > today.month) ||
            (endDate.year === today.year &&
              endDate.month === today.month &&
              endDate.day >= today.day)) &&
          (startDate.year < today.year ||
            (startDate.year === today.year && startDate.month < today.month) ||
            (startDate.year === today.year &&
              startDate.month === today.month &&
              startDate.day <= today.day))
        ) {
          return tempCurriculum;
        }
      }
    }
  );

  const pastCurriculum = curriculum?.filter((tempCurriculum: Icurriculum) => {
    return tempCurriculum.is_finished === true;
  });

  const upcomingCurriculum = curriculum?.filter(
    (tempCurriculum: Icurriculum) => {
      if (tempCurriculum.end_date) {
        const today = getToday();
        const tempStartDate = tempCurriculum.start_date.split("-");
        const tempEndDate = tempCurriculum.end_date.split("-");
        // const startDate = {
        //   day: parseInt(tempStartDate[2]),
        //   month: parseInt(tempStartDate[1]),
        //   year: parseInt(tempStartDate[0]),
        // };
        // const endDate = {
        //   day: parseInt(tempEndDate[2]),
        //   month: parseInt(tempEndDate[1]),
        //   year: parseInt(tempEndDate[0]),
        // };

        const endDate = getCurriculumDate(tempCurriculum.end_date);
        const startDate = getCurriculumDate(tempCurriculum.start_date);
        if (
          tempCurriculum.is_current === false &&
          tempCurriculum.is_finished === false &&
          (endDate.year > today.year ||
            (endDate.year === today.year && endDate.month > today.month) ||
            (endDate.year === today.year &&
              endDate.month === today.month &&
              endDate.day >= today.day)) &&
          (startDate.year > today.year ||
            (startDate.year === today.year && startDate.month > today.month) ||
            (startDate.year === today.year &&
              startDate.month === today.month &&
              startDate.day > today.day))
        ) {
          return tempCurriculum;
        }
      }
    }
  );
  console.log("upcoming", upcomingCurriculum);
  console.log("current", currentCurriculum);

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
          <div className="px-[5.5rem] py-[2rem] flex-1 bg-[#EFEFEF]">
            <div className="flex justify-between">
              <h1 className="font-bold text-3xl">Curriculum</h1>
              <div
                className="flex gap-2 items-center cursor-pointer"
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
                  active === "past"
                    ? "text-[1.2rem]  mr-8  border-b-[3px] hover:font-bold border-b-black hover:border-b-black transition duration-300 ease-out box-border"
                    : "text-[1.2rem]  mr-8 hover:font-bold  hover:border-b-black hover:border-b-[3px] box-border  transition duration-300 ease-out"
                }
                onClick={handlePast}
              >
                Past
              </h1>
              <div className="border-x-[1px] border-[#BDBDBD]  px-8 py-3 ">
                <h1
                  className={
                    active === "current"
                      ? "text-[1.2rem] border-b-[3px] font-bold border-b-black hover:font-bold hover:border-b-black transition duration-500 ease-out box-border"
                      : "text-[1.2rem]  hover:font-bold hover:border-b-black  hover:border-b-[3px] box-border transition duration-500 ease-out"
                  }
                  onClick={handleCurrent}
                >
                  Current
                </h1>
              </div>
              <h1
                className={
                  active === "upcoming"
                    ? "text-[1.2rem] ml-8 border-b-[3px] border-b-black  font-bold hover:font-bold hover:border-b-black transition duration-500 ease-out box-border"
                    : "text-[1.2rem] ml-8  hover:font-bold hover:border-b-black hover:border-b-[3px] box-border transition duration-500 ease-out"
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
                  <h1 className="text-[1.5rem] font-bold mt-10 w-full">
                    Current Unit
                  </h1>
                  <div className="grid lg:grid-cols-2 md:grid-cols-1  box-border lg:gap-[2rem] md:gap-[1rem]">
                    {currentCurriculum?.map((curriculum: Icurriculum) => {
                      return (
                        <SingleCurrentCurriculum
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
                  <h1 className="text-[1.5rem] font-bold mt-10">Past Units</h1>
                  <div className="grid lg:grid-cols-2 md:grid-cols-1 box-border gap-[2rem]">
                    {pastCurriculum.map((curriculum: Icurriculum) => {
                      return (
                        <SingleCurriculum
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
                  <h1 className="text-[1.5rem] font-bold mt-10">
                    Upcoming Units
                  </h1>
                  <div className="grid lg:grid-cols-2 md:grid-cols-1 box-border gap-[2rem]">
                    {upcomingCurriculum.map((curriculum: Icurriculum) => {
                      return (
                        <SingleCurriculum
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
