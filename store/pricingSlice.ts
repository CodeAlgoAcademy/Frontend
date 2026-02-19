import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  getActiveSubscription, 
  getBillingHistory, 
  getPricingPlans, 
  initiatePayment, 
  verifyPayment, 
  validateCoupon, 
  attachPaymentMethod,
  cancelSubscription,
  reactivateSubscription
} from "../services/pricingService";
import { 
  CouponValidationResponse, 
  IPlan, 
  ISubscribedPlan, 
  PaidInitiateResponse, 
  PaymentStatus, 
  PricingSlice, 
  Subscription, 
  TrialInitiateResponse 
} from "types/interfaces";

const initialState: PricingSlice = {
  plans: [],
  payments: [],
  handlers: {
    loading: false,
    initiate_payment_loading: false,
    payments_loading: false,
    verify_payment_loading: false,
    active_subscription_loading: false,
    billing_history_loading: false,
    coupon_validation_loading: false,
    reactivate_subscription_loading: false, // ✅ ADDED THIS
  },
  initiated_payment: undefined,
  payment_verification_status: undefined,
  active_subscription: undefined,
  billing_history: [],
  coupon_validation: undefined,
};

const pricingSlice = createSlice({
  name: "pricingSlice",
  initialState,
  reducers: {
    clearCouponValidation: (state) => {
      state.coupon_validation = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPricingPlans.pending, (state) => {
        state.handlers.loading = true;
      })
      .addCase(getPricingPlans.fulfilled, (state, action: PayloadAction<IPlan[]>) => {
        state.handlers.loading = false;
        state.plans = action.payload;
      })
      .addCase(getPricingPlans.rejected, (state) => {
        state.handlers.loading = false;
      })
      .addCase(initiatePayment.pending, (state) => {
        state.handlers.initiate_payment_loading = true;
        state.initiated_payment = undefined;
      })
      .addCase(initiatePayment.fulfilled, (state, action: PayloadAction<TrialInitiateResponse>) => {
        state.initiated_payment = action.payload;
        state.handlers.initiate_payment_loading = false;
      })
      .addCase(initiatePayment.rejected, (state) => {
        state.handlers.initiate_payment_loading = false;
        state.initiated_payment = undefined;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.handlers.verify_payment_loading = true;
        state.payment_verification_status = "pending";
      })
      .addCase(verifyPayment.fulfilled, (state, action: PayloadAction<PaymentStatus>) => {
        state.handlers.verify_payment_loading = false;
        state.payment_verification_status = action.payload;
      })
      .addCase(verifyPayment.rejected, (state) => {
        state.handlers.verify_payment_loading = false;
        state.payment_verification_status = undefined;
      })
      .addCase(getActiveSubscription.pending, (state) => {
        state.handlers.active_subscription_loading = true;
        state.active_subscription = undefined;
      })
      .addCase(getActiveSubscription.fulfilled, (state, action: PayloadAction<ISubscribedPlan>) => {
        state.handlers.active_subscription_loading = false;
        state.active_subscription = action.payload;
      })
      .addCase(getActiveSubscription.rejected, (state) => {
        state.handlers.active_subscription_loading = false;
        state.active_subscription = undefined;
      })
      .addCase(getBillingHistory.pending, (state) => {
        state.handlers.billing_history_loading = true;
      })
      .addCase(getBillingHistory.fulfilled, (state, action: PayloadAction<Subscription[]>) => {
        state.handlers.billing_history_loading = false;
        state.billing_history = action.payload;
      })
      .addCase(getBillingHistory.rejected, (state) => {
        state.handlers.billing_history_loading = false;
      })
      .addCase(validateCoupon.pending, (state) => {
        state.handlers.coupon_validation_loading = true;
      })
      .addCase(validateCoupon.fulfilled, (state, action: PayloadAction<CouponValidationResponse>) => {
        state.handlers.coupon_validation_loading = false;
        state.coupon_validation = action.payload;
      })
      .addCase(validateCoupon.rejected, (state) => {
        state.handlers.coupon_validation_loading = false;
        state.coupon_validation = undefined;
      })
      .addCase(attachPaymentMethod.pending, (state) => {
        state.handlers.initiate_payment_loading = true;
      })
      .addCase(attachPaymentMethod.fulfilled, (state, action: PayloadAction<any>) => {
        state.handlers.initiate_payment_loading = false;
      })
      .addCase(attachPaymentMethod.rejected, (state) => {
        state.handlers.initiate_payment_loading = false;
      })
      .addCase(cancelSubscription.pending, (state) => {
        state.handlers.initiate_payment_loading = true;
      })
      .addCase(cancelSubscription.fulfilled, (state) => {
        state.handlers.initiate_payment_loading = false;
      })
      .addCase(cancelSubscription.rejected, (state) => {
        state.handlers.initiate_payment_loading = false;
      })
      // ========== REACTIVATE SUBSCRIPTION ==========
      .addCase(reactivateSubscription.pending, (state) => {
        state.handlers.reactivate_subscription_loading = true;
      })
      .addCase(reactivateSubscription.fulfilled, (state, action) => {
        state.handlers.reactivate_subscription_loading = false;
        // Update the subscription in billing_history
        if (state.billing_history) {
          const index = state.billing_history.findIndex(
            (sub) => sub.id === action.meta.arg
          );
          if (index !== -1) {
            state.billing_history[index] = {
              ...state.billing_history[index],
              cancel_at_period_end: false,
              canceled_at: "",
            };
          }
        }
      })
      .addCase(reactivateSubscription.rejected, (state, action) => {
        state.handlers.reactivate_subscription_loading = false;
        console.error("Reactivate subscription failed:", action.payload);
      });
  },
});

const pricingReducer = pricingSlice.reducer;
export const { clearCouponValidation } = pricingSlice.actions;
export default pricingReducer;