import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { openErrorModal } from "store/fetchSlice";
import { useTranslation } from "react-i18next";

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
   const { t } = useTranslation("auth");
   const { t: tCommon } = useTranslation("common");
   return (
      <div className="scale-up absolute -bottom-[10%] right-0 min-h-[200px] w-[90vw] max-w-[250px] rounded-md bg-white p-3 shadow-md">
         <p className="text-mainColor text-[18px] font-bold">{t("registerAs")}</p>
         <div className="mt-3 flex flex-col gap-y-2">
            {[{ value: "Parent", label: tCommon("parent") }, { value: "Teacher", label: tCommon("teacher") }, { value: "Student", label: tCommon("student") }].map((accountType, index: number) => (
               <div key={index} className="flex items-center gap-x-2">
                  <input
                     type="radio"
                     className="accent-mainColor sign-up-radio"
                     name="account type"
                     id={accountType.value}
                     checked={accountType.value === account}
                     onChange={() => {
                        setAccountType(accountType.value);
                     }}
                  />
                  <label htmlFor={accountType.value}>{accountType.label}</label>
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
                {tCommon("close")}
            </button>
            <button
               className={`${buttonStyle} bg-mainColor text-white hover:bg-[royalblue]`}
               onClick={() => {
                  if (account === "") {
                      dispatch(openErrorModal({ errorText: [t("selectAccountTypeError")] }));
                  } else {
                     handleClick();
                     closeModal();
                  }
               }}
            >
                {tCommon("register")}
            </button>
         </div>
      </div>
   );
};

const buttonStyle = "w-full text-center p-2 font-bold rounded-md text-[15px]";

export default GoogleSignUpModal;
