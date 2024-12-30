import React, { ReactElement } from "react";
import styles from "./ImageContainer.module.css";

const ImagesContainer = ({
   title,
   subtitle,
   link,
   image,
   imageDetail,
   imageHeight,
   className,
}: {
   title?: string;
   subtitle?: string;
   link?: string;
   image: string;
   imageDetail: string | ReactElement;
   imageHeight?: number;
   className?: string;
}) => {
   return (
      <article className="mt-2 py-2">
         {title && (
            <header className="mt-5 mb-3 gap-1 border-t-2 pt-4">
               <h2 className="mb-1 inline-block text-[1.4rem] font-bold text-mainPink">
                  {link ? (
                     <a href={link} target="_blank" className="underline" rel="noopener noreferrer">
                        {title}
                     </a>
                  ) : (
                     title
                  )}
               </h2>
               {subtitle && <h3 className="inline-block text-[1.1rem] font-bold text-[#222]">{subtitle}</h3>}
            </header>
         )}
         <div className="w-full rounded-md bg-[#f2f2f2] p-2 shadow-md">
            <img
               src={image}
               alt={typeof imageDetail}
               className={`object-t  w-full rounded-md object-contain ${styles.press_image} ${className}`}
               style={{
                  height: imageHeight ? imageHeight : 500,
               }}
            />
            <p className="mt-4  mb-2 text-center text-[16px]">{imageDetail}</p>
         </div>
      </article>
   );
};

export default ImagesContainer;
