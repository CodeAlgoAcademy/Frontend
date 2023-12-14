import React from "react";

interface Props {
   link: string;
   text: string;
}

export default function Link({ link, text }: Props) {
   return (
      <a href={link} className="font-bold text-orange-400">
         {text}
      </a>
   );
}