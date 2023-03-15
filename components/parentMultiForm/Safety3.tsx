import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChild } from "store/parentChildSlice";
import { RootState } from "store/store";

export default function Safety3() {
   const dispatch = useDispatch();
   const { friend } = useSelector((state: RootState) => state.parentChild);
   return (
      <div key={8}>
         <h1 className="text-[30px] font-bold">Who can Connor play with?</h1>
         <p className="text-[14px] font-[400]">
            CodeAlgo allows parents to limit students multiplayer interactions. Please enter the email or username of your student’s friends below. A
            request will be sent to the linked parent account. They can then accept or decline the request.
         </p>
         <label className="mt-6 block text-xl font-semibold">Friend email or username</label>
         <input
            className="mt-3 block h-[2.5rem] w-full rounded-xl px-4 py-2 focus:outline-0"
            type="text"
            required
            value={friend}
            onChange={(e) => {
               dispatch(updateChild({ key: "friend", value: e.target.value }));
            }}
         />
         <p className="mt-4 text-center text-[14px] font-semibold">You can update or add to this list at any time in your settings</p>
      </div>
   );
}
