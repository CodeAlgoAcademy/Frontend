import { PaymentConfirmation, PaymentMade } from "@/components/parents/billing/BillingModals";
import ParentLayout from "@/components/layouts/ParentLayout";
import SideNav from "@/components/parents/UI/ParentSideNav";
import { countryList } from "@/components/signup/countries";
import { Checkbox } from "@mui/material";
import { height } from "@mui/system";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { initiatePayment } from "services/pricingService";
import { RootState } from "store/store";
import PaymentPage from "@/components/parents/billing/PaymentPage";

const Payment = () => {
   return (
      <ParentLayout title="Payment">
         <PaymentPage />
      </ParentLayout>
   );
};

export default Payment;
