import { useState } from "react";
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

export default function index() {
  const [past, setPast] = useState<boolean>(false);
  const [current, setCurrent] = useState<boolean>(true);
  const [upcoming, setUpcoming] = useState<boolean>(false);
  const [active, setActive] = useState("current");
  const { addUnitModalOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

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
                <div>
                  <h1 className="text-[1.5rem] font-bold mt-10 w-full">
                    Current Unit
                  </h1>

                  <div
                    style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)" }}
                    className="flex rounded-xl w-fit overflow-hidden mt-14"
                  >
                    <Image
                      src={loopImg}
                      objectFit="cover"
                      alt="loop image"
                      width={150}
                      quality={100}
                    />
                    <div className="bg-white w-[20rem] h-[17rem] p-8 ">
                      <div>
                        <HiDotsHorizontal className="ml-auto text-3xl border-[#BDBDBD] mt-[-1rem] text-[#C4C4C4]" />
                      </div>
                      <h1 className="font-bold mt-5 mb-5">Control</h1>
                      <p>
                        Loops contain a set of instructions that are continually
                        repeated until a specific set of conditions are met.
                      </p>
                      <div className="flex items-center mt-[2.1rem] justify-between">
                        <p>4/10 - Present</p>
                        <Link href="curriculum/unit">
                          <p className="px-5 py-[5px] font-semibold border-black rounded-full border-2 w-fit cursor-pointer">
                            view unit
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Past */}

              {past && (
                <div>
                  <h1 className="text-[1.5rem] font-bold mt-10">Past Units</h1>
                  <div className="flex lg:flex-row flex-col items-center gap-8">
                    <div className="flex-[50%]">
                      <div
                        style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)" }}
                        className="flex rounded-xl overflow-hidden mt-14"
                      >
                        <div className="lg:w-[150px] w-[120px] bg-[#A0A0A0]"></div>
                        <div className="bg-white flex-1 w-full h-[17rem] p-8">
                          <div>
                            <HiDotsHorizontal className="ml-auto text-3xl border-[#BDBDBD] mt-[-1rem] text-[#C4C4C4]" />
                          </div>
                          <h1 className="font-bold mb-3">Algorithm</h1>
                          <p className="text-[15px]">
                            Compare multiple algorithms for the same task.
                            Analyze and refine multiple algorithms for the same
                            task and determine which algorithm is the most
                            efficient.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-[50%]">
                      <div
                        style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)" }}
                        className="flex rounded-xl overflow-hidden mt-14"
                      >
                        <div className="lg:w-[150px] w-[120px] bg-[#A0A0A0]"></div>
                        <div className="bg-white w-full flex-1 h-[17rem] p-8 ">
                          <div>
                            <HiDotsHorizontal className="ml-auto text-3xl border-[#BDBDBD] mt-[-1rem] text-[#C4C4C4]" />
                          </div>
                          <h1 className="font-bold mb-3">Variable</h1>
                          <p className="text-[15px]">
                            Utilize, create, and modify programs that use
                            variables, with grade level appropriate data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* upcoming */}

              {upcoming && (
                <div>
                  <h1 className="text-[1.5rem] font-bold mt-10">
                    Upcoming Units
                  </h1>
                  <div className="flex lg:flex-row flex-col items-center gap-8">
                    <div className="flex-[50%]">
                      <div
                        style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)" }}
                        className="flex rounded-xl w-fit overflow-hidden mt-14"
                      >
                        <div className="lg:w-[150px] w-[120px] bg-[#A6CCA8] flex justify-center items-center">
                          <Image src={connect} alt="connect" />
                        </div>
                        <div className="bg-white flex-1 w-full h-[17rem] p-8">
                          <div>
                            <HiDotsHorizontal className="ml-auto text-3xl border-[#BDBDBD] mt-[-1rem] text-[#C4C4C4]" />
                          </div>
                          <h1 className="font-bold mb-3">Algorithm</h1>
                          <p className="text-[15px]">
                            Compare multiple algorithms for the same task.
                            Analyze and refine multiple algorithms for the same
                            task and determine which algorithm is the most
                            efficient.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-[50%]">
                      <div
                        style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)" }}
                        className="flex rounded-xl w-fit overflow-hidden mt-14"
                      >
                        <div className="lg:w-[150px] w-[120px] bg-[#8FD3D8] flex justify-center items-center">
                          <Image src={bracket} alt="bracket" />
                        </div>
                        <div className="bg-white flex-1 w-full h-[17rem] p-8">
                          <div>
                            <HiDotsHorizontal className="ml-auto text-3xl border-[#BDBDBD] mt-[-1rem] text-[#C4C4C4]" />
                          </div>
                          <h1 className="font-bold mb-3">Variable</h1>
                          <p className="text-[15px]">
                            Utilize, create, and modify programs that use
                            variables, with grade level appropriate data.
                          </p>
                        </div>
                      </div>
                    </div>
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
