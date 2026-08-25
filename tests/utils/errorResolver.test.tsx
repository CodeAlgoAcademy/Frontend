/**
 * Every service in the app runs this from inside a catch block, so whatever it
 * does on a malformed error is what the user sees. It used to read
 * error.response.data.details with no guard, which threw on any request that
 * never got an answer - and threw before the closePreloader() at the bottom, so
 * the full-screen "Logging You in" spinner stayed up forever. That is the shape
 * of "nobody could log in" while the container was unreachable.
 */

const dispatch = jest.fn();
const toastError = jest.fn();

jest.mock("store/store", () => ({ store: { dispatch: (...a: unknown[]) => dispatch(...a) } }));
jest.mock("store/fetchSlice", () => ({
   closePreloader: () => ({ type: "closePreloader" }),
   openErrorModal: (payload: unknown) => ({ type: "openErrorModal", payload }),
}));
jest.mock("sonner", () => ({ toast: { error: (...a: unknown[]) => toastError(...a) } }));

import { errorResolver } from "../../utils/errorResolver";

beforeEach(() => {
   dispatch.mockClear();
   toastError.mockClear();
});

function preloaderClosed() {
   return dispatch.mock.calls.some((c) => c[0]?.type === "closePreloader");
}

describe("errorResolver", () => {
   it("does not throw and still closes the preloader when there was no response", () => {
      const result = errorResolver(new Error("Network Error"));

      expect(result).toHaveLength(1);
      expect(result[0]).toMatch(/could not reach the server/i);
      expect(preloaderClosed()).toBe(true);
   });

   it("says so when the request timed out", () => {
      const result = errorResolver({ code: "ECONNABORTED", message: "timeout of 120000ms exceeded" });

      expect(result[0]).toMatch(/took too long/i);
      expect(preloaderClosed()).toBe(true);
   });

   it("survives an error object with nothing on it at all", () => {
      expect(() => errorResolver(undefined)).not.toThrow();
      expect(preloaderClosed()).toBe(true);
   });

   it("reads the string form the DRF exception handler produces", () => {
      const result = errorResolver({
         response: {
            status: 403,
            data: {
               status_code: 403,
               exception: "PermissionDenied",
               details: ["Only class teacher can add student"],
            },
         },
      });

      expect(result).toEqual(["Only class teacher can add student"]);
   });

   it("reads a field-keyed validation error", () => {
      const result = errorResolver({
         response: {
            status: 400,
            data: {
               status_code: 400,
               exception: "ValidationError",
               details: [{ non_field_errors: ["E-mail is not verified."] }],
            },
         },
      });

      expect(result).toEqual(["non_field_errors- E-mail is not verified."]);
   });

   it("reads the 500 shape", () => {
      const result = errorResolver({
         response: {
            status: 500,
            data: {
               status_code: 500,
               exception: "Internal Server Error",
               details: [{ message: "A server error occurred. Our team has been notified." }],
            },
         },
      });

      expect(result).toEqual(["message- A server error occurred. Our team has been notified."]);
   });

   it("reads the token detail shape", () => {
      const result = errorResolver({
         response: { status: 401, data: { detail: "Given token not valid for any token type" } },
      });

      expect(result).toEqual(["Given token not valid for any token type"]);
   });

   it("does not put a Cloudflare HTML error page in a toast", () => {
      const result = errorResolver({
         response: {
            status: 502,
            data: "<!DOCTYPE html><html><head><title>Worker threw exception</title></head><body>Error 1101</body></html>",
         },
      });

      expect(result).toHaveLength(1);
      expect(result[0]).not.toContain("<");
      expect(result[0]).toMatch(/unexpected response/i);
   });

   it("reads the 503 the Worker sends when the container is unreachable", () => {
      const result = errorResolver({
         response: {
            status: 503,
            data: {
               status_code: 503,
               exception: "ContainerUnavailable",
               details: ["The API is restarting. This usually clears within a minute - please try again."],
            },
         },
      });

      expect(result[0]).toMatch(/restarting/i);
   });
});
