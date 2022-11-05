import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC } from "react";
import clever from "../public/assets/imgs/clever.png";
const CleverBtn: FC = () => {
  const router = useRouter();

  const handleClick = (): void => {
    // handle backend logic
    router.push("/addClass");
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 w-full border-2 border-gray-300 rounded flex flex-row gap-x-4 p-2 items-center h-[50px] md:justify-start justify-center hover:bg-blue-50"
    >
      <Image src={clever} alt="clever" width={"30px"} height={"30px"} />
      <p>Connect With Clever</p>
    </button>
  );
};

export default CleverBtn;
