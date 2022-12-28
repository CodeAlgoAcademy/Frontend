import React, { useState, useEffect } from "react"
import Link from "next/link"

import { Button, Sidebar, GeneralNav } from "components"
import { BsPlusCircle } from "react-icons/bs"
import { FaTimes } from "react-icons/fa"
import { IoPersonAddOutline } from "react-icons/io5"
import { TbMedal } from "react-icons/tb"
import { StudentModal, SkillModal } from "components/curriculum/assignment"

import { RootState } from "store/store"
import { useSelector, useDispatch } from "react-redux"
import { saveAssignment } from "store/newAssignmentSlice"
import { getStudents } from "store/studentSlice"

import { SkillDetails, AssignmentDetails, AssignmentSkill, Student, DynamicChechbox } from "types/interfaces"

const Assignments = () => {
   const modalDefaults = {
      saveResponse: false,
      createResponse: false,
      cancelResponse: false,
      historyResponse: false,
      skillsResponse: false,
      studentResponse: false
   }
   const [modalWrapperDisplay, setModalWrapperDisplay] = useState(false)
   const [modalItemsDisplay, setModalItemsDisplay] = useState(modalDefaults)
   const [historyType, setHistoryType] = useState("active")
   const [skillCheckbox, setSkillCheckbox] = useState<DynamicChechbox>({})
   const [studentCheckbox, setStudentCheckbox] = useState<DynamicChechbox>({})
   const [allStudentCheckbox, setAllStudentCheckbox] = useState({ isChecked: false })
   const [assignmentDetails, setAssignmentDetails] = useState<AssignmentDetails>({
      title: "",
      schedule: "now",
      order: "random",
      number: 0,
      skills: [],
      students: []
   })

   const assingmentSkills = useSelector(
      (state: RootState): SkillDetails[] => state.skills
   )

   const { students } = useSelector((state: RootState) => state.students)
   const addSkill = (newSkill: AssignmentSkill) => {
      setAssignmentDetails((prev) => {
         const prevSkills = prev.skills
         return { ...prev, skills: [...prevSkills, newSkill] }
      })
   }
   const removeSkill = (newSkill: AssignmentSkill) => {
      setAssignmentDetails((prev) => {
         const prevSkills = prev.skills
         const newSkills = prevSkills.filter(skill => skill.skillId !== newSkill.skillId)
         return { ...prev, skills: newSkills }
      })
   }
   const addStudent = (newStudent: Student) => {
      setAssignmentDetails((prev) => {
         const prevStudents = prev.students
         return { ...prev, students: [...prevStudents, newStudent] }
      })
   }
   const removeStudent = (newStudent: Student) => {
      setAssignmentDetails((prev) => {
         const prevStudents = prev.students
         const newStudents = prevStudents.filter(student => student.email !== newStudent.email)
         return { ...prev, students: newStudents }
      })
   }
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAssignmentDetails((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }))
   }
   const handleSkillCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSkillCheckbox((prev) => ({
         ...prev,
         [e.target.name]: e.target.checked,
      }))
      const value = e.target.checked
      if (value) {
         addSkill({ skillId: e.target.name })
      } else {
         removeSkill({ skillId: e.target.name })
      }
   }
   const handleStudentCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, studentDetails: Student) => {
      setStudentCheckbox((prev) => ({
         ...prev,
         [e.target.name]: e.target.checked,
      }))
      const value = e.target.checked
      if (value) {
         addStudent(studentDetails)
      } else {
         removeStudent(studentDetails)
      }
   }
   const handleAllStudentChechbox = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAllStudentCheckbox({
         isChecked: e.target.checked,
      })
      const value = e.target.checked
      if (value) {
         setAssignmentDetails((prev) => {
            return { ...prev, students: students }
         })
         const newCheckboxes = Object.keys(studentCheckbox).reduce((prev, student) => {
            return { ...prev, [student]: true }
         }, {})
         setStudentCheckbox(newCheckboxes)
      } else {
         setAssignmentDetails((prev) => {
            return { ...prev, students: [] }
         })
         const newCheckboxes = Object.keys(studentCheckbox).reduce((prev, student) => {
            return { ...prev, [student]: false }
         }, {})
         setStudentCheckbox(newCheckboxes)
      }
   }
   const showModal = (modalName: string) => {
      setModalWrapperDisplay((prev) => true)
      setModalItemsDisplay((prev) => prev = ({ ...prev, [modalName]: true }))
   }
   const hideModal = () => {
      setModalWrapperDisplay((prev) => false)
      setTimeout(() => setModalItemsDisplay((prev) => (modalDefaults)), 1000)
   }
   const switchModal = (modalName: string) => {
      setModalItemsDisplay((prev) => prev = ({ ...modalDefaults, [modalName]: true }))
   }
   useEffect(() => {
      assingmentSkills.forEach((skillCategory) => {
         const students = skillCategory.tests
         students.forEach((test) => {
            setSkillCheckbox((prev) => ({
               ...prev,
               [test.testId]: false
            }))
         })
      })
      students.forEach((student) => {
         setStudentCheckbox((prev) => ({
            ...prev,
            [student.email]: false
         }))
      })
   }, [])
   const fetchAllStudents = async () => {
      await getStudents()
   }
   useEffect(() => {
      setAssignmentDetails((prev) => ({ ...prev, number: 0 }))
   }, [assignmentDetails.skills])
   useEffect(() => {
      fetchAllStudents()
   }, [])
   return (
      <div className='min-h-[100vh] flex flex-col'>
         <GeneralNav />
         <div className='flex items-stretch mb-auto grow'>
            <div className='sidebar bg-white w-[270px]'>
               <Sidebar />
            </div>
            <div className='bg-[#E5E5E5] flex-1 px-[6%] py-8'>
               <div className='flex justify-between items-center'>
                  <h2 className='text-[28px] font-bold mb-6' data-testid='curriculum-assignment-heading'>
                     New Assignment
                  </h2>
                  <span className='hover:opacity-80 cursor-pointer flex items-center gap-3'>
                     <span className='text-lg'>
                        <BsPlusCircle />
                     </span>
                     <span className='text-lg font-semibold' onClick={ () => {
                        showModal("historyResponse")
                     } }>Assignment History</span>
                  </span>
               </div>
               <div className=''>
                  <input type='text' name='title' id='assignmentTitle' className='h-[44px] w-[400px] py-2 px-4 rounded-md outline-none' placeholder='Assignment Title' value={ assignmentDetails.title }
                     onChange={ handleInputChange } />
                  <div className='pt-4 mt-4 border-t border-[#BDBDBD] flex flex-col gap-4'>
                     <div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
                        <div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
                           <span className='font-bold'>Skill(s)</span>
                           <span className="text-2xl cursor-pointer rounded-full border p-1 hover:opacity-80 hover:scale-125 transition-all ease-in-out animate-pulse hover:animate-none" onClick={ () => {
                              showModal("skillsResponse")
                           } }><TbMedal /> </span>
                        </div>
                        <div className='px-14'>
                           <span className="font-medium">{ assignmentDetails.skills?.length } skill{ assignmentDetails.skills?.length === 1 ? "" : "(s)" } selected</span> value
                        </div>
                     </div>
                     <div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
                        <div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
                           <span className='font-bold'>Student(s)</span>
                           <span className="text-2xl cursor-pointer rounded-full border p-1 hover:opacity-80 hover:scale-125 transition-all ease-in-out animate-pulse hover:animate-none" onClick={ () => {
                              showModal("studentResponse")
                           } }><IoPersonAddOutline /> </span>
                        </div>
                        <div className='px-14'>
                           <span className="font-medium">{ assignmentDetails.students?.length } student{ assignmentDetails.students?.length === 1 ? "" : "(s)" } selected</span>
                        </div>
                     </div>
                     <div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
                        <div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
                           <span className='font-bold'>Scheduling</span>
                        </div>
                        <div className='px-14'>
                           <div className="flex items-center gap-14">
                              <div className="form-check flex items-center gap-2">
                                 <input
                                    className="" type="radio" name="schedule"
                                    value="now"
                                    checked={ assignmentDetails.schedule === "now" }
                                    onChange={ handleInputChange } />
                                 <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="schedule">
                                    Start assignment now
                                 </label>
                              </div>
                              <div className="form-check flex items-center gap-2">
                                 <input className="" type="radio" name="schedule"
                                    value="later"
                                    checked={ assignmentDetails.schedule === "later" }
                                    onChange={ handleInputChange } />
                                 <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="schedule">
                                    Schedule for later date
                                 </label>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
                        <div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
                           <span className='font-bold'>No. of questions</span>
                        </div>
                        <div className='px-14 flex gap-8 items-center'>
                           <input id="questionCount" type="number" value={ assignmentDetails?.number } className="bg-gray-100 px-4 py-2 max-w-[100px] assignment-input caret-transparent font-medium outline-none border-none rounded-md" readOnly={ true } />
                           <div>
                              <input type="range" name="number" min={ 0 } max={ 100 } value={ assignmentDetails?.number } step={ assignmentDetails.skills?.length } className="w-[380px] h-[12px] appearance-none rounded-lg bg-gray-200 opacity-90 outline-none transition-all hover:opacity-100 assignment-slider" onChange={ handleInputChange } />
                           </div>
                        </div>
                     </div>
                     <div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
                        <div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
                           <span className='font-bold'>Order of questions</span>
                        </div>
                        <div className='px-14 flex items-center gap-8'>
                           <div className="flex items-center gap-14">
                              <div className="form-check flex items-center gap-2">
                                 <input
                                    className="" type="radio" name="order"
                                    value="random"
                                    checked={ assignmentDetails.order === "random" }
                                    onChange={ handleInputChange } />
                                 <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="order">
                                    Random
                                 </label>
                              </div>
                              <div className="form-check flex items-center gap-2">
                                 <input className="" type="radio" name="order"
                                    value="sequence"
                                    checked={ assignmentDetails.order === "sequence" }
                                    onChange={ handleInputChange } />
                                 <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="order">
                                    Sequence
                                 </label>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='flex flex-row-reverse gap-4 mt-4'>
                        <span onClick={ () => {
                           showModal("createResponse")
                        } }>
                           <Button color="#F28E2C" text="Create" />
                        </span>
                        <span onClick={ () => {
                           showModal("cancelResponse")
                        } }>
                           <Button color="#F28E2C" text="Cancel" />
                        </span>
                        <div className="mr-4">
                           <span onClick={ () => {
                              showModal("saveResponse")
                           } }>
                              <Button color="#F28E2C" text="Save" />
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {
            <div className={ `w-full h-full ${modalWrapperDisplay ? "showModal" : "hideModal"} backdrop-blur-sm bg-gray-100/50 fixed left-0 flex justify-center items-center` }>
               {
                  modalWrapperDisplay &&
                  <div className="relative max-w-[850px] bg-white rounded-xl">
                     <span className="text-[22px] absolute right-8 top-10 cursor-pointer hover:scale-110 hover:opacity-80 transition-all ease-in-out opacity-60" onClick={ hideModal }>
                        <FaTimes />
                     </span>
                     { modalItemsDisplay?.saveResponse &&
                        <div className="w-full py-20 px-24 font-semibold text-center text-xl">
                           <p>You have successfully saved an assignment</p>
                           <p>Click on <span className="font-bold text-[#F28E2C] cursor-pointer" onClick={ () => {
                              switchModal("historyResponse")
                           } }>ASSINGMENT HISTORY</span> to view your Assingment.</p>
                        </div>
                     }
                     { modalItemsDisplay?.createResponse &&
                        <div className="w-full py-20 px-24 font-semibold text-center text-xl">
                           <p>You have successfully created an assignment</p>
                           <p>Click on <span className="font-bold text-[#F28E2C] cursor-pointer" onClick={ () => {
                              switchModal("historyResponse")
                           } }>ASSINGMENT HISTORY</span> to view your Assingment.</p>
                        </div>
                     }
                     { modalItemsDisplay?.cancelResponse &&
                        <div className="w-full py-20 px-24 font-bold text-xl">
                           <p className="text-xl">Are you sure you want to <span className="text-[#E30F0F] text-center">Cancel?</span></p>
                           <div className="flex flex-row-reverse gap-4 mt-4">
                              <span onClick={ () => {
                                 hideModal()
                              } }>
                                 <Button color="#F28E2C" text="No" />
                              </span>
                              <Link href='/curriculum/'>
                                 <span>
                                    <Button color="#F28E2C" text="Yes" />
                                 </span>
                              </Link>
                           </div>
                        </div>
                     }
                     { modalItemsDisplay?.historyResponse &&
                        <div className="p-12 min-h-[500px] min-w-[800px]">
                           <h3 className="text-2xl font-semibold">Assignment History</h3>
                           <div className="flex gap-6 items-center mt-8">
                              <span className="pb-2 border-b-[3px] font-bold text-black/50 cursor-pointer" style={ { borderColor: historyType === "active" ? "#F28E2C" : "white" } } onClick={ () => setHistoryType((prev) => "active") }>Active</span>
                              <span className="pb-2 border-b-[3px] font-bold text-black/50 cursor-pointer" style={ { borderColor: historyType === "completed" ? "#F28E2C" : "white" } } onClick={ () => setHistoryType((prev) => "completed") }>Completed</span>
                              <span className="pb-2 border-b-[3px] font-bold text-black/50 cursor-pointer" style={ { borderColor: historyType === "archived" ? "#F28E2C" : "white" } } onClick={ () => setHistoryType((prev) => "archived") }>Archived</span>
                           </div>
                           <div></div>
                        </div>
                     }
                     { modalItemsDisplay?.skillsResponse &&
                        <SkillModal skills={ assingmentSkills } hideModal={ hideModal } handleSkillCheckboxChange={ handleSkillCheckboxChange } skillCheckbox={ skillCheckbox } />
                     }
                     { modalItemsDisplay?.studentResponse &&
                        <StudentModal students={ students } hideModal={ hideModal } handleStudentCheckboxChange={ handleStudentCheckboxChange } handleAllStudentChechbox={ handleAllStudentChechbox } allStudentCheckbox={ allStudentCheckbox } studentCheckbox={ studentCheckbox } />
                     }
                  </div>
               }
            </div>
         }
      </div>
   )
}

export default Assignments
