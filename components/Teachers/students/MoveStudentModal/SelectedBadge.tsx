import React from "react";

const SelectedBadge = ({ count }: { count: number }) => (
   <p className="mt-3 text-[14px] font-semibold text-blue-600">
      {count} student{count === 1 ? "" : "s"} selected
   </p>
);

export default SelectedBadge;