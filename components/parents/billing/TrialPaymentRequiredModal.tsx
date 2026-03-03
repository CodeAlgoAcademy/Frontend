import { CheckCircle, X, CreditCard } from "lucide-react";

interface SubscriptionSuccessModalProps {
  open: boolean;
  onClose: () => void;
  onAddPayment: () => void;
  subscriptionId: number;
  isTrialSubscription: boolean;
  trialEndsAt?: string;
}

const SubscriptionSuccessModal: React.FC<SubscriptionSuccessModalProps> = ({
  open,
  onClose,
  onAddPayment,
  subscriptionId,
  isTrialSubscription,
  trialEndsAt,
}) => {
  if (!open) return null;

  const formatTrialDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[420px] rounded-lg bg-white p-6 shadow-lg">

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Subscription Successful!
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 ml-11">
          {isTrialSubscription ? (
            <>
              <p className="text-sm text-gray-700">
                Your subscription has been activated successfully. You're now on
                a <span className="font-semibold">7-day free trial</span>.
              </p>
              {trialEndsAt && (
                <p className="mt-2 text-sm text-gray-600">
                  Trial ends on{" "}
                  <span className="font-medium">
                    {formatTrialDate(trialEndsAt)}
                  </span>
                </p>
              )}
              <div className="mt-4 rounded-md bg-blue-50 p-3">
                <div className="flex items-start gap-2">
                  <CreditCard className="mt-0.5 h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      Add payment method now
                    </p>
                    <p className="mt-1 text-xs text-blue-700">
                      Secure your subscription by adding a payment method. You
                      won't be charged until your trial ends.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-700">
              Your subscription has been activated successfully. You can now
              enjoy all premium features.
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          {isTrialSubscription && (
            <button
              onClick={onAddPayment}
              className="flex-1 rounded-md bg-mainColor px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
            >
              Add Payment Method
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessModal;