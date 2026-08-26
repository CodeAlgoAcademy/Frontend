import { toast } from "sonner";
import { closePreloader, openErrorModal } from "store/fetchSlice";
import { store } from "store/store";

/**
 * Turns a rejected request into the list of messages the error modal shows.
 *
 * The version this replaces opened with `error.response.data.details` and no
 * guard at all. Every caller runs it from inside a catch block, so the moment
 * `error.response` was undefined - a request that never got an answer, a
 * timeout, a CORS failure, an aborted navigation - this threw a TypeError
 * before reaching the `closePreloader()` at the bottom. The preloader is
 * full-screen and modal. That is the "Logging You in" spinner that never went
 * away while the container was unreachable: the login had failed, and the one
 * piece of code whose job was to say so was itself broken by the same outage.
 *
 * So: no property is read without knowing it is there, and the preloader is
 * closed on every path.
 */

const NETWORK_MESSAGE =
   "Could not reach the server. Check your connection and try again in a moment.";
const UNREADABLE_MESSAGE = "The server returned an unexpected response. Please try again.";

// DRF puts serializer-level errors under a field name nobody should ever read.
const UNNAMED_FIELDS = ["non_field_errors", "__all__", "detail"];

function label(field: string, message: string): string {
   return UNNAMED_FIELDS.includes(field) ? message : `${field}- ${message}`;
}

/**
 * Backend wording that is accurate but leaves the user with nothing to do.
 * "Unable to log in with provided credentials." is the single most common
 * message the login form shows, and it does not say which half was wrong or
 * what to try next.
 */
const FRIENDLIER: Record<string, string> = {
   "Unable to log in with provided credentials.":
      "That email/username and password don't match an account. Check for typos, or use Forgot password to reset it.",
   "E-mail is not verified.":
      "This account's email hasn't been verified yet. Use Verify Account below to send yourself a new link.",
   "User is already registered with this e-mail address.":
      "An account already uses this email. Log in instead, or reset the password.",
   "Could not verify Google account":
      "Google didn't confirm that sign-in. Try again, or log in with your email and password.",
   "Could not connect to Google authentication service":
      "Couldn't reach Google to check that sign-in. Try again in a moment.",
};

function friendlier(message: string): string {
   return FRIENDLIER[message.trim()] ?? message;
}

function looksLikeHtml(value: string): boolean {
   const head = value.trimStart().slice(0, 200).toLowerCase();
   return head.startsWith("<!doctype") || head.startsWith("<html") || head.includes("<body");
}

function fromPayload(data: any, fallback: string): string[] {
   // DRF's shape here: { details: [...] } from shared/exceptions.py.
   if (data?.details) {
      const first = Array.isArray(data.details) ? data.details[0] : data.details;
      if (typeof first === "string") return [first];
      if (first && typeof first === "object") {
         const errors: string[] = [];
         Object.entries(first).forEach(([field, value]) => {
            if (typeof value === "string") {
               errors.push(label(field, value));
            } else if (Array.isArray(value)) {
               // DRF's usual shape: { field: ["message"] }. The old code fell
               // into the object branch here and printed "0- message", because
               // Object.entries of an array gives you its indices.
               value.forEach((v) => {
                  if (typeof v === "string") errors.push(label(field, v));
               });
            } else if (value && typeof value === "object") {
               Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
                  errors.push(label(k, String(v)));
               });
            }
         });
         if (errors.length) return errors;
      }
   }

   // Email verification and token errors.
   if (data?.detail) {
      if (typeof data.detail === "string") return [data.detail];
      if (typeof data.detail === "object") {
         const errors = Object.values(data.detail as Record<string, unknown>)
            .filter((v): v is string => typeof v === "string");
         if (errors.length) return errors;
      }
   }

   // Serializer errors come back as { field: ["message"] } with no wrapper.
   if (data && typeof data === "object" && !Array.isArray(data)) {
      const errors: string[] = [];
      Object.entries(data).forEach(([field, value]) => {
         if (typeof value === "string") errors.push(label(field, value));
         else if (Array.isArray(value) && typeof value[0] === "string") {
            errors.push(label(field, value[0]));
         }
      });
      if (errors.length) return errors;
   }

   if (typeof data === "string" && data.trim()) {
      // Cloudflare answers an unreachable container with an HTML error page.
      // Putting that in a toast is worse than saying nothing useful.
      return looksLikeHtml(data) ? [UNREADABLE_MESSAGE] : [data];
   }

   return [fallback];
}

export const errorResolver = (error: any): string[] => {
   const dispatch = store.dispatch;

   let resolvedErrors: string[];
   try {
      if (!error?.response) {
         // No answer at all: network down, request timed out, container
         // unreachable, request cancelled.
         resolvedErrors = [
            error?.code === "ECONNABORTED" || error?.message?.includes("timeout")
               ? "The server took too long to answer. Please try again."
               : NETWORK_MESSAGE,
         ];
      } else {
         resolvedErrors = fromPayload(
            error.response.data,
            error?.message || UNREADABLE_MESSAGE
         );
      }
   } catch {
      resolvedErrors = [UNREADABLE_MESSAGE];
   }

   resolvedErrors = resolvedErrors.map(friendlier);

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
