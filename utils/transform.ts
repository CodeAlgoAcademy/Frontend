import { UserResponse } from "types/interfaces/organization.interface";
import { ISingleStudent } from "types/interfaces";

export const mapUserResponseToISingleStudent = (
  students: UserResponse[]
): ISingleStudent[] => {
  return students.map((s) => ({
    id: s.id,
    firstName: s.user.firstName,
    lastName: s.user.lastName,
    username: s.user.username,
    email: s.user.email,
    dob: s.dob || "",
  }));
};
