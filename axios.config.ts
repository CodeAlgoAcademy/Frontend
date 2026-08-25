import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ILocalStorageItems } from "types/interfaces/localstorage.interface";

const http = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
   // Without this a request to a container that has stopped answering hangs
   // until the browser gives up, which is minutes. The screen keeps its
   // spinner and the user reads that as "the site is broken" rather than
   // "that one call failed".
   //
   // Deliberately generous. The only thing a timeout can do to a working
   // request is turn a slow success into a failure, and /academics/class/<id>
   // has been measured at 52 seconds on a bad day. This is a backstop for a
   // dead container, not a latency budget.
   timeout: 120000,
});

/**
 * Access tokens last an hour and a class period is an hour, so this runs for
 * real every single lesson.
 *
 * What it replaces: getAccessToken() checked the clock, called refreshToken()
 * without awaiting it, and returned the expired token anyway - so the request
 * that triggered the refresh went out with the dead token and came back 401.
 * refreshToken() then called window.location.reload(). Every component asking
 * for the token started its own copy of that, so one expiry produced a burst of
 * refresh POSTs and repeated reloads, and if the refresh call failed it logged
 * to the console and left the tab holding an expired token forever - every
 * request 401, every page rendering its shell with no data in it.
 *
 * Now: one refresh at a time, awaited, and the request that hit the 401 is
 * retried with the new token. No reloads.
 */

type RetriableConfig = AxiosRequestConfig & { _retriedAfterRefresh?: boolean };

const REFRESH_PATH = "/auth/token/refresh/";

function readTokens(): { access_token?: string; refresh_token?: string } {
   if (typeof window === "undefined") return {};
   try {
      return JSON.parse(window.localStorage.getItem(ILocalStorageItems.token) || "{}") || {};
   } catch {
      return {};
   }
}

function writeAccessToken(access: string) {
   if (typeof window === "undefined") return;
   try {
      const stored = JSON.parse(window.localStorage.getItem(ILocalStorageItems.token) || "{}") || {};
      stored.access_token = access;
      window.localStorage.setItem(ILocalStorageItems.token, JSON.stringify(stored));
      window.localStorage.setItem(ILocalStorageItems.token_timestamp, "" + Date.now());
   } catch {
      // Storage is full or blocked. The in-memory retry below still works for
      // this request; the next page load will send the user to log in.
   }
}

function signOut() {
   if (typeof window === "undefined") return;
   window.localStorage.removeItem(ILocalStorageItems.token);
   window.localStorage.removeItem(ILocalStorageItems.token_timestamp);
   if (!window.location.pathname.startsWith("/login")) {
      window.location.assign("/login");
   }
}

// One in-flight refresh, shared by everything that 401s while it is running.
let refreshInFlight: Promise<string | null> | null = null;

function refreshAccessToken(): Promise<string | null> {
   if (refreshInFlight) return refreshInFlight;

   const refresh = readTokens().refresh_token;
   if (!refresh) return Promise.resolve(null);

   // Sent on `http` so it picks up baseURL from the same place as everything
   // else. The response interceptor below skips this URL, so a 401 from the
   // refresh itself cannot recurse.
   refreshInFlight = http
      .post(REFRESH_PATH, { refresh }, { timeout: 30000 })
      .then((res) => {
         const access: string | undefined = res.data?.access;
         if (!access) return null;
         writeAccessToken(access);
         return access;
      })
      .catch(() => null)
      .finally(() => {
         refreshInFlight = null;
      });

   return refreshInFlight;
}

// Deliberately no request interceptor. Every call site already attaches its
// own Authorization header, and attaching one here would also put it on
// /auth/login/ and /auth/registration/ - where DRF runs authentication before
// permissions, so a stale token in localStorage turns a perfectly good login
// into a 401 InvalidToken. Those requests have to go out anonymous.

http.interceptors.response.use(
   (res) => res,
   async (error: AxiosError) => {
      const config = error.config as RetriableConfig | undefined;

      const isAuthProblem = error.response?.status === 401;
      const isRefreshCall = config?.url?.includes(REFRESH_PATH);

      if (!isAuthProblem || !config || isRefreshCall || config._retriedAfterRefresh) {
         return Promise.reject(error);
      }

      // Nothing to refresh with: this is an anonymous caller hitting something
      // that needs auth, not an expired session. Let the page deal with it
      // rather than bouncing someone off a public page to /login.
      if (!readTokens().refresh_token) {
         return Promise.reject(error);
      }

      const access = await refreshAccessToken();
      if (!access) {
         // The refresh token is gone or expired too. This one really is over.
         signOut();
         return Promise.reject(error);
      }

      config._retriedAfterRefresh = true;
      config.headers = config.headers || {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${access}`;
      return http(config);
   }
);

export default http;
