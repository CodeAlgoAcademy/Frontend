import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { openErrorModal } from "store/fetchSlice";

const GoogleSignUpModal = ({
   handleClick,
   closeModal,
   accountType: account,
   setAccountType,
}: {
   handleClick: Function;
   closeModal: () => void;
   accountType: string;
   setAccountType: Dispatch<SetStateAction<string>>;
}) => {
   const dispatch = useDispatch();
   return (
      <div className="scale-up absolute -bottom-[10%] right-0 min-h-[200px] w-[90vw] max-w-[250px] rounded-md bg-white p-3 shadow-md">
         <p className="text-mainColor text-[18px] font-bold">Register as a: </p>
         <div className="mt-3 flex flex-col gap-y-2">
            {["Parent", "Teacher", "Student"].map((accountType, index: number) => (
               <div key={index} className="flex items-center gap-x-2">
                  <input
                     type="radio"
                     className="accent-mainColor sign-up-radio"
                     name="account type"
                     id={accountType}
                     checked={accountType === account}
                     onChange={() => {
                        setAccountType(accountType);
                     }}
                  />
                  <label htmlFor={accountType}>{accountType}</label>
               </div>
            ))}
         </div>
         <div className="mt-4 mb-2 flex w-full flex-col gap-y-2">
            <button
               className={`${buttonStyle} border-mainColor text-mainColor hover:bg-mainColor border transition hover:text-white`}
               onClick={() => {
                  closeModal();
                  setAccountType("");
               }}
            >
               Close
            </button>
            <button
               className={`${buttonStyle} bg-mainColor text-white hover:bg-[royalblue]`}
               onClick={() => {
                  if (account === "") {
                     dispatch(openErrorModal({ errorText: ["Kindly select an account type"] }));
                  } else {
                     handleClick();
                     closeModal();
                  }
               }}
            >
               Register
            </button>
         </div>
      </div>
   );
};

const buttonStyle = "w-full text-center p-2 font-bold rounded-md text-[15px]";

export default GoogleSignUpModal;
