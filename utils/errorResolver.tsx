import { toast } from "sonner";
import { closePreloader, openErrorModal } from "store/fetchSlice";
import { store } from "store/store";

export const errorResolver = (error: any): string[] => {
   const dispatch = store.dispatch;

   let resolvedErrors: string[] = [];

   if (error.response.data.details) {
      if (typeof error.response.data.details[0] !== "string") {
         // General
         const errors: string[] = [];
         Object.entries(error.response.data.details[0]).forEach((res) => {
            if (typeof res[1] === "string") {
               errors.push(`${res[0]}- ${res[1] as string}`);
            } else if (typeof res[1] === "object") {
               Object.entries(res[1] as Object).forEach((res2) => {
                  errors.push(`${res2[0]}- ${res2[1]}`);
               });
            }
         });
         resolvedErrors = errors;
      } else {
         resolvedErrors = [error.response.data.details[0]];
      }
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
   toast.error(
      <ul className="flex flex-col gap-y-2">
         {resolvedErrors?.map((error: string, index: number) => (
            <li className="gap-x-4 text-[.85rem]" key={index}>
               • {error}
            </li>
         ))}
      </ul>
   );

   return resolvedErrors;
};
