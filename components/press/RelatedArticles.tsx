import React from "react";

const RelatedArticles = ({ link, title }: { link: string; title: string }) => {
   return (
      <a
         className="] mt-4 inline-block rounded-md bg-[#f3f3f3] px-2 py-2 font-bold italic text-orange-400 underline"
         href={link}
         target="_blank"
         rel="noopener noreferrer"
      >
         RELATED: {title}
      </a>
   );
};

export default RelatedArticles;
