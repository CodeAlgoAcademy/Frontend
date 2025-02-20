import { v4 } from "uuid";

export const generateUsername = (firstName: string, lastName: string): string => {
   lastName = lastName.split(" ").join("").trimEnd().trimStart();
   firstName = firstName.split(" ").join("").trimEnd().trimStart();

   const numberOfCount = Math.floor(Math.random() * 10);
   const usernameSuggestions: string[] = [
      `${firstName}${lastName}${Array(numberOfCount)
         .fill(null)
         .map((number, index: number) => {
            return Math.round(Math.random() * 10);
         })
         .join("")}`,
      `${firstName}${lastName.toUpperCase()}${v4().slice(0, 3)}`,
      `${firstName.toUpperCase()}${lastName}@${v4().slice(0, 5)}`,
   ];

   return usernameSuggestions[Math.floor(Math.random() * usernameSuggestions.length)];
};
