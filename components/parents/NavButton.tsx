import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import React,{useEffect,useState} from 'react';

interface Props {
   image?: string;
   title: string;
   notification?: number;
   name: string;
}
const NavButton = ({image,title,notification,name}: Props) => {
   const [active,setActive] = useState(false);
   const router = useRouter();
   console.log(router.pathname);
   useEffect(() => {
      setActive(() => `/parents${name ? "/" + name : ""}` === router.pathname);
   },[router.pathname,name]);

   return (
      <Link href={`/parents/${name}`}>
         <button className='py-[14px] px-7 flex items-center gap-5 w-full hover:bg-slate-50 rounded-3xl' style={{backgroundColor: active ? "#2073fa" : ""}}>
            <Image src={`/assets/${image}`} alt={title} width={20} height={20} className={active ? "" : "blue-svg"} />
            <p className='font-medium select-none' style={{color: active ? "#fff" : ""}}>{title}</p>
            {notification &&
               <span className='w-5 h-5 rounded-full text-sm text-white bg-[#FB4DAB]'>{`${notification}`}</span>
            }
         </button>
      </Link>
   );
};

export default NavButton;