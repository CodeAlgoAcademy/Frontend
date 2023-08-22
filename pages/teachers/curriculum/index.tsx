import { useCallback, useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { openAddUnitModal } from "store/modalSlice";
import AddUnit from "@/components/Teachers/curriculum/addUnit";
import { RootState } from "store/store";
import { SlLoop } from "react-icons/sl";
import { deleteCurriculum, getAllCurriculums } from "services/curriculumService";
import { IAllCurriculum, Icurriculum } from "types/interfaces";
import { BiArrowBack } from "react-icons/bi";
import SingleCurriculum from "@/components/Teachers/curriculum/singleCurriculum";
import { getDate } from "utils/getDate";
import TeacherLayout from "@/components/layouts/TeacherLayout";
import NoItem from "@/components/UI/NoItem";

// export default function Index() {
//    const [past, setPast] = useState<boolean>(false);
//    const [current, setCurrent] = useState<boolean>(true);
//    const [upcoming, setUpcoming] = useState<boolean>(false);
//    const [active, setActive] = useState("current");
//    const { addUnitModalOpen } = useSelector((state: RootState) => state.modal);
//    const { id } = useSelector((state: RootState) => state.currentClass);
//    const dispatch = useDispatch();
//    const router = useRouter();

//    const getCurriculums = useCallback(async () => {
//       const data = await dispatch(getAllCurriculums());
//       if (!data?.error?.message) {
//       }
//    }, [dispatch]);

//    useEffect(() => {
//       if (!addUnitModalOpen) {
//          getCurriculums();
//       }
//    }, [addUnitModalOpen, getCurriculums]);

//    const { curriculum } = useSelector((state: RootState) => state.allCurriculum);

//    // curriculumn tab click functions

//    const handlePast = () => {
//       setCurrent(false);
//       setUpcoming(false);
//       setPast(true);
//       setActive("past");
//    };

//    const handleCurrent = () => {
//       setPast(false);
//       setUpcoming(false);
//       setCurrent(true);
//       setActive("current");
//    };
//    const handleUpcoming = () => {
//       setPast(false);
//       setCurrent(false);
//       setUpcoming(true);
//       setActive("upcoming");
//    };

//    const todayDate = getDate();

//    const currentCurriculum = curriculum?.filter((tempCurriculum: Icurriculum) => {
//       if (tempCurriculum.class_model === id) {
//          if (tempCurriculum.is_finished === false && new Date(tempCurriculum.start_date).getTime() <= new Date(todayDate).getTime()) {
//             return tempCurriculum;
//          }
//       }
//    });

//    const pastCurriculum = curriculum?.filter((tempCurriculum: Icurriculum) => {
//       return tempCurriculum.is_finished === true && tempCurriculum.class_model === id;
//    });

//    const upcomingCurriculum = curriculum?.filter((tempCurriculum: Icurriculum) => {
//       if (tempCurriculum.class_model === id) {
//          if (
//             tempCurriculum.is_current === false &&
//             tempCurriculum.is_finished === false &&
//             new Date(tempCurriculum.start_date).getTime() > new Date(todayDate).getTime()
//          ) {
//             return tempCurriculum;
//          }
//       }
//    });

//    useEffect(() => {
//       pastCurriculum?.forEach((curriculum: Icurriculum) => {
//          const todayDate: any = new Date();
//          const endDate: any = new Date(curriculum.end_date);
//          const timeDifference: any = todayDate - endDate;
//          // check if it is up to 30 days
//          if (timeDifference / 1000 / 60 / 60 / 24 / 30 === 1) {
//             dispatch(deleteCurriculum(curriculum.id));
//          }
//       });
//    }, [dispatch, pastCurriculum]);

//    return (
//       <TeacherLayout>
//          {addUnitModalOpen ? (
//             <AddUnit />
//          ) : (
//             <>
//                <div className="flex flex-wrap justify-between">
//                   <h1 className="text-3xl font-bold text-[#2073fa]">Curriculum</h1>
//                   <div
//                      className="flex cursor-pointer items-center gap-2 text-[#2073fa]"
//                      onClick={() => {
//                         dispatch(openAddUnitModal());
//                      }}
//                   >
//                      <IoIosAddCircleOutline className="text-4xl " />
//                      <h1 className="text-[1.2rem]">Add Unit</h1>
//                   </div>
//                </div>
//                <div className="mt-[3rem] flex select-none items-center justify-center overflow-x-scroll border-b border-[#BDBDBD] px-[30%]">
//                   <h1
//                      className={
//                         active === "past"
//                            ? "mr-8  box-border  border-b-[3px] border-b-[#2073fa] text-[1.2rem] text-[#2073fa] transition duration-300 ease-out hover:border-b-[#2073fa] hover:font-bold"
//                            : "mr-8 box-border  text-[1.2rem] text-[#2073fa]  transition duration-300 ease-out  hover:border-b-[3px] hover:border-b-[#2073fa] hover:font-bold"
//                      }
//                      data-testid="curriculum-tabs"
//                      onClick={handlePast}
//                   >
//                      Past
//                   </h1>
//                   <div className="border-x-[1px] border-[#BDBDBD]  px-8 py-3 ">
//                      <h1
//                         className={
//                            active === "current"
//                               ? "box-border   border-b-[3px] border-b-[#2073fa] text-[1.2rem] text-[#2073fa] transition duration-300 ease-out hover:border-b-[#2073fa] hover:font-bold"
//                               : "box-border text-[1.2rem]  text-[#2073fa]  transition duration-300 ease-out  hover:border-b-[3px] hover:border-b-[#2073fa] hover:font-bold"
//                         }
//                         data-testid="curriculum-tabs"
//                         onClick={handleCurrent}
//                      >
//                         Current
//                      </h1>
//                   </div>
//                   <h1
//                      className={
//                         active === "upcoming"
//                            ? "ml-8  box-border  border-b-[3px] border-b-[#2073fa] text-[1.2rem] text-[#2073fa] transition duration-300 ease-out hover:border-b-[#2073fa] hover:font-bold"
//                            : "ml-8 box-border  text-[1.2rem]  text-[#2073fa] transition duration-300 ease-out  hover:border-b-[3px] hover:border-b-[#2073fa] hover:font-bold"
//                      }
//                      data-testid="curriculum-tabs"
//                      onClick={handleUpcoming}
//                   >
//                      Upcoming
//                   </h1>
//                </div>
//                {/* curriculumn section */}
//                <div>
//                   {/* current curriculum */}
//                   {current && (
//                      <>
//                         <h1 className="mt-10 w-full text-[1.5rem] font-bold text-[#2073fa]">Current Unit</h1>
//                         <div
//                            data-testid="current-unit-container"
//                            className="box-border flex flex-col flex-wrap justify-center md:flex-row  md:justify-start md:gap-[1rem] lg:gap-[2rem]"
//                         >
//                            {currentCurriculum?.map((curriculum: Icurriculum) => {
//                               return <SingleCurriculum active={active} curriculum={curriculum} key={curriculum.id} />;
//                            })}
//                         </div>
//                      </>
//                   )}

//                   {/* Past */}

//                   {past && (
//                      <div>
//                         <h1 className="mt-10 text-[1.5rem] font-bold text-[#2073fa]">Past Units</h1>
//                         <div className="box-border flex flex-col flex-wrap justify-center md:flex-row  md:justify-start md:gap-[1rem] lg:gap-[2rem]">
//                            {pastCurriculum.map((curriculum: Icurriculum) => {
//                               return <SingleCurriculum active={active} key={curriculum.id} curriculum={curriculum} />;
//                            })}
//                         </div>
//                      </div>
//                   )}

//                   {/* upcoming */}

//                   {upcoming && (
//                      <div>
//                         <h1 className="mt-10 text-[1.5rem] font-bold text-[#2073fa]">Upcoming Units</h1>
//                         <div className="box-border flex flex-col flex-wrap justify-center md:flex-row  md:justify-start md:gap-[1rem] lg:gap-[2rem]">
//                            {upcomingCurriculum.map((curriculum: Icurriculum) => {
//                               return <SingleCurriculum active={active} key={curriculum.id} curriculum={curriculum} />;
//                            })}
//                         </div>
//                      </div>
//                   )}
//                </div>
//             </>
//          )}
//       </TeacherLayout>
//    );
// }

export default function Index() {
   return (
      <TeacherLayout>
         <NoItem text="Coming Soon" />
      </TeacherLayout>
   );
}
