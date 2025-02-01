import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { verifyPayment } from "services/pricingService";
import { RootState } from "store/store";
import Button from "../UI/Button";

const ConfirmPaymentPage = () => {
   const paymentStatus = useSelector((state: RootState) => state.pricing.payment_verification_status);
   const router = useRouter();

   const payment_intent_client_secret: string = useMemo(() => router.query.payment_intent_client_secret as string, [router]);
   const paymentIntent = payment_intent_client_secret?.split("_secret_")?.[0];

   const dispatch = useDispatch();

   const getPaymentIcon = () => {
      switch (paymentStatus) {
         case "succeeded":
            return <BiCheckCircle className="text-green-600" size={70} />;
         case "pending":
            return <span className="h-[70px] w-[70px] animate-spin rounded-full border-y-2 border-r-2 border-mainColor"></span>;
         case "failed":
            return <MdClose className="text-red-600" size={70} />;
      }
   };

   useEffect(() => {
      if (paymentIntent) {
         dispatch(verifyPayment(paymentIntent));
      }
   }, [paymentIntent]);

   return (
      <section className="flex h-screen min-h-screen flex-col bg-[#ECEDF3] px-8 py-4">
         <header className="flex items-center justify-between gap-12">
            <Image src={"/assets/CodeAlgo_Logo.png"} className="h-12 md:cursor-pointer" alt="logo" loading="lazy" width={120} height={60} />
            <MdClose className="text-mainColor" size={30} cursor={"pointer"} onClick={router.back} />
         </header>

         <div className="mt-8 flex h-full w-full flex-1 flex-col items-center justify-center space-y-4 text-center">
            {getPaymentIcon()}

            <div>
               {paymentStatus == "failed" ? (
                  <>
                     <p className="text-[1.3rem] font-bold text-red-600">Payment Failed</p>
                     <Button text="Back to dashboard" onClick={() => router.push("/parents")} />
                  </>
               ) : paymentStatus == "succeeded" ? (
                  <>
                     <p className="mb-3 text-[1.3rem] font-bold text-green-600">Payment Successful</p>
                     <Button text="Back to dashboard" onClick={() => router.push("/parents")} />
                  </>
               ) : (
                  <p className="animate-pulse text-[1.3rem] text-gray-800">Verifying Payment</p>
               )}
            </div>
         </div>
      </section>
   );
};

export default ConfirmPaymentPage;
