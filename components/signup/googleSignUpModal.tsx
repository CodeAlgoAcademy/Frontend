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
    <div className="absolute -bottom-[10%] right-0 w-[90vw] max-w-[250px] min-h-[200px] bg-white shadow-md rounded-md p-3 scale-up">
      <p className="text-[18px] text-mainPurple font-bold">Register as a: </p>
      <div className="flex flex-col gap-y-2 mt-3">
        {["Parent", "Teacher", "Student"].map((accountType, index: number) => (
          <div key={index} className="flex gap-x-2 items-center">
            <input
              type="radio"
              className="accent-mainPurple sign-up-radio"
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
      <div className="w-full flex flex-col gap-y-2 mt-4 mb-2">
        <button
          className={`${buttonStyle} border border-mainPurple text-mainPurple hover:bg-mainPurple hover:text-white transition`}
          onClick={() => {
            closeModal();
            setAccountType("");
          }}
        >
          Close
        </button>
        <button
          className={`${buttonStyle} bg-mainPurple hover:bg-purple-800 text-white`}
          onClick={() => {
            if (account === "") {
              dispatch(
                openErrorModal({ errorText: ["Kindly select an account type"] })
              );
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
