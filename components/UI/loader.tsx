import React, { FC } from "react";
import { BiLoaderAlt } from "react-icons/bi";

interface Props {
   size?: number;
   color?: string;
}

const Loader: FC<Props> = ({ size = 20, color }) => {
   return <BiLoaderAlt className="animate-spin text-mainColor" style={{ color }} size={size} />;
};

export default Loader;
