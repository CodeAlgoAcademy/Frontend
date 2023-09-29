import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {
   image: string | JSX.Element;
   title: string;
   notification?: number | string;
   url: string;
   isIcon?: boolean;
   onClick?(): void;
}
const NavButton = ({ image, title, notification, url, isIcon, onClick }: Props) => {
   const [active, setActive] = useState(false);
   const [detailsDisplay, setDetailsDisplay] = useState(false);
   const router = useRouter();

   useEffect(() => {
      setActive(() => url === router.pathname);
   }, [router?.pathname, url]);

   return (
      <Link href={`${url}`}>
         <button
            className="relative flex w-full min-w-[50px] items-center justify-center gap-5 rounded-3xl py-[14px] px-7 text-[26px] text-white hover:bg-slate-50"
            style={{
               backgroundColor: active ? "#2073fa" : "",
               padding: !isIcon ? "14px 28px" : "12px",
               borderRadius: !isIcon ? "24px" : "6px",
               justifyContent: !isIcon ? "left" : "center",
            }}
            onMouseEnter={() => setDetailsDisplay(() => true)}
            onMouseLeave={() => setDetailsDisplay(() => false)}
            onClick={onClick}
         >
            {image && typeof image === "string" ? (
               <Image src={`/assets/${image}`} alt={title} width={20} height={20} className={active ? "" : "blue-svg"} />
            ) : (
               <span className={`${active ? "!text-white" : "blue-svg" + ""} text-[1rem] text-white`}>{image}</span>
            )}
            {!isIcon && (
               <>
                  <p className="select-none text-[15px] font-medium capitalize" style={{ color: active ? "#fff" : "#2073fa" }}>
                     {title}
                  </p>
                  {notification && <span className="h-5 w-5 rounded-full bg-[#FB4DAB] text-sm text-white">{`${notification}`}</span>}
               </>
            )}
            {isIcon && detailsDisplay && (
               <div className=" detail-card absolute top-0 right-[120%] float-right min-w-[80px] rounded-xl border border-slate-200 bg-white py-2 px-4 text-xs font-medium">
                  {title}
               </div>
            )}
         </button>
      </Link>
   );
};

export default NavButton;
