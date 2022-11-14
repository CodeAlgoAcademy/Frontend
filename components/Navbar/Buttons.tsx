import Link from "next/link";
import React from "react";

const styles = {
  lgBtn: "uppercase p-3 text-white hover:bg-opacity-50 rounded",
};

const Buttons = () => {
  return (
    <>
      <div className="hidden md:flex space-x-2">
        <Link href="/login">
          <button className={`bg-orange-500 ${styles.lgBtn}`}>Login</button>
        </Link>
        <Link href="signup">
          <button className={`bg-amber-500 ${styles.lgBtn}`}>Signup</button>
        </Link>
      </div>

      {/* mobile devices */}
      <div className="grid gap-3 md:hidden">
        <Link href="/login">
          <button className={`bg-orange-500 ${styles.lgBtn}`}>Login</button>
        </Link>
        <Link href="/signup">
          <button className={`bg-amber-500 ${styles.lgBtn}`}>Signup</button>
        </Link>
      </div>
    </>
  );
};

export default Buttons;
