import Image from "next/image";
import React from "react";

const AsSeenIs = () => {
   return (
      <div className="mx-auto mt-16 max-w-[1200px] px-6 pb-12">
         <h1 className="text-center font-tiltWarp text-[2.1rem] max-md:text-[1.5rem]">AS SEEN IN</h1>

         <div className="mx-auto mt-12 max-w-[1200px]">
            <Image src={"/assets/landing/as-seen-in.png"} width={2000} height={600} />
         </div>
      </div>
   );
};

export default AsSeenIs;
