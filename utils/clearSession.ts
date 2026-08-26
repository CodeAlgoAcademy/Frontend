import { resetAuthUser } from "store/authSlice";
import { ILocalStorageItems } from "types/interfaces/localstorage.interface";

/**
 * Drop a session that was created but is not being used.
 *
 * A login that lands on the wrong role still succeeds at the API - the thunk
 * has already written the token to localStorage by the time the page decides
 * not to continue. Leaving it there means the next page load thinks the person
 * is signed in as an account they were just told they could not use here.
 */
export function clearSession(dispatch: (action: any) => unknown): void {
   if (typeof window !== "undefined") {
      window.localStorage.removeItem(ILocalStorageItems.token);
      window.localStorage.removeItem(ILocalStorageItems.token_timestamp);
   }

   dispatch(resetAuthUser());
}
