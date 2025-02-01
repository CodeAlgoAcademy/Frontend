import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getActiveSubscription, getBillingHistory, getPricingPlans, initiatePayment, verifyPayment } from "../services/pricingService";
import { IBilling, InitiatePaymentRes, IPlan, ISubscribedPlan, PaymentStatus, PricingSlice } from "types/interfaces";

const initialState: PricingSlice = {
   plans: [],
   handlers: {
      loading: false,
      initiate_payment_loading: false,
      verify_payment_loading: false,
      active_subscription_loading: false,
      billing_history_loading: false,
   },
   initiated_payment: undefined,
   payment_verification_status: undefined,
   active_subscription: undefined,
};

const pricingSlice = createSlice({
   name: "pricingSlice",
   initialState,
   reducers: {},
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
         .addCase(initiatePayment.fulfilled, (state, action: PayloadAction<InitiatePaymentRes>) => {
            state.initiated_payment = action.payload;
            state.handlers.initiate_payment_loading = false;
         })
         .addCase(initiatePayment.rejected, (state) => {
            state.handlers.initiate_payment_loading = false;
            state.initiated_payment = undefined;
         })
         .addCase(verifyPayment.pending, (state) => {
            state.handlers.verify_payment_loading = false;
            state.payment_verification_status = "pending";
         })
         .addCase(verifyPayment.fulfilled, (state, action: PayloadAction<PaymentStatus>) => {
            state.handlers.verify_payment_loading = true;
            state.payment_verification_status = action.payload;
         })
         .addCase(verifyPayment.rejected, (state) => {
            state.handlers.initiate_payment_loading = false;
            state.payment_verification_status = undefined;
         })
         .addCase(getActiveSubscription.pending, (state) => {
            state.handlers.active_subscription_loading = false;
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
         .addCase(getBillingHistory.fulfilled, (state, action: PayloadAction<IBilling[]>) => {
            state.handlers.billing_history_loading = false;
            state.billing_history = action.payload;
         })
         .addCase(getBillingHistory.rejected, (state) => {
            state.handlers.billing_history_loading = false;
         });
   },
});

const pricingReducer = pricingSlice.reducer;
export const {} = pricingSlice.actions;
export default pricingReducer;
