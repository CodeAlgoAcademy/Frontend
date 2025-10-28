export interface PricingSlice {
   plans: IPlan[];
     payments: Payment[];
   handlers: {
      loading: boolean;
      initiate_payment_loading: boolean;
       payments_loading: boolean,
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
