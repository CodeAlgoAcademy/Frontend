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
  reactivateSubscription,
  changePlan,
  updateSubscriptionChild,
} from "../services/pricingService";
import {
  CouponValidationResponse,
  IPlan,
  ISubscribedPlan,
  PaidInitiateResponse,
  PaymentStatus,
  PricingSlice,
  Subscription,
  TrialInitiateResponse,
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
    reactivate_subscription_loading: false,
    change_plan_loading: false,
    update_child_loading: false,
  },
  initiated_payment: undefined,
  payment_verification_status: undefined,
  active_subscription: undefined,
  billing_history: [],
  coupon_validation: undefined,
  current_subscription: undefined,
};

const pricingSlice = createSlice({
  name: "pricingSlice",
  initialState,
  reducers: {
    clearCouponValidation: (state) => {
      state.coupon_validation = undefined;
    },
    clearCurrentSubscription: (state) => {
      state.current_subscription = undefined;
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

      .addCase(getActiveSubscription.pending, (state) => {
        state.handlers.active_subscription_loading = true;
      })
      .addCase(getActiveSubscription.fulfilled, (state, action: PayloadAction<Subscription | null>) => {
      state.handlers.active_subscription_loading = false;
      state.current_subscription = action.payload ?? undefined;
      })
      .addCase(getActiveSubscription.rejected, (state) => {
        state.handlers.active_subscription_loading = false;
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

      .addCase(changePlan.pending, (state) => {
        state.handlers.change_plan_loading = true;
      })
      .addCase(changePlan.fulfilled, (state) => {
        state.handlers.change_plan_loading = false;
      })
      .addCase(changePlan.rejected, (state) => {
        state.handlers.change_plan_loading = false;
      })

      .addCase(updateSubscriptionChild.pending, (state) => {
        state.handlers.update_child_loading = true;
      })
      .addCase(updateSubscriptionChild.fulfilled, (state) => {
        state.handlers.update_child_loading = false;
      })
      .addCase(updateSubscriptionChild.rejected, (state) => {
        state.handlers.update_child_loading = false;
      })

      .addCase(validateCoupon.pending, (state) => {
        state.handlers.coupon_validation_loading = true;
        state.coupon_validation = undefined;
      })
      .addCase(validateCoupon.fulfilled, (state, action: PayloadAction<CouponValidationResponse>) => {
        state.handlers.coupon_validation_loading = false;
        state.coupon_validation = action.payload;
      })
      .addCase(validateCoupon.rejected, (state) => {
        state.handlers.coupon_validation_loading = false;
        state.coupon_validation = undefined;
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

      .addCase(attachPaymentMethod.pending, (state) => {
        state.handlers.initiate_payment_loading = true;
      })
      .addCase(attachPaymentMethod.fulfilled, (state) => {
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

      .addCase(reactivateSubscription.pending, (state) => {
        state.handlers.reactivate_subscription_loading = true;
      })
      .addCase(reactivateSubscription.fulfilled, (state, action) => {
        state.handlers.reactivate_subscription_loading = false;
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
        if (state.current_subscription?.id === action.meta.arg) {
          state.current_subscription = {
            ...state.current_subscription,
            cancel_at_period_end: false,
            canceled_at: "",
          };
        }
      })
      .addCase(reactivateSubscription.rejected, (state) => {
        state.handlers.reactivate_subscription_loading = false;
      });
  },
});

const pricingReducer = pricingSlice.reducer;
export const { clearCouponValidation, clearCurrentSubscription } = pricingSlice.actions;
export default pricingReducer;