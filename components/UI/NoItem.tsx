import React from "react";

function NoItem({ text }: { text: string }) {
   return (
      <div className="flex min-h-[60vh] items-center justify-center">
         <h3 className="text-mainColor text-[2rem]">{text}</h3>
      </div>
   );
}

export default NoItem;
