import React, { FC } from "react";

interface Props {
   amount: number;
}

const BillingSummary: FC<Props> = ({ amount }) => {
   return (
      <>
         {" "}
         <div className="w-full rounded-md border border-[#C5C5C5]">
            <h4 className="border-b border-[#C5C5C5] px-4 pb-2 pt-3">Billing Summary</h4>
            <div className="pt-4 pb-8 text-[.9rem]">
               <div className="flex justify-between px-4">
                  <p>Basic price</p>
                  <p>${amount}</p>
               </div>
               <div className="mt-4 flex justify-between px-4 ">
                  <p>VAT</p>
                  <p>$0.00</p>
               </div>
               <div className="mt-4 flex justify-between px-4 ">
                  <p>Total billing price</p>
                  <p>${amount}</p>
               </div>
            </div>
         </div>
      </>
   );
};

export default BillingSummary;
