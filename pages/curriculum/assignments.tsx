import React, { useState } from "react"
import { Button, Sidebar, GeneralNav } from "../../components"
import { BsPlusCircle } from "react-icons/bs"
import Link from "next/link"
import { FaTimes } from "react-icons/fa"
import { IoPersonAddOutline } from "react-icons/io5"
import { TbMedal } from "react-icons/tb"

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
   const [skills, setSkills] = useState({ currentValue: 2 })
   const [questionsRange, setQuestionsRange] = useState({ currentValue: "0" })
   const [modalItemsDisplay, setModalItemsDisplay] = useState(modalDefaults)
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
                        showModal("assignmentHistory")
                     } }>Assignment History</span>
                  </span>
               </div>
               <div className=''>
                  <input type='text' name='' id='' className='h-[44px] w-[400px] py-2 px-4 rounded-md outline-none' placeholder='Assignment Title' />
                  <div className='pt-4 mt-4 border-t border-[#BDBDBD] flex flex-col gap-4'>
                     <div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
                        <div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
                           <span className='font-bold'>Skill(s)</span>
                           <span className="text-2xl cursor-pointer hover:opacity-80 hover:scale-125 transition-all ease-in-out animate-pulse hover:animate-none"><TbMedal /> </span>
                        </div>
                        <div className='px-14'>
                           <span className="font-medium">{ skills?.currentValue } skill(s) selected</span>
                        </div>
                     </div>
                     <div className='rounded-md h-[58px] bg-white flex items-center overflow-y-hidden'>
                        <div className='rounded-r-md flex items-center justify-between px-4 w-[180px] shadow-right h-full'>
                           <span className='font-bold'>Student(s)</span>
                           <span className="text-2xl cursor-pointer hover:opacity-80 hover:scale-125 transition-all ease-in-out animate-pulse hover:animate-none"><IoPersonAddOutline /> </span>
                        </div>
                        <div className='px-14'>
                           <span className="font-medium">0 student(s) selected</span>
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
                                    className="" type="radio" name="scheduleRadio" id="scheduleRadio1" />
                                 <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="scheduleRadio1">
                                    Start assignment now
                                 </label>
                              </div>
                              <div className="form-check flex items-center gap-2">
                                 <input className="" type="radio" name="scheduleRadio" id="scheduleRadio2" checked />
                                 <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="scheduleRadio2">
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
                           <input id="questionCount" type="number" value={ questionsRange?.currentValue } className="bg-gray-100 px-4 py-2 max-w-[100px] assignment-input caret-transparent font-medium outline-none border-none rounded-md" />
                           <div>
                              <input type="range" min={ 0 } max={ 100 } value={ questionsRange?.currentValue } step={ skills?.currentValue } className="w-[380px] h-[12px] appearance-none rounded-lg bg-gray-200 opacity-90 outline-none transition-all hover:opacity-100 assignment-slider" onChange={ (e) => {
                                 setQuestionsRange((prev) => ({ currentValue: e.target.value }))
                              } } />
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
                                    className="" type="radio" name="arrangementRadio" id="arrangementRadio1" />
                                 <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="arrangementRadio1">
                                    Random
                                 </label>
                              </div>
                              <div className="form-check flex items-center gap-2">
                                 <input className="" type="radio" name="arrangementRadio" id="arrangementRadio2" checked />
                                 <label className="form-check-label inline-block text-gray-800 font-medium" htmlFor="arrangementRadio2">
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
            <div className={ `w-full h-full ${modalWrapperDisplay ? "showModal" : "hideModal"} backdrop-blur-sm bg-gray-100/50 fixed left-0 z-50 flex justify-center items-center` }>
               {
                  modalWrapperDisplay &&
                  <div className="relative">
                     <span className="text-2xl absolute right-8 top-8 cursor-pointer hover:scale-110 hover:opacity-90 transition-all ease-in-out" onClick={ hideModal }>
                        <FaTimes />
                     </span>
                     { modalItemsDisplay?.saveResponse &&
                        <div className="px-24 py-20 rounded-xl bg-white font-semibold text-center text-xl">
                           <p>You have successfully saved an assignment</p>
                           <p>Click on <span className="font-bold text-[#F28E2C] cursor-pointer" onClick={ () => {
                              switchModal("assignmentHistory")
                           } }>ASSINGMENT HISTORY</span> to view your Assingment.</p>
                        </div>
                     }
                     { modalItemsDisplay?.createResponse &&
                        <div className="px-24 py-20 rounded-xl bg-white font-semibold text-center text-xl">
                           <p>You have successfully created an assignment</p>
                           <p>Click on <span className="font-bold text-[#F28E2C] cursor-pointer" onClick={ () => {
                              switchModal("assignmentHistory")
                           } }>ASSINGMENT HISTORY</span> to view your Assingment.</p>
                        </div>
                     }
                     { modalItemsDisplay?.cancelResponse &&
                        <div className="px-24 py-20 rounded-xl bg-white font-bold text-xl">
                           <p className="text-2xl">Are you sure you want to <span className="text-[#E30F0F] text-center">Cancel?</span></p>
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
                  </div>
               }
            </div>
         }
      </div>
   )
}

export default Assignments
