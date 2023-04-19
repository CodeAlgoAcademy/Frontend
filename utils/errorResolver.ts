import { closePreloader, openErrorModal } from "store/fetchSlice";
import { store } from "store/store";

export const errorResolver = (error: any): string[] => {
   const dispatch = store.dispatch;

   let resolvedErrors: string[] = [];

   if (error.response.data.details) {
      // General
      const errors: string[] = [];
      Object.entries(error.response.data.details[0]).forEach((res) => {
         errors.push(res[1] as string);
      });
      resolvedErrors = errors;
   } else if (error.response.data.detail) {
      // For Email Verification
      if (typeof error.response.data.detail === "string") {
         resolvedErrors = [error.response.data.detail];
      } else {
         // Mostly for tokens
         const errors: string[] = [];
         Object.entries(error.response.data.detail).forEach((res) => {
            errors.push(res[1] as string);
         });

         resolvedErrors = errors;
      }
   } else if (typeof error.response.data === "string") {
      resolvedErrors = [error.response.data];
   } else {
      resolvedErrors = [error.message];
   }

   dispatch(closePreloader());
   dispatch(openErrorModal({ errorText: resolvedErrors }));

   return resolvedErrors;
};
