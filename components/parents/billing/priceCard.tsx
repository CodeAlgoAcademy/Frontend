interface PlanCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  interval: string;
  trialText: string;
  billingText: string;
  badge?: string;
  selected?: boolean;
  onSelect: () => void;
  showButton?: boolean;
  buttonText?: string;
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
  onSelect,
  showButton = false,
  buttonText = "Get Started",
}) => {
  return (
    <div
      onClick={!showButton ? onSelect : undefined}
      className={`relative w-full max-w-md rounded-xl border bg-white p-6 shadow-sm transition
      ${!showButton ? 'cursor-pointer' : ''}
      ${selected ? "ring-2 ring-mainColor" : !showButton ? "hover:shadow-md" : ""}`}
    >
      {badge && (
        <div className="absolute -top-2 -right-2 rotate-12 rounded-full bg-red-500 px-5 py-2 text-xs font-semibold text-white shadow-md">
          {badge}
        </div>
      )}
      <div className="flex flex-col h-full p-4">
      <div>
      <h3 className="text-xl lg:text-2xl text-mainColor font-bold">{title}</h3>

      <div className="mt-2 flex items-baseline gap-1">
        {originalPrice && (
          <span className="text-sm text-red-500 line-through">
            ${originalPrice}
          </span>
        )}
        <span className="text-3xl font-bold text-mainColor">${price}</span>
        <span className="text-sm text-mainColor">/{interval}</span>
      </div>

      <p className="mt-3 text-md text-gray-600">{trialText}</p>
      <p className="text-sm text-gray-500 mt-2">{billingText}</p>
      </div>

      <div>
      {showButton && (
        <button
          onClick={onSelect}
          className="mt-6 w-full rounded-lg bg-mainRed px-4 py-3 font-semibold text-white transition hover:bg-opacity-90 active:scale-95"
        >
          {buttonText}
        </button>
      )}
      </div>
      </div>

    </div>
  );
};

export default PlanCard;