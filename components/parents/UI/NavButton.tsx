import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {
   image: string | JSX.Element;
   title: string;
   notification?: number | string;
   url: string;
   onClick?(): void;
   className?: string;
}
const NavButton = ({ image, title, notification, url, onClick, className }: Props) => {
   const [active, setActive] = useState(false);
   const router = useRouter();

   useEffect(() => {
      setActive(() => url === router.pathname);
   }, [router?.pathname, url]);

   return (
      <a href={`${url}`} target={url.includes("https") ? "_blank" : "_self"} className="z-[5]">
         <button
            className={`relative flex w-full min-w-[50px] items-center gap-5 rounded-md  py-[14px] px-7 text-[26px] text-white hover:bg-slate-50 md:rounded-3xl  ${className}`}
            style={{
               backgroundColor: active ? "#2073fa" : "",
            }}
            onClick={onClick}
         >
            {image && typeof image === "string" ? (
               <Image src={`/assets/${image}`} alt={title} width={20} height={20} className={active ? "" : "blue-svg"} />
            ) : (
               <span className={`${active ? "!text-white" : "blue-svg" + ""} text-[1rem] text-white`}>{image}</span>
            )}
            <p className="select-none text-[15px] font-medium capitalize" style={{ color: active ? "#fff" : "#2073fa" }}>
               {title}
            </p>
            {notification && <span className="h-5 w-5 rounded-full bg-[#FB4DAB] text-sm text-white">{`${notification}`}</span>}
         </button>
      </a>
   );
};

export default NavButton;
