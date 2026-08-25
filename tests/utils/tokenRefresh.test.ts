/**
 * The 401 -> refresh -> retry path in axios.config.ts.
 *
 * Access tokens last an hour and so does a class period, so this runs for real
 * every lesson. What it replaced fired an un-awaited refresh, handed the caller
 * the expired token anyway, and finished with window.location.reload() once per
 * component that asked - so one expiry produced a burst of refresh POSTs, a
 * page reload on top of whatever the user was doing, and a tab left holding a
 * dead token whenever the refresh call itself failed.
 */

import http from "../../axios.config";

const PROTECTED = "/academics/class/";
const REFRESH = "/auth/token/refresh/";

type Recorded = { url?: string; auth?: string };

let calls: Recorded[];
let refreshResult: "ok" | "dead";
let assignSpy: jest.Mock;
let realLocation: Location;

function authOf(cfg: any): string | undefined {
   return cfg.headers?.Authorization ?? cfg.headers?.authorization;
}

function reject(cfg: any, status: number) {
   const err: any = new Error(`status ${status}`);
   err.response = { status, statusText: "", headers: {}, config: cfg, data: {} };
   err.config = cfg;
   return Promise.reject(err);
}

function adapter(protectedStatus: (auth?: string) => number) {
   return (cfg: any) => {
      calls.push({ url: cfg.url, auth: authOf(cfg) });

      if (cfg.url?.includes(REFRESH)) {
         if (refreshResult === "dead") return reject(cfg, 401);
         return Promise.resolve({
            status: 200,
            statusText: "OK",
            headers: {},
            config: cfg,
            data: { access: "FRESH" },
         });
      }

      const status = protectedStatus(authOf(cfg));
      if (status >= 400) return reject(cfg, status);
      return Promise.resolve({
         status,
         statusText: "OK",
         headers: {},
         config: cfg,
         data: { ok: true },
      });
   };
}

/** 200 once the caller is carrying the refreshed token, 401 before that. */
const acceptsFreshToken = adapter((auth) => (auth === "Bearer FRESH" ? 200 : 401));

function store(value: unknown) {
   window.localStorage.setItem("token", JSON.stringify(value));
}

function stored() {
   const raw = window.localStorage.getItem("token");
   return raw === null ? null : JSON.parse(raw);
}

function refreshCalls() {
   return calls.filter((c) => c.url?.includes(REFRESH)).length;
}

function protectedCalls() {
   return calls.filter((c) => !c.url?.includes(REFRESH));
}

beforeAll(() => {
   // jsdom has no navigation, and signOut() uses location.assign.
   realLocation = window.location;
   delete (window as any).location;
});

afterAll(() => {
   (window as any).location = realLocation;
});

beforeEach(() => {
   window.localStorage.clear();
   calls = [];
   refreshResult = "ok";
   assignSpy = jest.fn();
   (window as any).location = { pathname: "/teachers", assign: assignSpy };
   http.defaults.adapter = acceptsFreshToken as any;
});

describe("token refresh", () => {
   it("refreshes once and retries the request that got the 401", async () => {
      store({ access_token: "STALE", refresh_token: "R" });

      const res = await http.get(PROTECTED, { headers: { Authorization: "Bearer STALE" } });

      expect(res.data).toEqual({ ok: true });
      expect(refreshCalls()).toBe(1);
      expect(protectedCalls().map((c) => c.auth)).toEqual(["Bearer STALE", "Bearer FRESH"]);
      expect(stored().access_token).toBe("FRESH");
      expect(stored().refresh_token).toBe("R");
      expect(assignSpy).not.toHaveBeenCalled();
   });

   it("keeps the cached user that is stored alongside the tokens", async () => {
      store({ access_token: "STALE", refresh_token: "R", user: { id: 7 }, user_type: "teacher" });

      await http.get(PROTECTED, { headers: { Authorization: "Bearer STALE" } });

      expect(stored().user).toEqual({ id: 7 });
      expect(stored().user_type).toBe("teacher");
   });

   it("refreshes once for a burst of simultaneous 401s", async () => {
      store({ access_token: "STALE", refresh_token: "R" });

      const results = await Promise.all(
         Array.from({ length: 6 }, () =>
            http.get(PROTECTED, { headers: { Authorization: "Bearer STALE" } })
         )
      );

      expect(results.every((r) => (r.data as any).ok)).toBe(true);
      expect(refreshCalls()).toBe(1);
   });

   it("gives up after one retry instead of looping", async () => {
      store({ access_token: "STALE", refresh_token: "R" });
      http.defaults.adapter = adapter(() => 401) as any;

      await expect(
         http.get(PROTECTED, { headers: { Authorization: "Bearer STALE" } })
      ).rejects.toBeTruthy();

      expect(protectedCalls()).toHaveLength(2);
      expect(refreshCalls()).toBe(1);
   });

   it("does not refresh or bounce an anonymous caller", async () => {
      await expect(http.get(PROTECTED)).rejects.toBeTruthy();

      expect(refreshCalls()).toBe(0);
      expect(stored()).toBeNull();
      expect(assignSpy).not.toHaveBeenCalled();
   });

   it("signs out when the refresh token is dead too", async () => {
      store({ access_token: "STALE", refresh_token: "R" });
      refreshResult = "dead";

      await expect(
         http.get(PROTECTED, { headers: { Authorization: "Bearer STALE" } })
      ).rejects.toBeTruthy();

      expect(stored()).toBeNull();
      expect(assignSpy).toHaveBeenCalledWith("/login");
      // One try at refreshing, not one per retry.
      expect(refreshCalls()).toBe(1);
   });

   it("does not redirect a user who is already on the login page", async () => {
      store({ access_token: "STALE", refresh_token: "R" });
      refreshResult = "dead";
      (window as any).location = { pathname: "/login", assign: assignSpy };

      await expect(
         http.get(PROTECTED, { headers: { Authorization: "Bearer STALE" } })
      ).rejects.toBeTruthy();

      expect(assignSpy).not.toHaveBeenCalled();
   });

   it("leaves a non-401 failure alone", async () => {
      store({ access_token: "STALE", refresh_token: "R" });
      http.defaults.adapter = adapter(() => 500) as any;

      await expect(http.get(PROTECTED)).rejects.toBeTruthy();
      expect(refreshCalls()).toBe(0);
   });
});
