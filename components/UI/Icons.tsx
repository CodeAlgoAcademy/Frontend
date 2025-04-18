import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const SpacingIcon = ({ count = 1 }: { count: number }) => {
   return (
      <span className="flex items-center gap-1 space-x-0 text-[50%]">
         <IoIosArrowBack />
         {new Array(count).fill(null).map((_, index) => {
            return <span key={index}>-</span>;
         })}
         <IoIosArrowForward />
      </span>
   );
};
