import Link from "next/link";
import React from "react";

const styles = {
   lgBtn: "uppercase p-3 text-white hover:bg-opacity-50 rounded",
};

const Buttons = () => {
   return (
      <>
         <div className="hidden space-x-2 md:flex">
            <Link href="/login">
               <button className={`bg-orange-500 ${styles.lgBtn}`}>Log in</button>
            </Link>
            <Link href="/signup">
               <button className={`bg-amber-500 ${styles.lgBtn}`}>Register</button>
            </Link>
         </div>

         {/* mobile devices */}
         <div className="grid gap-3 md:hidden">
            <Link href="/login">
               <button className={`bg-orange-500 ${styles.lgBtn}`}>Log in</button>
            </Link>
            <Link href="/signup">
               <button className={`bg-amber-500 ${styles.lgBtn}`}>Register</button>
            </Link>
         </div>
      </>
   );
};

export default Buttons;
