import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { closePreloader, openPreloader } from "store/fetchSlice";
import { IBilling, InitiatePaymentRes, InstitutionInquiryDto, IPlan, ISubscribedPlan, PaymentsResponse, PaymentStatus } from "types/interfaces";
import { errorResolver } from "utils/errorResolver";
import { getAccessToken } from "utils/getTokens";

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

export const getPricingPlans: any = createAsyncThunk("pricingService/getPlans", async (_, thunkApi) => {
   try {
      const response = await http.get<IPlan[]>("/payment/parent/plans");

      return response.data;
   } catch (error) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});
export const getAllPayment: any = createAsyncThunk("pricingService/getPlans", async (_, thunkApi) => {
   try {
      const response = await http.get<PaymentsResponse[]>("/payment/");

      return response.data;
   } catch (error) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const initiatePayment: any = createAsyncThunk(
   "initiatePayment",
   async ({ plan_id, children }: { plan_id: number; children: number[] }, thunkApi) => {
      try {
         const response = await http.post<InitiatePaymentRes>(
            "/payment/parent/initiate",
            { plan_id, children },
            {
               headers: {
                  Authorization: `Bearer ${getAccessToken()}`,
               },
            }
         );
         return response.data;
      } catch (error) {
         const errorMessage = errorResolver(error);
         return thunkApi.rejectWithValue(errorMessage);
      }
   }
);


export const verifyPayment: any = createAsyncThunk("verifyPayment", async (paymentIntent: string, thunkApi) => {
   try {
      const response = await http.post<{ status: PaymentStatus }>(
         "/payment/parent/verify",
         { intent_id: paymentIntent },
         {
            headers: {
               Authorization: `Bearer ${getAccessToken()}`,
            },
         }
      );

      return response.data.status;
   } catch (error) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const getActiveSubscription: any = createAsyncThunk("activeSubscription", async (_, thunkApi) => {
   try {
      const response = await http.get<ISubscribedPlan[]>("/payment/parent/active", {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      });

      return response?.data?.[0];
   } catch (error) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});

export const getBillingHistory: any = createAsyncThunk("getBillingHistory", async (_, thunkApi) => {
   try {
      const response = await http.get<IBilling[]>(`/payment/parent/history`, {
         headers: {
            Authorization: `Bearer ${getAccessToken()}`,
         },
      });

      return response?.data;
   } catch (error) {
      const errorMessage = errorResolver(error);
      return thunkApi.rejectWithValue(errorMessage);
   }
});
