import React from "react";

const BillingTableHeader = () => {
   return (
      <div className="flex min-w-fit bg-[#C5C5C5] px-5 py-2">
         <p className="min-w-[150px] flex-1">Invoice</p>
         <p className="min-w-[150px] flex-1">Plan Interval</p>
         <p className="min-w-[150px] flex-1">Activation Date</p>
         <p className="min-w-[150px] flex-1">Expiration Date</p>
         <p className="min-w-[150px] flex-1">Status</p>
         <p className="min-w-[100px]">Action</p>
      </div>
   );
};

export default BillingTableHeader;