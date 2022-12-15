import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeErrorModal } from "store/fetchSlice";
import { RootState } from "store/store";

const ErrorModal = () => {
  const { errorModalOpen, errors } = useSelector(
    (state: RootState) => state.fetch
  );
  const dispatch = useDispatch();
  if (!errorModalOpen) {
    return <></>;
  }

  return (
    <div className="fixed top-0 left-0 z-[70] w-[100vw] min-h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
      {/* modal */}
      <div className="w-[90vw] max-w-[450px] bg-white shadow-md rounded-md mx-auto overflow-hidden">
        <header className="p-4 w-full bg-red-600 text-white">
          <h1 className="text-[22px] font-bold flex flex-row gap-x-4 items-center">
            <span>
              <FaExclamationTriangle />
            </span>
            Error
          </h1>
        </header>
        <div className="bg-white p-4">
          {/* display errors */}
          <ul className="flex flex-col gap-y-2 mb-6">
            {errors?.map((error: string, index: number) => (
              <li
                className="text-[16px] font-semibold flex flex-row gap-x-4 items-center"
                key={index}
              >
                <i className=" text-red-500">
                  <BiChevronRight />
                </i>
                {error}
              </li>
            ))}
          </ul>
          <footer className="border-t pt-4 text-right">
            <button
              className="min-w-[150px] py-3 rounded-full bg-mainPurple text-white"
              onClick={() => {
                dispatch(closeErrorModal());
              }}
            >
              Close
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
