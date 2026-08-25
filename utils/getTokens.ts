import http from "axios.config";
import { IUser } from "types/interfaces";
import { ILocalStorageItems } from "types/interfaces/localstorage.interface";

const ACCESS_TOKEN_EXPIRATION_TIME = 3600 * 1000; // one hour expiration
const REFRESH_TOKEN_EXPIRATION_TIME = 3600 * 1000 * 24; // one day expiration

export function setTimeStamp() {
   if (typeof window !== "undefined") {
      window.localStorage.setItem(ILocalStorageItems.token_timestamp, "" + Date.now());
   }
}

export function getTimeStamp() {
   if (typeof window !== "undefined") {
      const timestamp: number = Number(window.localStorage.getItem(ILocalStorageItems.token_timestamp));

      return timestamp;
   }
}

/**
 * Kept for callers that want to refresh up front. The automatic path is the
 * 401 interceptor in axios.config.ts, which refreshes once and retries the
 * request that failed.
 *
 * This used to end in window.location.reload(). It was called from
 * getAccessToken(), which every component calls, so an expired token produced a
 * burst of refresh POSTs and a page reload on top of whatever the user was
 * doing - and it also rewrote localStorage with only the two tokens in it,
 * dropping the cached user and user_type that the rest of the app reads.
 */
export async function refreshToken() {
   if (typeof window === "undefined") return;

   if (Date.now() - getTimeStamp()! > REFRESH_TOKEN_EXPIRATION_TIME) {
      window.localStorage.removeItem(ILocalStorageItems.token);
      window.localStorage.removeItem(ILocalStorageItems.token_timestamp);
      window.location.replace("/login");
      return;
   }

   try {
      const { data } = await http.post("/auth/token/refresh/", {
         refresh: getRefreshToken(),
      });
      const { access } = data;
      if (!access) return;
      const stored = JSON.parse(window.localStorage.getItem(ILocalStorageItems.token) || "{}") || {};
      stored.access_token = access;
      window.localStorage.setItem(ILocalStorageItems.token, JSON.stringify(stored));
      setTimeStamp();
   } catch (e) {
      console.error(e);
   }
}

export function getToken() {
   if (typeof window !== "undefined") {
      const token = JSON.parse(`${window.localStorage.getItem(ILocalStorageItems.token)}`);
      return token?.access_token;
   }
}

/**
 * A plain read. It used to notice the token had expired, kick off a refresh it
 * did not wait for, and then return the expired token anyway - so the caller
 * sent the dead one and got a 401 regardless. Renewal belongs to the response
 * interceptor in axios.config.ts, which can actually retry the request.
 */
export function getAccessToken() {
   if (typeof window !== "undefined") {
      return getToken();
   }
}

export function getRefreshToken() {
   if (typeof window !== "undefined") {
      const token = JSON.parse(`${window.localStorage.getItem(ILocalStorageItems.token)}`);
      return token?.refresh_token;
   }
}

export function addUserToLocalStorage(user: Partial<IUser>) {
   localStorage.setItem(
      ILocalStorageItems.token,
      JSON.stringify({
         access_token: user.access_token,
         refresh_token: user.refresh_token,
         user: user,
         user_type: user.is_student ? "student" : user.is_teacher ? "teacher" : user.is_parent ? "parent" : user?.is_organizer ? "organizer" : "",
      })
   );
   setTimeStamp();
}

export function updateUserInLocalStorage(user: IUser) {
   if (typeof window !== "undefined") {
      const { access_token, refresh_token } = JSON.parse(localStorage.getItem(ILocalStorageItems.token) as string);

      localStorage.setItem(
         ILocalStorageItems.token,
         JSON.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            user: user,
            user_type: user.is_student ? "student" : user.is_teacher ? "teacher" : user.is_parent ? "parent" : user?.is_organizer ? "organizer" : "",
         })
      );
   }
}

export function getUserFromLocalStorage() {
   if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(ILocalStorageItems.token) as string)?.user;
   }
}
