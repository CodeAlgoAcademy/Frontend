import React from "react";

const DropCapsParagraph = ({ text }: { text: string }) => {
   return (
      <p className="my-2 leading-[1.2] first-letter:float-left  first-letter:mr-[2px] first-letter:align-top first-letter:text-[2.4rem] first-letter:font-bold first-letter:leading-[0.3]">
         {text}
      </p>
   );
};

export default DropCapsParagraph;
