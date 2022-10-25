import React, { FC } from "react";

const GoogleBtn: FC = () => {
  const handleClick = (): void => {
    // handle backend logic
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 w-full border-2 border-gray-300 rounded flex flex-row gap-x-4 p-2 items-center h-[50px] md:justify-start justify-center hover:bg-blue-50"
    >
      <img src="/images/google.png" alt="google" className="h-full" />
      <p>Connect With Google</p>
    </button>
  );
};

export default GoogleBtn;
