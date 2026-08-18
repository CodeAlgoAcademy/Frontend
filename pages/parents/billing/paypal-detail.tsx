import ParentLayout from "@/components/layouts/ParentLayout";
import { countryList } from "@/components/signup/countries";
import Image from "next/image";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

const PaypalDetail = () => {
   const { t } = useTranslation("parent");
   return (
      <ParentLayout title={t("paypal")}>
         <div className=" scrollbar-hide overflow-y-scroll bg-white px-8 pt-6 pb-10">
            <div className="border-b border-[#C5C5C5] pb-2 text-lg font-[600]">
               <Image width={150} height={94} src="/assets/paypalLogo.png" alt="paypal" />
            </div>

            <div className="flex w-full gap-16">
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">{t("firstName")} *</h4>
                  <input
                     type="text"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder={t("enterPassword")}
                  />
               </div>
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">{t("lastName")} *</h4>
                  <input
                     type="text"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder={t("enterPassword")}
                  />
               </div>
            </div>
            <h4 className="mt-8 pb-2 text-lg font-[600]">{t("countryRegion")} *</h4>
            <div className="flex h-[44px] items-center gap-5 rounded-sm  border border-[#C5C5C5] py-2 px-4">
               <select className="w-full outline-none">
                  <option value="Select School Country">Unites States</option>
                  {countryList.map((countryOption: string, index: number): ReactNode => {
                     return (
                        <option value={countryOption} key={index}>
                           {countryOption}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div className="flex-1">
               <h4 className="mt-8 pb-2 text-lg font-[600]">{t("streetAddress")} *</h4>
               <input type="text" className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none" placeholder={t("enterPassword")} />
            </div>
            <div className="flex w-full gap-16">
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">{t("state")} *</h4>
                  <input
                     type="number"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder={t("enterPassword")}
                  />
               </div>
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">{t("townCity")}*</h4>
                  <input
                     type="text"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder={t("enterPassword")}
                  />
               </div>
            </div>
            <div className="flex w-full gap-16">
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">{t("zipCode")} *</h4>
                  <input
                     type="number"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder={t("enterPassword")}
                  />
               </div>
               <div className="flex-1">
                  <h4 className="mt-8 pb-2 text-lg font-[600]">{t("emailAddress")}*</h4>
                  <input
                     type="text"
                     className="h-[44px] w-full rounded-sm border border-[#C5C5C5] py-2 px-4 outline-none"
                     placeholder={t("enterPassword")}
                  />
               </div>
            </div>
            <div className="mt-10 flex justify-center">
               <button className="mx-auto w-[292px] rounded-[4px] bg-mainColor py-3 text-xs text-white">{t("proceedToPaypal")}</button>
            </div>
         </div>
      </ParentLayout>
   );
};

export default PaypalDetail;
