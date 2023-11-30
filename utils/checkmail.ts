import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import http from "axios.config";
import { useDispatch, useSelector } from "react-redux";
import { closePreloader, openErrorModal, openPreloader } from "store/fetchSlice";
import { RootState } from "store/store";

export const checkEmail = async (email: string, next: () => void, dispatch: Dispatch<AnyAction>) => {
   dispatch(openPreloader({ loadingText: "Checking Email availability" }));
   try {
      const res = await http.post("/auth/check-email", { email });

      if (res?.data?.details?.toLowerCase() === "email not found") {
         next();
      } else if (res?.data?.details?.toLowerCase() === "email found") {
         dispatch(openErrorModal({ errorText: ["Email already exist. Try again!"] }));
      }
   } catch (error) {}
   dispatch(closePreloader());
};
