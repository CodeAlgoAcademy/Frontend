export interface PricingSlice {
   plans: IPlan[];
   handlers: {
      loading: boolean;
      initiate_payment_loading: boolean;
      verify_payment_loading: boolean;
      active_subscription_loading: boolean;
      billing_history_loading: boolean;
   };
   initiated_payment?: InitiatePaymentRes;
   payment_verification_status?: PaymentStatus;
   active_subscription?: ISubscribedPlan;
   billing_history?: IBilling[];
}
export interface InstitutionInquiryDto {
   name: string;
   email: string;
   category: string;
   institution_name: string;
   student_count: number | string;
   message: string;
}

export interface IPlan {
   id: number;
   name: string;
   amount_in_cent: number;
   description: string;
   duration_in_days: number;
}

export interface ISubscribedPlan {
   plan: IPlan;
   is_active: boolean;
   expiration_date: Date;
   activated_date: Date;
}

export interface InitiatePaymentRes {
   payment_id: string;
   client_secret: string;
   amount_in_cent: number;
}

export type PaymentStatus = "succeeded" | "failed" | "pending";

export interface IBilling {
   activated_date: Date;
   amount: number;
   currency: "usd";
   expiration_date: Date;
   is_activated: boolean;
   is_active: boolean;
   plan_duration: number;
   plan_name: string;
}
