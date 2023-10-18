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

export async function refreshToken() {
   if (typeof window !== "undefined") {
      if (Date.now() - getTimeStamp()! > REFRESH_TOKEN_EXPIRATION_TIME) {
         window.localStorage.removeItem(ILocalStorageItems.token);
         window.localStorage.removeItem("token_timestamp");
         console.error("Refresh token expired. Redirecting to Login page....");
         window.location.replace("login");
      } else {
         try {
            const { data } = await http.post("/auth/token/refresh/", {
               refresh: getRefreshToken(),
            });
            const { access } = data;
            localStorage.setItem(
               ILocalStorageItems.token,
               JSON.stringify({
                  access_token: access,
                  refresh_token: getRefreshToken(),
               })
            );
            setTimeStamp();
            window.location.reload();
            return;
         } catch (e) {
            console.error(e);
         }
      }
   }
}

export function getToken() {
   if (typeof window !== "undefined") {
      const token = JSON.parse(`${window.localStorage.getItem(ILocalStorageItems.token)}`);
      return token?.access_token;
   }
}

export function getAccessToken() {
   if (typeof window !== "undefined") {
      const localAccessToken = getToken();

      if (getTimeStamp() !== undefined && getTimeStamp() !== 0) {
         if (Date.now() - getTimeStamp()! > ACCESS_TOKEN_EXPIRATION_TIME) {
            console.warn("Access token expired. Refreshing...");
            refreshToken();
         }
      }

      return localAccessToken;
   }
}

export function getRefreshToken() {
   if (typeof window !== "undefined") {
      const token = JSON.parse(`${window.localStorage.getItem(ILocalStorageItems.token)}`);
      return token?.refresh_token;
   }
}

export function addUserToLocalStorage(user: IUser) {
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
