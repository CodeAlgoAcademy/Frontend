import React from "react";

function NoItem({ text }: { text: string }) {
   return (
      <div className="flex min-h-[60vh] items-center justify-center">
         <h3 className="text-[2rem] text-[#2073fa]">{text}</h3>
      </div>
   );
}

export default NoItem;
