export interface PricingSlice {
  plans: IPlan[];
  payments: Payment[];
  handlers: {
    loading: boolean;
    initiate_payment_loading: boolean;
    payments_loading: boolean;
    verify_payment_loading: boolean;
    active_subscription_loading: boolean;
    billing_history_loading: boolean;
    coupon_validation_loading: boolean;
  };
  initiated_payment?: InitiatePaymentRes;
  coupon_validation?: CouponValidationResponse;
  payment_verification_status?: PaymentStatus;
  active_subscription?: ISubscribedPlan;
  billing_history?: Subscription[];
}

export interface InstitutionInquiryDto {
   name: string;
   email: string;
   category: string;
   institution_name: string;
   student_count: number | string;
   message: string;
}

export interface PlanPrice {
  id: number;
  amount_in_cent: number;
  interval: "DAY" | "WEEK" | "MONTH" | "YEAR" | string;
}
export interface IPlan {
  id: number;
  name: string;
  description: string;
  prices: PlanPrice[];
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

export interface IChild {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: string;
  schoolCountry: string | null;
  schoolName: string | null;
  codingExperience: string;
}
export interface IBilling {
  plan: IPlan;
  is_active: string; 
  activated_date: string;
  expiration_date: string;
}

// type UserPlansResponse = UserPlan[];

export interface IHistory {
  id: number;
  plan_name: string;
  plan_duration: number;
  is_activated: boolean;
  activated_date: string | number | Date; 
  expiration_date: string | number | Date;
  is_active: boolean;
  payment_status: "Paid" | "Pending" | "Failed"; 
  amount: number;
  currency: "usd";
  payment_date: string | null;
  charged_amount: number;
  children: IChild[];
}
export interface Payment {
  payment_id: string;
  status: string;
  currency: string; 
  client_secret: string;
  amount_in_cent: number; 
  charged_amount: number; 
}

export type PaymentsResponse = Payment[];

type SubscriptionStatus = 'TRIALING' | 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
type PlanInterval = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

interface Child {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  dob: string; // YYYY-MM-DD
  schoolName: string;
  schoolCountry: string;
  codingExperience: string;
}

export interface Subscription {
  id: number;
  plan_name: string;
  plan_interval: PlanInterval | string;
  status: SubscriptionStatus | string;
  is_active: string;
  activated_date: string; 
  expiration_date: string; 
  children: Child[];
  payment_status: string;
  amount: number;
  currency: string;
  payment_date: string;
  charged_amount: number;
}
export interface CouponValidationResponse {
  code: string;
  discount: {
    type: "percentage" | "fixed";
    value: number;
  };
  original_amount?: number;
  final_amount?: number;
  discount_amount?: number;
  currency?: string;
  message?: string;
}

