
import { Subscription } from "types/interfaces";

export const getActiveSubscription = (billing_history: Subscription[] | undefined): Subscription | null => {
  if (!billing_history || billing_history.length === 0) return null;
  
  return billing_history.find(
    (sub) => sub.is_active && sub.payment_status === "Paid"
  ) || null;
};

export const getActiveSubscriptionChildren = (billing_history: Subscription[] | null): (string | number)[] => {
  const activeSub = getActiveSubscription(billing_history);
  if (!activeSub) return [];
  
  return activeSub.children.map(child => child.id);
};