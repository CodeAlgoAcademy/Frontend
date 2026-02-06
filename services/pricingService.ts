import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "axios.config";
import { closePreloader, openPreloader } from "store/fetchSlice";
import { CouponValidationResponse, IBilling, InitiatePaymentParams, InitiatePaymentRes, InstitutionInquiryDto, IPlan, ISubscribedPlan, PaidInitiateResponse, PaymentsResponse, PaymentStatus, Subscription, TrialInitiateResponse } from "types/interfaces";
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
      const response = await http.get<IPlan[]>("/payment/product/");

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

export const initiatePayment = createAsyncThunk(
  "initiatePayment",
  async (
    {
      price_id,
      children,
      is_trial,
      promotion_code,
    }: {
      price_id: number;
      children: number[];
      is_trial: boolean;
      promotion_code?: string;
    },
    thunkApi
  ) => {
    try {
      const response = await http.post<TrialInitiateResponse>(
        "/payment/subscription/initiate",
        {
          price_id,
          children,
          is_trial,
          promotion_code,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(errorResolver(error));
    }
  }
);


export const attachPaymentMethod = createAsyncThunk(
  "attachPaymentMethod",
  async (
    {
      subscription_id,
      payment_method_id,
      is_default = false,
    }: {
      subscription_id: number;
      payment_method_id: string;
      is_default?: boolean;
    },
    thunkApi
  ) => {
    try {
      const response = await http.post<PaidInitiateResponse>(
        "/payment/subscription/attach-payment",
        {
          subscription_id,
          payment_method_id,
          is_default,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(errorResolver(error));
    }
  }
);


export const createSetupIntent = createAsyncThunk(
"createSetupIntent",
async (subscription_id: number, thunkApi) => {
try {
const response = await http.post<{ client_secret: string }>(
"/payment/setup-intent",
{ subscription_id },
{
headers: {
Authorization: `Bearer ${getAccessToken()}`,
},
}
);
  return response.data;
} catch (error) {
  return thunkApi.rejectWithValue(errorResolver(error));
}
}
);

export const validateCoupon = createAsyncThunk(
  "pricingService/validateCoupon",
  async (
    {
      code,
      price_id,
      children,
    }: { code: string; price_id: number; children?: number[] },
    thunkApi
  ) => {
    try {
      const response = await http.post<CouponValidationResponse>(
        "/payment/coupon/validate/",
        {
          code,
          price_id,
          children,
        },
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
         "/payment/subscription/verify",
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
      const response = await http.get<Subscription[]>(`/payment/subscription/history`, {
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
