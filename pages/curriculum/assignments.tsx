import React, { useState, useEffect } from "react";
import Link from "next/link";

import { Button, Sidebar, GeneralNav } from "../../components";
import { BsPlusCircle } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { TbMedal } from "react-icons/tb";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiMagnifyingGlass } from "react-icons/hi2";

import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentClass } from "../../store/currentClassSlice";

import {
  IClass,
  CurrentClassState,
  AssignmentDetails,
  AssignmentSkill,
  AssignmentStudent,
} from "../../types/interfaces";

interface DynamicChechbox {
  [key: string]: boolean;
}

const Assignments = () => {
  const modalDefaults = {
    saveResponse: false,
    createResponse: false,
    cancelResponse: false,
    historyResponse: false,
    skillsResponse: false,
    studentResponse: false,
  };
  const [modalWrapperDisplay, setModalWrapperDisplay] = useState(false);
  const [modalItemsDisplay, setModalItemsDisplay] = useState(modalDefaults);
  const [historyType, setHistoryType] = useState("active");
  const [skillCheckbox, setSkillCheckbox] = useState<DynamicChechbox>({});
  const [studentCheckbox, setStudentCheckbox] = useState<DynamicChechbox>({});
  const [allStudentCheckbox, setAllStudentCheckbox] = useState({
    isChecked: false,
  });
  const [assignmentDetails, setAssignmentDetails] = useState<AssignmentDetails>(
    {
      title: "",
      schedule: "now",
      order: "random",
      number: 0,
      skills: [],
      students: [],
    }
  );

  const testSkills = [
    {
      categoryId: "1",
      categoryTitle: "1.OA.1",
      skills: [
        { skillId: "1", name: "" },
        { skillId: "2", name: "" },
        { skillId: "3", name: "" },
        { skillId: "4", name: "" },
        { skillId: "5", name: "" },
        { skillId: "6", name: "" },
        { skillId: "7", name: "" },
      ],
    },
    {
      categoryId: "2",
      categoryTitle: "1.OA.2",
      skills: [
        { skillId: "8", name: "" },
        { skillId: "9", name: "" },
        { skillId: "10", name: "" },
        { skillId: "11", name: "" },
      ],
    },
    {
      categoryId: "3",
      categoryTitle: "1.OA.3",
      skills: [
        { skillId: "12", name: "" },
        { skillId: "13", name: "" },
        { skillId: "14", name: "" },
      ],
    },
    {
      categoryId: "4",
      categoryTitle: "1.OA.4",
      skills: [
        { skillId: "15", name: "" },
        { skillId: "16", name: "" },
        { skillId: "17", name: "" },
        { skillId: "18", name: "" },
        { skillId: "19", name: "" },
      ],
    },
    {
      categoryId: "5",
      categoryTitle: "1.OA.5",
      skills: [{ skillId: "20", name: "" }],
    },
    {
      categoryId: "7",
      categoryTitle: "1.OA.7",
      skills: [{ skillId: "21", name: "" }],
    },
    {
      categoryId: "8",
      categoryTitle: "1.OA.8",
      skills: [
        { skillId: "22", name: "" },
        { skillId: "23", name: "" },
        { skillId: "24", name: "" },
      ],
    },
  ];

  const testStudents = [
    { studentId: "1" },
    { studentId: "2" },
    { studentId: "3" },
    { studentId: "4" },
    { studentId: "5" },
    { studentId: "6" },
    { studentId: "7" },
    { studentId: "8" },
    { studentId: "9" },
    { studentId: "10" },
    { studentId: "11" },
    { studentId: "12" },
    { studentId: "13" },
    { studentId: "14" },
    { studentId: "15" },
    { studentId: "16" },
    { studentId: "17" },
    { studentId: "18" },
    { studentId: "19" },
    { studentId: "20" },
    { studentId: "21" },
    { studentId: "22" },
    { studentId: "23" },
    { studentId: "24" },
    { studentId: "25" },
    { studentId: "26" },
    { studentId: "27" },
    { studentId: "28" },
    { studentId: "29" },
    { studentId: "30" },
  ];

  const addSkill = (newSkill: AssignmentSkill) => {
    setAssignmentDetails((prev) => {
      const prevSkills = prev.skills;
      return { ...prev, skills: [...prevSkills, newSkill] };
    });
  };
  const removeSkill = (newSkill: AssignmentSkill) => {
    setAssignmentDetails((prev) => {
      const prevSkills = prev.skills;
      const newSkills = prevSkills.filter(
        (skill) => skill.skillId !== newSkill.skillId
      );
      return { ...prev, skills: newSkills };
    });
  };
  const addStudent = (newStudent: AssignmentStudent) => {
    setAssignmentDetails((prev) => {
      const prevStudents = prev.students;
      return { ...prev, students: [...prevStudents, newStudent] };
    });
  };
  const removeStudent = (newStudent: AssignmentStudent) => {
    setAssignmentDetails((prev) => {
      const prevStudents = prev.students;
      const newStudents = prevStudents.filter(
        (student) => student.studentId !== newStudent.studentId
      );
      return { ...prev, students: newStudents };
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignmentDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSkillCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSkillCheckbox((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
    const value = e.target.checked;
    if (value) {
      addSkill({ skillId: e.target.name });
    } else {
      removeSkill({ skillId: e.target.name });
    }
  };
  const handleStudentCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStudentCheckbox((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
    const value = e.target.checked;
    if (value) {
      addStudent({ studentId: e.target.name });
    } else {
      removeStudent({ studentId: e.target.name });
    }
  };
  const handleAllStudentChechbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllStudentCheckbox({
      isChecked: e.target.checked,
    });
    const value = e.target.checked;
    if (value) {
      setAssignmentDetails((prev) => {
        return { ...prev, students: testStudents };
      });
      const newCheckboxes = Object.keys(studentCheckbox).reduce(
        (prev, student) => {
          return { ...prev, [student]: true };
        },
        {}
      );
      setStudentCheckbox(newCheckboxes);
    } else {
      setAssignmentDetails((prev) => {
        return { ...prev, students: [] };
      });
      const newCheckboxes = Object.keys(studentCheckbox).reduce(
        (prev, student) => {
          return { ...prev, [student]: false };
        },
        {}
      );
      setStudentCheckbox(newCheckboxes);
    }
  };
  const showModal = (modalName: string) => {
    setModalWrapperDisplay((prev) => true);
    setModalItemsDisplay((prev) => (prev = { ...prev, [modalName]: true }));
  };
  const hideModal = () => {
    setModalWrapperDisplay((prev) => false);
    setTimeout(() => setModalItemsDisplay((prev) => modalDefaults), 1000);
  };
  const switchModal = (modalName: string) => {
    setModalItemsDisplay(
      (prev) => (prev = { ...modalDefaults, [modalName]: true })
    );
  };
  useEffect(() => {
    testSkills.forEach((skillCategory) => {
      const skills = skillCategory.skills;
      skills.forEach((skill) => {
        setSkillCheckbox((prev) => ({
          ...prev,
          [skill.skillId]: false,
        }));
      });
    });
    testStudents.forEach((student) => {
      setStudentCheckbox((prev) => ({
        ...prev,
        [student.studentId]: false,
      }));
    });
  }, []);
  useEffect(() => {
    setAssignmentDetails((prev) => ({ ...prev, number: 0 }));
  }, [assignmentDetails.skills]);
  return (
    <div className="min-h-[100vh] flex flex-col">
      <GeneralNav />
      <div className="flex items-stretch mb-auto grow">
        <div className="sidebar bg-white w-[270px]">
          <Sidebar />
        </div>
        <div className="bg-[#E5E5E5] flex-1 px-[6%] py-8">
          <div className="flex justify-between items-center">
            <h2
              className="text-[28px] font-bold mb-6"
              data-testid="curriculum-assignment-heading"
            >
              New Assignment
            </h2>
            <span className="hover:opacity-80 cursor-pointer flex items-center gap-3">
              <span className="text-lg">
                <BsPlusCircle />
              </span>
              <span
                className="text-lg font-semibold"
                onClick={() => {
                  showModal("historyResponse");
                }}
              >
                Assignment History
              </span>
            </span>
          </div>
          <div className="">
            <input
              type="text"
              name="title"
              id="assignmentTitle"
              className="h-[44px] w-[400px] py-2 px-4 rounded-md outline-none"
              placeholder="Assignment Title"
              value={assignmentDetails.title}
              onChange={handleInputChange}
            />
            <div className="pt-4 mt-4 border-t border-[#BDBDBD] flex flex-col gap-4">
              <div className="rounded-md h-[58px] bg-white flex items-center overflow-y-hidden">
                <div className="rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full">
                  <span className="font-bold">Skill(s)</span>
                  <span
                    className="text-2xl cursor-pointer rounded-full border p-1 hover:opacity-80 hover:scale-125 transition-all ease-in-out animate-pulse hover:animate-none"
                    onClick={() => {
                      showModal("skillsResponse");
                    }}
                  >
                    <TbMedal />{" "}
                  </span>
                </div>
                <div className="px-14">
                  <span className="font-medium">
                    {assignmentDetails.skills?.length} skill
                    {assignmentDetails.skills?.length === 1 ? "" : "(s)"}{" "}
                    selected
                  </span>{" "}
                  value
                </div>
              </div>
              <div className="rounded-md h-[58px] bg-white flex items-center overflow-y-hidden">
                <div className="rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full">
                  <span className="font-bold">Student(s)</span>
                  <span
                    className="text-2xl cursor-pointer rounded-full border p-1 hover:opacity-80 hover:scale-125 transition-all ease-in-out animate-pulse hover:animate-none"
                    onClick={() => {
                      showModal("studentResponse");
                    }}
                  >
                    <IoPersonAddOutline />{" "}
                  </span>
                </div>
                <div className="px-14">
                  <span className="font-medium">
                    {assignmentDetails.students?.length} student
                    {assignmentDetails.students?.length === 1 ? "" : "(s)"}{" "}
                    selected
                  </span>
                </div>
              </div>
              <div className="rounded-md h-[58px] bg-white flex items-center overflow-y-hidden">
                <div className="rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full">
                  <span className="font-bold">Scheduling</span>
                </div>
                <div className="px-14">
                  <div className="flex items-center gap-14">
                    <div className="form-check flex items-center gap-2">
                      <input
                        className=""
                        type="radio"
                        name="schedule"
                        value="now"
                        checked={assignmentDetails.schedule === "now"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 font-medium"
                        htmlFor="schedule"
                      >
                        Start assignment now
                      </label>
                    </div>
                    <div className="form-check flex items-center gap-2">
                      <input
                        className=""
                        type="radio"
                        name="schedule"
                        value="later"
                        checked={assignmentDetails.schedule === "later"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 font-medium"
                        htmlFor="schedule"
                      >
                        Schedule for later date
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md h-[58px] bg-white flex items-center overflow-y-hidden">
                <div className="rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full">
                  <span className="font-bold">No. of questions</span>
                </div>
                <div className="px-14 flex gap-8 items-center">
                  <input
                    id="questionCount"
                    type="number"
                    value={assignmentDetails?.number}
                    className="bg-gray-100 px-4 py-2 max-w-[100px] assignment-input caret-transparent font-medium outline-none border-none rounded-md"
                    readOnly={true}
                  />
                  <div>
                    <input
                      type="range"
                      name="number"
                      min={0}
                      max={100}
                      value={assignmentDetails?.number}
                      step={assignmentDetails.skills?.length}
                      className="w-[380px] h-[12px] appearance-none rounded-lg bg-gray-200 opacity-90 outline-none transition-all hover:opacity-100 assignment-slider"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="rounded-md h-[58px] bg-white flex items-center overflow-y-hidden">
                <div className="rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full">
                  <span className="font-bold">Order of questions</span>
                </div>
                <div className="px-14 flex items-center gap-8">
                  <div className="flex items-center gap-14">
                    <div className="form-check flex items-center gap-2">
                      <input
                        className=""
                        type="radio"
                        name="order"
                        value="random"
                        checked={assignmentDetails.order === "random"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 font-medium"
                        htmlFor="order"
                      >
                        Random
                      </label>
                    </div>
                    <div className="form-check flex items-center gap-2">
                      <input
                        className=""
                        type="radio"
                        name="order"
                        value="sequence"
                        checked={assignmentDetails.order === "sequence"}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 font-medium"
                        htmlFor="order"
                      >
                        Sequence
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row-reverse gap-4 mt-4">
                <span
                  onClick={() => {
                    showModal("createResponse");
                  }}
                >
                  <Button color="#F28E2C" text="Create" />
                </span>
                <span
                  onClick={() => {
                    showModal("cancelResponse");
                  }}
                >
                  <Button color="#F28E2C" text="Cancel" />
                </span>
                <div className="mr-4">
                  <span
                    onClick={() => {
                      showModal("saveResponse");
                    }}
                  >
                    <Button color="#F28E2C" text="Save" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        <div
          className={`w-full h-full ${
            modalWrapperDisplay ? "showModal" : "hideModal"
          } backdrop-blur-sm bg-gray-100/50 fixed left-0 z-50 flex justify-center items-center`}
        >
          {modalWrapperDisplay && (
            <div className="relative max-w-[850px] bg-white rounded-xl">
              <span
                className="text-[22px] absolute right-8 top-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all ease-in-out opacity-60"
                onClick={hideModal}
              >
                <FaTimes />
              </span>
              {modalItemsDisplay?.saveResponse && (
                <div className="w-full py-20 px-24 font-semibold text-center text-xl">
                  <p>You have successfully saved an assignment</p>
                  <p>
                    Click on{" "}
                    <span
                      className="font-bold text-[#F28E2C] cursor-pointer"
                      onClick={() => {
                        switchModal("historyResponse");
                      }}
                    >
                      ASSINGMENT HISTORY
                    </span>{" "}
                    to view your Assingment.
                  </p>
                </div>
              )}
              {modalItemsDisplay?.createResponse && (
                <div className="w-full py-20 px-24 font-semibold text-center text-xl">
                  <p>You have successfully created an assignment</p>
                  <p>
                    Click on{" "}
                    <span
                      className="font-bold text-[#F28E2C] cursor-pointer"
                      onClick={() => {
                        switchModal("historyResponse");
                      }}
                    >
                      ASSINGMENT HISTORY
                    </span>{" "}
                    to view your Assingment.
                  </p>
                </div>
              )}
              {modalItemsDisplay?.cancelResponse && (
                <div className="w-full py-20 px-24 font-bold text-xl">
                  <p className="text-xl">
                    Are you sure you want to{" "}
                    <span className="text-[#E30F0F] text-center">Cancel?</span>
                  </p>
                  <div className="flex flex-row-reverse gap-4 mt-4">
                    <span
                      onClick={() => {
                        hideModal();
                      }}
                    >
                      <Button color="#F28E2C" text="No" />
                    </span>
                    <Link href="/curriculum/">
                      <span>
                        <Button color="#F28E2C" text="Yes" />
                      </span>
                    </Link>
                  </div>
                </div>
              )}
              {modalItemsDisplay?.historyResponse && (
                <div className="p-12 min-h-[500px] min-w-[800px]">
                  <h3 className="text-2xl font-semibold">Assignment History</h3>
                  <div className="flex gap-6 items-center mt-8">
                    <span
                      className="pb-2 border-b-[3px] font-bold text-black/50 cursor-pointer"
                      style={{
                        borderColor:
                          historyType === "active" ? "#F28E2C" : "white",
                      }}
                      onClick={() => setHistoryType((prev) => "active")}
                    >
                      Active
                    </span>
                    <span
                      className="pb-2 border-b-[3px] font-bold text-black/50 cursor-pointer"
                      style={{
                        borderColor:
                          historyType === "completed" ? "#F28E2C" : "white",
                      }}
                      onClick={() => setHistoryType((prev) => "completed")}
                    >
                      Completed
                    </span>
                    <span
                      className="pb-2 border-b-[3px] font-bold text-black/50 cursor-pointer"
                      style={{
                        borderColor:
                          historyType === "archived" ? "#F28E2C" : "white",
                      }}
                      onClick={() => setHistoryType((prev) => "archived")}
                    >
                      Archived
                    </span>
                  </div>
                  <div></div>
                </div>
              )}
              {modalItemsDisplay?.skillsResponse && (
                <div className="py-8 min-h-[650px] w-full">
                  <div className="flex gap-8 pl-12  h-full items-stretch mb-auto grow">
                    <div className="w-[180px] flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold">Select Skill</h3>
                        <div className="mt-12 flex flex-col gap-4">
                          <div className="px-4 py-2 flex items-center justify-between w-full rounded-lg h-[46px] bg-gray-100 drop-shadow-md">
                            <p className="opacity-60 text-sm font-semibold">
                              Computer
                            </p>
                          </div>
                          <div className="px-4 py-2 flex items-center justify-between w-full rounded-lg h-[46px] bg-gray-100 drop-shadow-md">
                            <p className="opacity-60 text-sm font-semibold truncate ...">
                              Common Core
                            </p>
                            <span className="opacity-60 text-3xl cursor-pointer">
                              <RiArrowDropDownLine />
                            </span>
                          </div>
                          <div className="px-4 py-2 flex items-center justify-between w-full rounded-lg h-[46px] bg-gray-100 drop-shadow-md">
                            <p className="opacity-60 text-sm font-semibold truncate ...">
                              Grade 1
                            </p>
                            <span className="opacity-60 text-3xl cursor-pointer">
                              <RiArrowDropDownLine />
                            </span>
                          </div>
                        </div>
                      </div>
                      <span onClick={hideModal} className="">
                        <Button color="#F28E2C" text="Done" />
                      </span>
                    </div>
                    <div>
                      <div className="relative max-w-[450px] bg-gray-100 rounded-lg px-16 py-[10px]">
                        <input
                          type="text"
                          className="bg-transparent outline-none border-none placeholder:font-semibold"
                          name="asd"
                          id="sd"
                          placeholder="Search skill"
                        />
                        <span className="absolute left-4 top-3 text-2xl text-gray-400">
                          <HiMagnifyingGlass />{" "}
                        </span>
                      </div>
                      <div className="mt-12 h-[500px] pr-4 scroll-smooth overflow-y-auto grid grid-cols-1 gap-6 small-scroll-thumb">
                        {testSkills.map(
                          ({ categoryId, categoryTitle, skills }) => (
                            <div
                              key={categoryTitle}
                              className="rounded-xl bg-white drop-shadow-md border max-w-[550px]"
                            >
                              <div className="border-b h-14 px-4 flex justify-between gap-8 items-center relative">
                                <div className="flex items-center gap-4">
                                  <div className="text-[#F28E2C] text-3xl">
                                    <TbMedal />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg">
                                      {categoryTitle}
                                    </h3>
                                    <p className="opacity-60 text-sm font-semibold truncate ... w-[300px]">
                                      Use addition and subtraction with 20 to
                                      solve world hunger
                                    </p>
                                  </div>
                                </div>
                                <span className="bg-[#F28E2C]/70 text-xs font-bold opacity-70 rounded-2xl py-1 px-4 absolute right-4 top-4 truncate ...">
                                  {skills.length}{" "}
                                  {skills.length > 1 ? "skills" : "skill"}
                                </span>
                              </div>
                              <div className="divide-y">
                                {skills.map(({ name, skillId }) => (
                                  <div
                                    key={skillId}
                                    className="flex px-6 h-12 gap-4 items-center"
                                  >
                                    <label className="checkbox-container">
                                      <input
                                        type="checkbox"
                                        name={skillId}
                                        checked={skillCheckbox[skillId]}
                                        onChange={handleSkillCheckboxChange}
                                      />
                                      <span className="checkmark small-checkmark"></span>
                                    </label>
                                    <p className="opacity-60 text-sm font-semibold truncate ... w-full">
                                      Use addition and subtraction with 20 to
                                      solve world hunger to solve world hunger
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {modalItemsDisplay?.studentResponse && (
                <div className="py-12 h-[500px] min-w-[800px]">
                  <h3 className="text-2xl font-semibold pl-12">Student(s)</h3>
                  <div className="flex items-center justify-between px-12 py-4 border-b">
                    <div className="flex items-center gap-4">
                      <label className="checkbox-container bottom-1">
                        <input
                          type="checkbox"
                          name="allStudents"
                          checked={allStudentCheckbox.isChecked}
                          onChange={handleAllStudentChechbox}
                        />
                        <span className="checkmark big-checkmark"></span>
                      </label>
                      <p className="font-semibold">
                        {allStudentCheckbox.isChecked
                          ? "Unselect all Students"
                          : "Select all Students"}
                      </p>
                    </div>
                    <div className="rounded-md px-3 gap-6 flex items-center border py-1">
                      <span className="opacity-70 font-semibold">Class</span>
                      <span className="opacity-60 text-3xl cursor-pointer">
                        <RiArrowDropDownLine />
                      </span>
                    </div>
                  </div>
                  <div className="p-12 h-[250px] grid grid-cols-4 scroll-smooth overflow-y-auto gap-x-6 gap-y-8 small-scroll-thumb">
                    {testStudents.map(({ studentId }) => (
                      <div key={studentId} className="flex items-center gap-4">
                        <label className="checkbox-container bottom-1">
                          <input
                            type="checkbox"
                            name={studentId}
                            checked={studentCheckbox[studentId]}
                            onChange={handleStudentCheckboxChange}
                          />
                          <span className="checkmark small-checkmark"></span>
                        </label>
                        <p className="font-semibold">Students {studentId}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-12 py-4 flex flex-row-reverse">
                    <span onClick={hideModal} className="">
                      <Button color="#F28E2C" text="Confirm" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default Assignments;
