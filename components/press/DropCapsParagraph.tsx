import React from "react";

const DropCapsParagraph = ({ text }: { text: string }) => {
   return (
      <p className="first-letter:leading-1 my-2 leading-[1.1]  first-letter:float-left first-letter:mr-[7px] first-letter:align-middle first-letter:text-[2.4rem] first-letter:font-bold">
         {text}
      </p>
   );
};

export default DropCapsParagraph;
