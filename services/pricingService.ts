import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { closePreloader, openPreloader } from "store/fetchSlice";
import { InstitutionInquiryDto } from "types/interfaces";
import { errorResolver } from "utils/errorResolver";

export const submitInstituionInquiry: any = createAsyncThunk("pricingService/institutionInquiry", async (data: InstitutionInquiryDto, thunkApi) => {
   const dispatch = thunkApi.dispatch;

   dispatch(openPreloader({ loadingText: "Submitting Inquiry" }));

   try {
      await http.post("/contact/institution/", data);
      dispatch(closePreloader());
   } catch (error) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});
