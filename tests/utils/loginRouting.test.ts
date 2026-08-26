/**
 * The login pages used to answer a role mismatch with "Invalid credentials" -
 * on credentials that were correct and had already produced a token. These
 * cover the replacement: the mismatch is still refused, but it is named, and
 * the message can point at the login page that would have worked.
 */

import {
   canAddRoleWithGoogle,
   destinationFor,
   isExternalDestination,
   loginPageFor,
   resolveLogin,
   roleApiName,
   roleFromPath,
   roleLabel,
   roleLabelKey,
} from "../../utils/loginRouting";

describe("roleFromPath", () => {
   it("reads the role out of the login path", () => {
      expect(roleFromPath("/login/teacher")).toBe("teacher");
      expect(roleFromPath("/login/parent")).toBe("parent");
      expect(roleFromPath("/login/organizer")).toBe("organizer");
   });

   it("falls back to student", () => {
      expect(roleFromPath("/login")).toBe("student");
   });
});

describe("resolveLogin", () => {
   it("passes an account straight through on its own page", () => {
      expect(resolveLogin({ is_teacher: true }, "teacher")).toEqual({ status: "ok", role: "teacher" });
   });

   it("names the role a guardian actually has on the teacher page", () => {
      expect(resolveLogin({ is_parent: true }, "teacher")).toEqual({ status: "wrongRole", roles: ["parent"] });
   });

   it("lists every role the account holds when none is the one requested", () => {
      expect(resolveLogin({ is_teacher: true, is_parent: true }, "organizer")).toEqual({
         status: "wrongRole",
         roles: ["teacher", "parent"],
      });
   });

   it("does not report a wrong role when one of several matches", () => {
      expect(resolveLogin({ is_teacher: true, is_parent: true }, "parent")).toEqual({ status: "ok", role: "parent" });
   });

   it("reports an account with no roles rather than blaming the password", () => {
      expect(resolveLogin({}, "teacher")).toEqual({ status: "noRole", requested: "teacher" });
      expect(resolveLogin(undefined, "teacher")).toEqual({ status: "noRole", requested: "teacher" });
   });
});

describe("destinationFor", () => {
   it("routes each role to its own area", () => {
      expect(destinationFor("teacher")).toBe("/teachers/addClass");
      expect(destinationFor("parent")).toBe("/parents");
      expect(destinationFor("organizer")).toBe("/organizers");
   });

   it("honours the add-student redirect for guardians", () => {
      expect(destinationFor("parent", true)).toBe("/add-student");
   });

   it("sends students to the game app, which is a different origin", () => {
      expect(isExternalDestination(destinationFor("student"))).toBe(true);
      expect(isExternalDestination(destinationFor("teacher"))).toBe(false);
   });
});

describe("loginPageFor", () => {
   it("points at the page that would have worked", () => {
      expect(loginPageFor("teacher")).toBe("/login/teacher");
      expect(loginPageFor("parent")).toBe("/login/parent");
      expect(loginPageFor("organizer")).toBe("/login/organizer");
   });

   it("sends students to the game app, where they sign in", () => {
      expect(isExternalDestination(loginPageFor("student"))).toBe(true);
   });
});

describe("naming", () => {
   it("keeps the display label separate from the value the API wants", () => {
      expect(roleLabel("parent")).toBe("Guardian");
      expect(roleApiName("parent")).toBe("Parent");
   });

   it("has a translation key for every role", () => {
      expect(["teacher", "parent", "organizer", "student"].map((r) => roleLabelKey(r as any))).toEqual([
         "roleTeacher",
         "roleGuardian",
         "roleAdmin",
         "roleStudent",
      ]);
   });

   it("does not offer to add a role google cannot add", () => {
      expect(canAddRoleWithGoogle("organizer")).toBe(false);
      expect(canAddRoleWithGoogle("teacher")).toBe(true);
   });
});
