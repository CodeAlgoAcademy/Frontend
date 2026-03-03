import { Subscription } from "types/interfaces";


export const sortBillingHistory = (billing_history: Subscription[] | undefined) => {
   if (!billing_history) return [];
   
   return [...billing_history].sort((a, b) => {
      const getPriority = (sub: Subscription) => {
         if (sub.is_active && !sub.cancel_at_period_end) return 1;
         if (sub.cancel_at_period_end) return 2;
         return 3;
      };

      const priorityA = getPriority(a);
      const priorityB = getPriority(b);

      if (priorityA !== priorityB) {
         return priorityA - priorityB;
      }

      const dateA = a.activated_date ? new Date(a.activated_date).getTime() : 0;
      const dateB = b.activated_date ? new Date(b.activated_date).getTime() : 0;
      
      if (dateA !== dateB) {
         return dateB - dateA;
      }

      return b.id - a.id;
   });
};