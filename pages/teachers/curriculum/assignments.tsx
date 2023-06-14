import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Button from "@/components/UI/Button";
import { BsPlusCircle } from "react-icons/bs";
import { FaChevronLeft, FaTimes } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { TbMedal } from "react-icons/tb";
import StudentModal from "@/components/Teachers/curriculum/assignment/StudentModal";
import SkillModal from "@/components/Teachers/curriculum/assignment/SkillModal";

import { RootState } from "store/store";
import { useSelector, useDispatch } from "react-redux";
import { getStudents } from "store/studentSlice";
import SingleAssignment from "@/components/Teachers/curriculum/assignment/singleAssignment";

import { SkillDetails, AssignmentDetails, AssignmentSkill, Student, DynamicChechbox, IMainAssignment } from "types/interfaces";
import { addNewAssignments, getAssignments, updateAssignment } from "services/assignmentService";
import { getDate } from "utils/getDate";
import { useRouter } from "next/router";
import TeacherLayout from "@/components/layouts/TeacherLayout";

const Assignments = () => {
   const modalDefaults = {
      saveResponse: false,
      createResponse: false,
      cancelResponse: false,
      historyResponse: false,
      skillsResponse: false,
      studentResponse: false,
   };
   const dispatch = useDispatch();
   const router = useRouter();
   const [modalWrapperDisplay, setModalWrapperDisplay] = useState(false);
   const [modalItemsDisplay, setModalItemsDisplay] = useState(modalDefaults);
   const [historyType, setHistoryType] = useState("active");
   const [skillCheckbox, setSkillCheckbox] = useState<DynamicChechbox>({});
   const [studentCheckbox, setStudentCheckbox] = useState<DynamicChechbox>({});
   const [allStudentCheckbox, setAllStudentCheckbox] = useState({
      isChecked: false,
   });
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const [editId, setEditId] = useState<number | string>("");
   const [assignmentDetails, setAssignmentDetails] = useState<AssignmentDetails>({
      title: "",
      order: "random",
      number: 1,
      skills: [],
      students: [],
      start_date: getDate(),
      end_date: "",
      is_current: true,
   });

   const assingmentSkills = useSelector((state: RootState): SkillDetails[] => state.skills);
   const { assignments } = useSelector((state: RootState) => state.allAssignments);

   const { students } = useSelector((state: RootState) => state.students);

   const setEditAssignment = (assignment: any, id: string | number) => {
      setAssignmentDetails(assignment);

      setIsEditing(true);
      setEditId(id);
      setModalWrapperDisplay((prev) => false);
      setModalItemsDisplay((prev) => modalDefaults);
   };

   const resetAssignments = () => {
      setAssignmentDetails({
         title: "",
         order: "random",
         number: 1,
         skills: [],
         students: [],
         start_date: getDate(),
         end_date: "",
         is_current: true,
      });
   };
   const addSkill = (newSkill: AssignmentSkill) => {
      setAssignmentDetails((prev) => {
         const prevSkills = prev.skills;
         return { ...prev, skills: [...prevSkills, newSkill] };
      });
   };
   const removeSkill = (newSkill: AssignmentSkill) => {
      setAssignmentDetails((prev) => {
         const prevSkills = prev.skills;
         const newSkills = prevSkills.filter((skill) => skill.skillId !== newSkill.skillId);
         return { ...prev, skills: newSkills };
      });
   };
   const addStudent = (newStudent: Student) => {
      setAssignmentDetails((prev) => {
         const prevStudents = prev.students;
         return { ...prev, students: [...prevStudents, newStudent] };
      });
   };
   const removeStudent = (newStudent: Student) => {
      setAssignmentDetails((prev) => {
         const prevStudents = prev.students;
         const newStudents = prevStudents.filter((student) => student.email !== newStudent.email);
         return { ...prev, students: newStudents };
      });
   };
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAssignmentDetails((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };
   const updateAssignmentSchedule = (value: boolean) => {
      setAssignmentDetails((prev) => {
         return { ...prev, is_current: value };
      });
   };
   const updateScheduleDate = (key: string, value: string) => {
      setAssignmentDetails((prev) => {
         return { ...prev, [key]: value };
      });
   };
   const handleSkillCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
   const handleStudentCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, studentDetails: Student) => {
      setStudentCheckbox((prev) => ({
         ...prev,
         [e.target.name]: e.target.checked,
      }));
      const value = e.target.checked;
      if (value) {
         addStudent(studentDetails);
      } else {
         removeStudent(studentDetails);
      }
   };
   const handleAllStudentChechbox = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAllStudentCheckbox({
         isChecked: e.target.checked,
      });
      const value = e.target.checked;
      if (value) {
         setAssignmentDetails((prev) => {
            return { ...prev, students: students?.students };
         });
         const newCheckboxes = Object.keys(studentCheckbox).reduce((prev, student) => {
            return { ...prev, [student]: true };
         }, {});
         setStudentCheckbox(newCheckboxes);
      } else {
         setAssignmentDetails((prev) => {
            return { ...prev, students: [] };
         });
         const newCheckboxes = Object.keys(studentCheckbox).reduce((prev, student) => {
            return { ...prev, [student]: false };
         }, {});
         setStudentCheckbox(newCheckboxes);
      }
   };
   const showModal = (modalName: string) => {
      setModalWrapperDisplay((prev) => true);
      setModalItemsDisplay((prev) => ({ ...modalDefaults, [modalName]: true }));
   };
   const hideModal = () => {
      setModalWrapperDisplay((prev) => false);
      setModalItemsDisplay((prev) => modalDefaults);
   };
   const switchModal = (modalName: string) => {
      setModalItemsDisplay((prev) => (prev = { ...modalDefaults, [modalName]: true }));
   };
   useEffect(() => {
      assingmentSkills.forEach((skillCategory) => {
         skillCategory.tests.forEach((test) => {
            setSkillCheckbox((prev) => ({
               ...prev,
               [test.testId]: false,
            }));
         });
      });
      students?.students?.forEach((student) => {
         setStudentCheckbox((prev) => ({
            ...prev,
            [student.email]: false,
         }));
      });
   }, [students?.students, assingmentSkills]);
   const fetchAllStudents = useCallback(async () => {
      await dispatch(getStudents());
   }, [dispatch]);
   useEffect(() => {
      dispatch(getAssignments());
   }, [dispatch]);
   useEffect(() => {
      setAssignmentDetails((prev) => ({ ...prev, number: 1 }));
   }, [assignmentDetails.skills]);
   useEffect(() => {
      fetchAllStudents();
   }, [fetchAllStudents]);
   return (
      <>
         <TeacherLayout>
            <div className="flex items-center justify-between">
               <div className="mb-6 flex items-center gap-x-2 text-[#2073fa]">
                  <span
                     className="cursor-pointer text-[22px] font-bold"
                     onClick={() => {
                        router.back();
                     }}
                  >
                     <FaChevronLeft />
                  </span>
                  <h2 className="text-[28px] font-bold" data-testid="curriculum-assignment-heading">
                     New Assignment
                  </h2>
               </div>
               <span className="flex cursor-pointer items-center gap-3 text-[#2073fa] hover:opacity-80">
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
                  className="h-[44px] w-[400px] rounded-md py-2 px-4 outline-none"
                  placeholder="Assignment Title"
                  value={assignmentDetails.title}
                  onChange={handleInputChange}
               />
               <div className="mt-4 flex flex-col gap-4 border-t border-[#BDBDBD] pt-4">
                  <div className="flex h-[58px] items-center overflow-y-hidden rounded-md bg-white">
                     <div className="shadow-right flex h-full w-[180px] items-center justify-between rounded-r-md px-4">
                        <span className="font-bold">Skill(s)</span>
                        <span
                           className="animate-pulse cursor-pointer rounded-full border p-1 text-2xl transition-all ease-in-out hover:scale-125 hover:animate-none hover:opacity-80"
                           onClick={() => {
                              showModal("skillsResponse");
                           }}
                           data-testid="skills-modal-controller"
                        >
                           <TbMedal />{" "}
                        </span>
                     </div>
                     <div className="px-14">
                        <span className="font-medium">
                           {assignmentDetails.skills?.length} skill
                           {assignmentDetails.skills?.length === 1 ? "" : "(s)"} selected
                        </span>{" "}
                        value
                     </div>
                  </div>
                  <div className="flex h-[58px] items-center overflow-y-hidden rounded-md bg-white">
                     <div className="shadow-right flex h-full w-[180px] items-center justify-between rounded-r-md px-4">
                        <span className="font-bold">Student{"(s)"}</span>
                        <span
                           className="animate-pulse cursor-pointer rounded-full border p-1 text-2xl transition-all ease-in-out hover:scale-125 hover:animate-none hover:opacity-80"
                           onClick={() => {
                              showModal("studentResponse");
                           }}
                           data-testid="students-modal-controller"
                        >
                           <IoPersonAddOutline />{" "}
                        </span>
                     </div>
                     <div className="px-14">
                        <span className="font-medium">
                           {assignmentDetails.students?.length} student
                           {assignmentDetails.students?.length === 1 ? "" : "(s)"} selected
                        </span>
                     </div>
                  </div>
                  <div className="flex h-[58px] items-center rounded-md bg-white">
                     <div className="shadow-right flex h-full min-w-[180px] items-center justify-between rounded-r-md px-4">
                        <span className="font-bold">Scheduling</span>
                     </div>
                     <div className="pl-14 pr-8">
                        <div className="flex items-center gap-4">
                           <div className="form-check flex items-center gap-2">
                              <input
                                 className=""
                                 type="radio"
                                 name="schedule"
                                 value="now"
                                 id="now-schedule"
                                 checked={assignmentDetails.is_current}
                                 onChange={() => {
                                    updateScheduleDate("start_date", getDate());
                                    updateAssignmentSchedule(true);
                                 }}
                              />
                              <label className="form-check-label inline-block font-medium text-gray-800" htmlFor="now-schedule">
                                 Start Now
                              </label>
                           </div>
                           <div className="form-check flex items-center gap-2">
                              <input
                                 className=""
                                 type="radio"
                                 name="schedule"
                                 value="later"
                                 id="later-schedule"
                                 checked={!assignmentDetails.is_current}
                                 onChange={() => updateAssignmentSchedule(false)}
                              />
                              <label className="form-check-label inline-block font-medium text-gray-800" htmlFor="later-schedule">
                                 Schedule for later
                              </label>
                           </div>

                           {!assignmentDetails.is_current && (
                              <div className="relative max-w-fit">
                                 <input
                                    type="date"
                                    value={assignmentDetails.start_date}
                                    className="hoverElement max-w-[130px] rounded-md border border-[#2073fa] px-3 py-1 text-[15px] outline-none"
                                    onChange={(e) => {
                                       updateScheduleDate("start_date", e.target.value);
                                    }}
                                 />
                                 <div className="hoverText right-[0] -top-[56px] bg-[#2073fa] after:bg-[#2073fa]">Start date</div>
                              </div>
                           )}
                           <div className="relative max-w-fit">
                              <input
                                 type="date"
                                 value={assignmentDetails.end_date}
                                 className="hoverElement max-w-[130px] rounded-md border border-[#2073fa] px-3 py-1 text-[15px] outline-none"
                                 onChange={(e) => {
                                    updateScheduleDate("end_date", e.target.value);
                                 }}
                              />
                              <div className="hoverText right-[0] -top-[56px] bg-[#2073fa] after:bg-[#2073fa]">End date</div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex h-[58px] items-center overflow-y-hidden rounded-md bg-white">
                     <div className="shadow-right flex h-full w-[180px] items-center justify-between rounded-r-md px-4">
                        <span className="font-bold">No. of questions</span>
                     </div>
                     <div className="flex items-center gap-8 px-14">
                        <input
                           id="questionCount"
                           type="number"
                           value={assignmentDetails?.number}
                           className="assignment-input max-w-[100px] rounded-md border-none bg-gray-100 px-4 py-2 font-medium caret-transparent outline-none"
                           readOnly={true}
                        />
                        <div>
                           <input
                              type="range"
                              name="number"
                              min={1}
                              max={100}
                              value={assignmentDetails?.number}
                              className="assignment-slider h-[12px] w-[380px] appearance-none rounded-lg bg-gray-200 opacity-90 outline-none transition-all hover:opacity-100"
                              onChange={handleInputChange}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="flex h-[58px] items-center overflow-y-hidden rounded-md bg-white">
                     <div className="shadow-right flex h-full w-[180px] items-center justify-between rounded-r-md px-4">
                        <span className="font-bold">Order of questions</span>
                     </div>
                     <div className="flex items-center gap-8 px-14">
                        <div className="flex items-center gap-14">
                           <div className="form-check flex items-center gap-2">
                              <input
                                 className=""
                                 type="radio"
                                 name="order"
                                 id="random-order"
                                 value="random"
                                 checked={assignmentDetails.order === "random"}
                                 onChange={handleInputChange}
                              />
                              <label className="form-check-label inline-block font-medium text-gray-800" htmlFor="random-order">
                                 Random
                              </label>
                           </div>
                           <div className="form-check flex items-center gap-2">
                              <input
                                 className=""
                                 type="radio"
                                 name="order"
                                 value="sequence"
                                 id="sequence-order"
                                 checked={assignmentDetails.order === "sequence"}
                                 onChange={handleInputChange}
                              />
                              <label className="form-check-label inline-block font-medium text-gray-800" htmlFor="sequence-order">
                                 Sequence
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-4 flex flex-row-reverse gap-4">
                     <span
                        onClick={async () => {
                           if (!isEditing) {
                              await dispatch(
                                 addNewAssignments({
                                    assignment: assignmentDetails,
                                    actionType: "active",
                                    showModal,
                                    modalType: "createResponse",
                                    resetAssignments,
                                 })
                              );
                           } else {
                              await dispatch(
                                 updateAssignment({
                                    assignment: assignmentDetails,
                                    actionType: "active",
                                    showModal,
                                    modalType: "createResponse",
                                    resetAssignments,
                                    id: editId,
                                 })
                              );
                           }
                        }}
                     >
                        <Button color="#2073fa" text="Create" />
                     </span>
                     <span
                        onClick={() => {
                           showModal("cancelResponse");
                        }}
                     >
                        <Button color="#2073fa" text="Cancel" />
                     </span>
                     <div className="mr-4">
                        <span
                           onClick={async () => {
                              if (!isEditing) {
                                 await dispatch(
                                    addNewAssignments({
                                       assignment: assignmentDetails,
                                       actionType: "draft",
                                       showModal,
                                       modalType: "saveResponse",
                                       resetAssignments,
                                    })
                                 );
                              } else {
                                 await dispatch(
                                    updateAssignment({
                                       assignment: assignmentDetails,
                                       actionType: "draft",
                                       showModal,
                                       modalType: "saveResponse",
                                       resetAssignments,
                                       id: editId,
                                    })
                                 );
                              }
                           }}
                        >
                           <Button color="#2073fa" text={isEditing ? "Edit" : "Save"} />
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </TeacherLayout>
         {
            <div
               className={`fixed left-0 flex h-full w-full items-center justify-center bg-gray-100/50 backdrop-blur-sm ${
                  modalWrapperDisplay ? "showModal" : "hideModal"
               }`}
            >
               {modalWrapperDisplay && (
                  <div className="relative max-h-[90vh] max-w-[850px] overflow-hidden overflow-y-scroll rounded-xl bg-white">
                     <span
                        className="absolute right-8 top-10 cursor-pointer text-[22px] opacity-60 transition-all ease-in-out hover:scale-110 hover:opacity-80"
                        onClick={hideModal}
                     >
                        <FaTimes />
                     </span>
                     {modalItemsDisplay.saveResponse && (
                        <div className="w-full py-20 px-24 text-center text-xl font-semibold">
                           <p>You have successfully saved an assignment</p>
                           <p>
                              Click on{" "}
                              <span
                                 className="cursor-pointer font-bold text-[#2073fa]"
                                 onClick={() => {
                                    switchModal("historyResponse");
                                 }}
                              >
                                 ASSIGNMENT HISTORY
                              </span>{" "}
                              to view your Assignment.
                           </p>
                        </div>
                     )}
                     {modalItemsDisplay.createResponse && (
                        <div className="w-full py-20 px-24 text-center text-xl font-semibold">
                           <p>You have successfully created an assignment</p>
                           <p>
                              Click on{" "}
                              <span
                                 className="cursor-pointer font-bold text-[#2073fa]"
                                 onClick={() => {
                                    switchModal("historyResponse");
                                 }}
                              >
                                 ASSIGNMENT HISTORY
                              </span>{" "}
                              to view your Assignment.
                           </p>
                        </div>
                     )}
                     {modalItemsDisplay.cancelResponse && (
                        <div className="w-full py-20 px-24 text-xl font-bold">
                           <p className="text-xl">
                              Are you sure you want to <span className="text-center text-[#E30F0F]">Cancel?</span>
                           </p>
                           <div className="mt-4 flex flex-row-reverse gap-4">
                              <span
                                 onClick={() => {
                                    hideModal();
                                 }}
                              >
                                 <Button color="#2073fa" text="No" />
                              </span>
                              <Link href="/teachers/curriculum/">
                                 <span
                                    onClick={() => {
                                       setIsEditing(false);
                                       setEditId("");
                                    }}
                                 >
                                    <Button color="#2073fa" text="Yes" />
                                 </span>
                              </Link>
                           </div>
                        </div>
                     )}
                     {modalItemsDisplay.historyResponse && (
                        <div className="min-h-[500px] min-w-[800px] p-12">
                           <h3 className="text-2xl font-semibold">Assignment History</h3>
                           <div className="mt-8 flex items-center gap-6">
                              <span
                                 className="cursor-pointer border-b-[3px] pb-2 font-bold text-black/50"
                                 style={{
                                    borderColor: historyType === "active" ? "#2073fa" : "white",
                                 }}
                                 onClick={() => setHistoryType((prev) => "active")}
                              >
                                 Active
                              </span>
                              <span
                                 className="cursor-pointer border-b-[3px] pb-2 font-bold text-black/50"
                                 style={{
                                    borderColor: historyType === "completed" ? "#2073fa" : "white",
                                 }}
                                 onClick={() => setHistoryType((prev) => "completed")}
                              >
                                 Completed
                              </span>
                              <span
                                 className="cursor-pointer border-b-[3px] pb-2 font-bold text-black/50"
                                 style={{
                                    borderColor: historyType === "draft" ? "#2073fa" : "white",
                                 }}
                                 onClick={() => setHistoryType((prev) => "draft")}
                              >
                                 Draft
                              </span>
                           </div>
                           <div className="mt-3 flex flex-col gap-3">
                              {assignments?.map((assignment: any, index: number) => {
                                 if (assignment.status.toLowerCase() === historyType.toLowerCase()) {
                                    return <SingleAssignment setEditAssignment={setEditAssignment} assignment={assignment} key={index} />;
                                 }
                              })}
                           </div>
                        </div>
                     )}
                     {modalItemsDisplay.skillsResponse && (
                        <SkillModal
                           skills={assingmentSkills}
                           hideModal={hideModal}
                           handleSkillCheckboxChange={handleSkillCheckboxChange}
                           skillCheckbox={skillCheckbox}
                        />
                     )}
                     {modalItemsDisplay.studentResponse && (
                        <StudentModal
                           students={students?.students}
                           hideModal={hideModal}
                           handleStudentCheckboxChange={handleStudentCheckboxChange}
                           handleAllStudentChechbox={handleAllStudentChechbox}
                           allStudentCheckbox={allStudentCheckbox}
                           studentCheckbox={studentCheckbox}
                        />
                     )}
                  </div>
               )}
            </div>
         }
      </>
   );
};

export default Assignments;
