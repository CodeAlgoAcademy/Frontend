import React from "react";

interface IProps {
   header: string;
   body?: string;
}

const StudentProfileInfo = ({ header, body }: IProps) => {
   return (
      <article>
         <h4 className="font-bold">{header}:</h4>
         <p>{body}</p>
      </article>
   );
};

export default StudentProfileInfo;
