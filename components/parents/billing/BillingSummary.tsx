import React, { FC } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface Props {
  amount: number; 
}

const BillingSummary: FC<Props> = ({ amount }) => {
  const router = useRouter();
  const { coupon } = router.query;
  const finalAmount = (amount / 100).toFixed(2);
  const { t } = useTranslation("parent");

  return (
    <div className="w-full rounded-md border border-[#C5C5C5]">
      <h4 className="border-b border-[#C5C5C5] px-4 pb-2 pt-3">
        {t("billingSummary")}
      </h4>

      <div className="pt-4 pb-8 text-[.9rem]">
        <div className="flex justify-between px-4">
          <p>{t("subtotal")}</p>
          <p>${finalAmount}</p>
        </div>
        <div className="mt-4 flex justify-between px-4">
          <p>{t("vat")}</p>
          <p>$0.00</p>
        </div>

        <div className="mt-4 flex justify-between border-t border-[#C5C5C5] pt-4 px-4 font-semibold">
          <p>{t("totalBillingPrice")}</p>
          <p>${finalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default BillingSummary;