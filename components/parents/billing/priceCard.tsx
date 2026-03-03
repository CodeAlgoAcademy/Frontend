import React from "react";

interface PlanCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  interval: string;
  trialText?: string;
  billingText?: string;
  badge?: string;
  selected?: boolean;
  disabled?: boolean;
  activeSubscriptionBadge?: boolean;
  showButton?: boolean;
  buttonText?: string;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  originalPrice,
  interval,
  trialText,
  billingText,
  badge,
  selected,
  disabled = false,
  activeSubscriptionBadge = false,
  showButton = false,
  buttonText = "Select Plan",
  onSelect,
}) => {
  const isClickable = !disabled && !showButton;

  const containerClasses = `
    relative rounded-lg border-2 p-6 transition
    ${disabled ? "cursor-not-allowed bg-gray-50 opacity-60" : ""}
    ${selected ? "border-mainColor bg-blue-50 ring-2 ring-mainColor" : ""}
    ${
      !disabled && !selected
        ? "border-gray-200 hover:border-mainColor hover:shadow-md"
        : ""
    }
    ${isClickable ? "cursor-pointer" : ""}
  `;

  return (
    <div
      onClick={isClickable ? onSelect : undefined}
       className={`${containerClasses} flex flex-col`}
    >
    <div className="flex-grow">
  {badge && !activeSubscriptionBadge && (
    <div className="absolute -top-2 -right-2 rotate-12 rounded-full bg-red-500 px-5 py-2 text-xs font-semibold text-white shadow-md">
      {badge}
    </div>
  )}

  {activeSubscriptionBadge && (
    <div className="absolute -top-2 -right-2 rotate-12 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
      Active Subscription
    </div>
  )}


  <h3 className="mb-2 text-xl lg:text-2xl font-bold text-mainColor">
    {title}
  </h3>


  <div className="mt-2 flex items-baseline gap-1">
    {originalPrice && (
      <span className="text-sm text-red-500 line-through">
        ${originalPrice}
      </span>
    )}
    <span className="text-3xl font-bold text-mainColor">${price}</span>
    <span className="text-sm text-mainColor">/{interval}</span>
  </div>


  {trialText && (
    <p className="mb-1 text-sm font-medium text-green-600">
      {trialText}
    </p>
  )}

  {billingText && (
    <p className="text-xs text-gray-500">{billingText}</p>
  )}

  {activeSubscriptionBadge && (
    <div className="mt-4 rounded-md border border-orange-200 bg-orange-50 p-3">
      <p className="text-xs font-medium text-orange-700">
        You already have an active subscription for this plan. You cannot
        subscribe to the same plan twice.
      </p>
    </div>
  )}
</div>


      {/* Button */}
      {showButton && (
  <div className="mt-auto pt-6">
    <button
      onClick={onSelect}
      disabled={disabled}
      className="w-full rounded-lg bg-mainRed px-4 py-3 font-semibold text-white transition hover:bg-opacity-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {buttonText}
    </button>
  </div>
)}

    </div>
  );
};

export default PlanCard;