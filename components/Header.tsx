import Image from "next/image";
import {BiHomeAlt} from 'react-icons/bi';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa';
import avatar from '../public/assets/avatar.png'
import { useEffect, useRef, useState } from "react";



export default function Header() {
  const [classTab, setClassTab] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>('Class C');
  const [classColor, setClassColor] = useState<string>('#92C7F7');

  const toggleClassTab = () => {
    setClassTab(!classTab)
  }

  const classOptions  = [
    {
      name: 'Class A',
      color: '#F6B86F',
    },
    {
      name: 'Class B',
      color: '#AADE98',

    },
    {
      name: 'Class C',
      color: '#92C7F7',
    },
    {
      name: 'Class D',
      color: '#FFE977',
    }
  ]

 

  return (
    <div className="bg-white h-24 flex items-center gap-7 select-none">
      <BiHomeAlt className="text-[#616161] text-[2rem] ml-[25rem]"/>

      {/* class dropdown */}
     
      <div className=" flex items-center gap-4">

      {/* selected hidden at first visible after click */}
      {!classTab && (<div onClick={toggleClassTab} className="absolute w-[14rem] flex justify-between items-center border rounded-full border-[#BDBDBD]  px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="h-8  w-8 rounded-full" style={{background: classColor}}></span>
              <h5 className="font-bold">{selectedClass}</h5>
            </div>
            <FaChevronDown  className="text-[#838383]"/>
        </div>)}
        

        {classTab && (
        <div onClick={toggleClassTab} className="border-[#BDBDBD] border rounded-[1.6rem] mt-[10rem] bg-white z-30">
          {classOptions.map((option) => {
          return (<div className="w-[14rem] flex justify-between items-center border-b-2  px-3.5 py-2.5" onClick={() => {setSelectedClass(option.name), setClassColor(option.color)}}>
            <div className="flex items-center justify-between gap-3">
              <span className="h-8 w-8 rounded-full" style={{background: option.color}}></span>
              <h5 className="font-bold">{option.name}</h5>
            </div>
            {option.name == 'Class A' ? <FaChevronUp className=" text-[#838383]" /> : ''}
          </div>)})}
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
