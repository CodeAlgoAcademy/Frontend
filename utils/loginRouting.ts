/**
 * Where a login goes, given the account that actually came back.
 *
 * The login pages used to compare the role in the URL against the flags on the
 * user and, on any mismatch, show "Invalid credentials". That message was wrong.
 * The credentials were correct - the token was already minted and written to
 * localStorage by the time the check ran - and the person was left on the login
 * form with no idea that their account exists and works, only under a different
 * role. A guardian who clicks the teacher card gets told, over and over, that
 * their password is bad.
 *
 * The mismatch is still a stop: a guardian is not signed in on the teacher
 * page. What changes is that it is named. This works out which roles the
 * account really has and where the login page for each of them is, so the
 * message can say "that is a Guardian account, log in over there" instead.
 */

export type AccountRole = "teacher" | "parent" | "organizer" | "student";

export const STUDENT_APP_URL = "https://play.codealgoacademy.com";

const ROLE_FLAG: Record<AccountRole, string> = {
   teacher: "is_teacher",
   parent: "is_parent",
   organizer: "is_organizer",
   student: "is_student",
};

// What each role is called in the product. Note "parent" is "Guardian"
// everywhere the user sees it, and "organizer" is "Admin".
const ROLE_LABEL: Record<AccountRole, string> = {
   teacher: "Teacher",
   parent: "Guardian",
   organizer: "Admin",
   student: "Student",
};

// The order roles are listed in when an account holds more than one.
const ROLE_ORDER: AccountRole[] = ["organizer", "teacher", "parent", "student"];

// The roles /auth/google/ will add to an existing account. There is no
// "organizer" in the backend's role choices, so it is not offered.
const GOOGLE_ADDABLE_ROLES: AccountRole[] = ["teacher", "parent", "student"];

// The capitalised names updateAccountType() compares against. Not the same as
// the display label: "parent" shows as "Guardian" but is sent as "Parent".
const ROLE_API_NAME: Record<AccountRole, string> = {
   teacher: "Teacher",
   parent: "Parent",
   organizer: "Organizer",
   student: "Student",
};

export function roleApiName(role: AccountRole): string {
   return ROLE_API_NAME[role];
}

export function roleLabel(role: AccountRole): string {
   return ROLE_LABEL[role];
}

// i18n key for the same label, in locales/<lang>/auth.json.
const ROLE_LABEL_KEY: Record<AccountRole, string> = {
   teacher: "roleTeacher",
   parent: "roleGuardian",
   organizer: "roleAdmin",
   student: "roleStudent",
};

export function roleLabelKey(role: AccountRole): string {
   return ROLE_LABEL_KEY[role];
}

export function canAddRoleWithGoogle(role: AccountRole): boolean {
   return GOOGLE_ADDABLE_ROLES.includes(role);
}

/** Which login/signup page this is, by path. Defaults to student. */
export function roleFromPath(pathname: string): AccountRole {
   if (pathname.includes("teacher")) return "teacher";
   if (pathname.includes("parent")) return "parent";
   if (pathname.includes("organizer")) return "organizer";
   return "student";
}

/** Every role the account actually holds. */
export function rolesOnAccount(user: any): AccountRole[] {
   if (!user) return [];
   return ROLE_ORDER.filter((role) => Boolean(user[ROLE_FLAG[role]]));
}

/**
 * Landing page for a role. Students live in a separate app, so that one is an
 * absolute URL and has to be handled with window.location, not the router.
 */
export function destinationFor(role: AccountRole, redirectToAddStudent = false): string {
   switch (role) {
      case "teacher":
         return "/teachers/addClass";
      case "parent":
         return redirectToAddStudent ? "/add-student" : "/parents";
      case "organizer":
         return "/organizers";
      default:
         return STUDENT_APP_URL;
   }
}

export function isExternalDestination(destination: string): boolean {
   return destination.startsWith("http");
}

/** The login page for a role. Students sign in inside the game app. */
export function loginPageFor(role: AccountRole): string {
   switch (role) {
      case "teacher":
         return "/login/teacher";
      case "parent":
         return "/login/parent";
      case "organizer":
         return "/login/organizer";
      default:
         return STUDENT_APP_URL;
   }
}

export type LoginResolution =
   | { status: "ok"; role: AccountRole }
   // The credentials were fine, but none of the account's roles is the one this
   // page signs in. Say which roles it does have and where they log in.
   | { status: "wrongRole"; roles: AccountRole[] }
   // The account carries no role flags at all.
   | { status: "noRole"; requested: AccountRole };

export function resolveLogin(user: any, requested: AccountRole): LoginResolution {
   const roles = rolesOnAccount(user);

   if (roles.includes(requested)) return { status: "ok", role: requested };
   if (roles.length > 0) return { status: "wrongRole", roles };
   return { status: "noRole", requested };
}
