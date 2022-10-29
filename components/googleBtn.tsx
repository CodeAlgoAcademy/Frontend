import React, { FC } from "react";
import Image from "next/image";
import google from "../public/assets/imgs/google.png";
const GoogleBtn: FC = () => {
  const handleClick = (): void => {
    // handle backend logic
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 w-full border-2 border-gray-300 rounded flex flex-row gap-x-4 p-2 items-center h-[50px] md:justify-start justify-center hover:bg-blue-50"
    >
      <Image src={google} alt="google" height={"30px"} width={"30px"} />
      <p>Connect With Google</p>
    </button>
  );
};

export default GoogleBtn;
