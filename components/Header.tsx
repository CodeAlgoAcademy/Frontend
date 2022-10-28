import Image from "next/image";
import logo from '../images/logo.png';
import {BiHomeAlt} from 'react-icons/bi';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import avatar from '../images/avatar.png'
import { useEffect, useRef, useState } from "react";



export default function Header() {
  const [classTab, setClassTab] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>('Class C')

  const toggleClassTab = () => {
    setClassTab(!classTab)
  }

 

  return (
    <div className="bg-white h-24 flex items-center gap-7 select-none">
      <BiHomeAlt className="text-[#616161] text-[2rem] ml-[25rem]"/>

      {/* class dropdown */}
     
      <div className=" flex items-center gap-4">

      {/* selected hidden at first visible after click */}
      {!classTab && (<div onClick={toggleClassTab} className="absolute w-[14rem] flex justify-between items-center border rounded-full border-[#BDBDBD]  px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="h-8 bg-[#92C7F7] w-8 rounded-full"></span>
              <h5 className="font-bold">{selectedClass}</h5>
            </div>
            <FaChevronDown  className="text-[#838383]"/>
        </div>)}

        {classTab && (<div onClick={toggleClassTab} className="border-[#BDBDBD] border rounded-[1.6rem] mt-[10rem] bg-white z-30">
          <div className="w-[14rem] flex justify-between items-center border-b-2  px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="h-8 bg-[#92C7F7] w-8 rounded-full"></span>
              <h5 className="font-bold">Class C</h5>
            </div>
            <FaChevronUp className=" text-[#838383]" />
          </div>
          <div className="w-[14rem] flex justify-between items-center border-b-2  px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="h-8 bg-[#92C7F7] w-8 rounded-full"></span>
              <h5 className="font-bold">Class A</h5>
            </div>
            
          </div>
          <div className="w-[14rem] flex justify-between items-center border-b-2  px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="h-8 bg-[#92C7F7] w-8 rounded-full"></span>
              <h5 className="font-bold">Class B</h5>
            </div>
            
          </div>
          <div className="w-[14rem] flex justify-between items-center px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="h-8 bg-[#92C7F7] w-8 rounded-full"></span>
              <h5 className="font-bold">Class D</h5>
            </div>
         
          </div>
       
      </div>)}
      </div>
      {/* avatar info */}
      <div className="flex items-center border rounded-full px-1 py-1 h-fit justify-between w-[6.5rem] ml-auto mr-[4rem]">
        <Image src={avatar}/>
        <div className="pr-2">
        <FaChevronDown className=" text-[#838383]"/>
        </div>
      </div>
    </div>
  );
}
