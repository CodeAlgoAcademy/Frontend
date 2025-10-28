import { UserResponse } from "types/interfaces/organization.interface";
import { ISingleStudent } from "types/interfaces";

export const mapUserResponseToISingleStudent = (
  students: UserResponse[]
): ISingleStudent[] => {
  return students.map((s) => ({
    id: s.id,
    firstName: s.user.firstname,
    lastName: s.user.lastname,
    username: s.user.username,
    email: s.user.email,
    dob: "",
  }));
};
