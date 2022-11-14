import React, { useState } from "react"
import Image from "next/image"
import { BiBell, BiHomeAlt } from "react-icons/bi"
import { RiArrowDropDownLine } from "react-icons/ri"
import { RootState } from "../store/store"
import { useSelector, useDispatch } from "react-redux"
import { updateCurrentClass } from "../store/currentClassSlice"
import { IClass, CurrentClassState } from "../types/interfaces"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Logo from "../public/assets/CodeAlgo_Logo.png"
import { BiHomeAlt } from "react-icons/bi"
import { RiArrowDropDownLine } from "react-icons/ri"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

const classOptions = [
  {
    name: "Class A",
    color: "#F6B86F",
  },
  {
    name: "Class B",
    color: "#AADE98",
  },
  {
    name: "Class C",
    color: "#92C7F7",
  },
  {
    name: "Class D",
    color: "#FFE977",
  },
]

const GeneralNav = () => {
  const dispatch = useDispatch()
  const classes = useSelector((state: RootState): IClass[] => state.allClasses.classes)
  const currentClass = useSelector((state: RootState): CurrentClassState => state.currentClass)
  const classDetails = classes.map((item) => {
    const { className, color } = item.classDetails
    return { className, color }
  })
  const otherClassDetails = classDetails.filter((item) => item.className !== currentClass.className)
  const [classListView, setClassListView] = useState(false)
  const dropdownStyle = {
    transform: classListView ? "rotate(180deg)" : "",
    transition: "transform 150ms ease"
  }
  const classListStyle = {
    maxHeight: classListView ? "" : "56px",
    transition: "max-height 200ms ease"
  }
  return (
    <div className='py-6 px-[5%] bg-white flex items-center justify-between'>
      <div className='relative flex items-center gap-40'>
        <div className='absolute left-0 top-0'>
          <Image src='/assets/imgs/CodeAlgo_Logo.png' alt='logo' className='md:cursor-pointer h-9' width={ 100 } height={ 52 } />
        </div>
        <div></div>
        <div className='flex items-center gap-4'>
          <div className='text-[#616161] text-[24px]'>
            <BiHomeAlt />
          </div>
          <div className='relative h-[52px]'>
            <div
              className='rounded-[28px] w-[260px] border border-[#BDBDBD] divide-y overflow-hidden absolute left-0 top-0 bg-white'
              style={ classListStyle }>
              <div className='py-2 px-3 relative flex items-center justify-between hover:bg-gray-100 cursor-pointer'>
                <div className='flex items-center gap-3'>
                  <span style={ { backgroundColor: currentClass?.color } } className='rounded-full content-[" "] w-[24px] h-[24px]'></span>
                  <span className='font-bold text-[18px]'>{ currentClass.className }</span>
                </div>
                <div className='hover:b rounded-lg p-1' onClick={ () => setClassListView((prev) => !prev) }>
                  <div className='text-[32px] text-[#838383]' style={ dropdownStyle }>
                    <RiArrowDropDownLine />
                  </div>
                </div>
              </div>
              { otherClassDetails?.map((navClass) => (
                <div
                  className='py-2 px-3 relative flex items-center justify-between hover:bg-gray-100 cursor-pointer'
                  key={ navClass.className }
                  onClick={ () => {
                    dispatch(updateCurrentClass({ className: navClass.className, color: navClass.color }))
                  } }>
                  <div className='flex items-center gap-3'>
                    <span style={ { backgroundColor: navClass?.color } } className='rounded-full content-[" "] w-[24px] h-[24px]'></span>
                    <span className='font-bold text-[18px]'>{ navClass.className }</span>
                  </div>
                </div>
              )) }
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-8'>
        <div className='rounded-[30px] px-2 py-[6px] w-[120px] flex items-center justify-between border border-[#BDBDBD]'>
          <div className='overflow-hidden rounded-full flex items-center'>
            <Image src='/assets/imgs/Assets/avatar.png' alt='avatar' className='md:cursor-pointer h-9' width={ 35 } height={ 35 } />
          </div>
          <div className='text-[32px] text-[#838383]'>
            <RiArrowDropDownLine />
          </div>
        </div>
        <div className='text-[24px] text-[#616161] relative bell-shake cursor-pointer'>
          <span className='rounded-full content-[" "] w-[10px] h-[10px] bg-red-600 absolute top-0 right-0'></span>
          <BiBell />
        </div>
      </div>
    </div>
  )
}

export default GeneralNav
