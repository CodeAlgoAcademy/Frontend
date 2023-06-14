import React from "react";

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

export default Button;
