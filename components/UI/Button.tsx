import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { cn } from "utils";

const Button = ({ text, color }: { text: string; color: string }) => {
   return (
      <button
         type="button"
         style={{ backgroundColor: color }}
         className="h-[44px] min-w-[130px] rounded-3xl px-8 font-bold text-white hover:opacity-80"
      >
         {text}
      </button>
   );
};

export const AuthButton = (props: { text: string }) => {
   return (
      <button className="mt-4  block h-[2.5rem] w-full rounded-xl bg-orange-400 text-center font-bold text-white" type="submit">
         {props.text}
      </button>
   );
};

type Props = {
   children: ReactNode;
   size?: "small" | "medium" | "large" | "extra-small";
   variant?: "filled" | "outline" | "black" | "destructive" | "success";
   className?: string;
   rounded?: "full" | "sm" | "md" | "lg" | "xl" | "2xl" | "none";
   icon?: JSX.Element;
   iconPosition?: "right" | "left";
   disabled?: boolean;
   fullWidth?: boolean;
   loading?: boolean;
   onClick?: Function;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const CustomButton: FC<Props> = (props) => {
   const {
      onClick,
      icon,
      className: extraClass = "",
      variant = "outline",
      children,
      size = "small",
      disabled = false,
      loading = false,
      iconPosition = "right",
      rounded = "md",
      fullWidth = false,
      role,
      ...rest
   } = props;
   let mainClass = `rounded-${rounded} font-normal text-center duration-300 ${
      fullWidth ? "w-full flex items-center justify-center gap-3" : "w-auto flex items-center gap-2"
   } disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-transparent disabled:text-black disabled:hover:bg-transparent disabled:hover:text-black `;

   switch (variant) {
      case "filled":
         mainClass += "bg-mainPink text-mainBlack hover:bg-mainPink/80 text-center ";
         break;
      case "outline":
         mainClass += "bg-transparent border border-mainPink hover:bg-mainPink hover:text-mainBlack text-mainPink disabled:border-zinc-500/50 ";
         break;
      case "destructive":
         mainClass +=
            "bg-transparent border border-red-500/50 hover:border-red-500 hover:bg-red-500 disabled:hover:bg-transparent hover:text-black disabled:hover:text-red-500 text-red-500 disabled:border-red-500/50 ";
         break;
      case "success":
         mainClass +=
            "bg-transparent border border-success/50 hover:border-success hover:bg-success disabled:hover:bg-transparent hover:text-black disabled:hover:text-success text-success disabled:border-success/50 ";
         break;
      case "black":
         mainClass += "hover:bg-mainPink/80 bg-mainPink text-mainPink ";
         break;
      default:
         break;
   }

   switch (size) {
      case "extra-small":
         mainClass += "px-4 py-[6px] text-xs ";
         break;
      case "small":
         mainClass += "px-6 py-2 text-[14px] ";
         break;
      case "medium":
         mainClass += "px-6 py-3 text-sm";
         break;
      case "large":
         mainClass += "px-8 py-[14px] ";
         break;
      default:
         break;
   }

   return (
      <button onClick={onClick} className={cn(mainClass, extraClass)} disabled={disabled || loading} role={role} {...rest}>
         {iconPosition === "left" && (
            <>
               {loading ? (
                  <div className="flex-shrink-0">
                     <BiLoaderAlt size={12} className="animate-spin" />
                  </div>
               ) : (
                  icon
               )}
            </>
         )}

         <span className="flex-shrink-0">{!loading ? children : "Loading..."}</span>

         {iconPosition === "right" && (
            <>
               {loading ? (
                  <div className="flex-shrink-0">
                     <BiLoaderAlt size={12} className="animate-spin" />
                  </div>
               ) : (
                  icon
               )}
            </>
         )}
      </button>
   );
};

export default Button;
