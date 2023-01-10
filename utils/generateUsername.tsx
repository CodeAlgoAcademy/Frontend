import { v4 } from 'uuid';

export const generateUsername = (firstName: string, lastName: string): string => {
  const numberOfCount = Math.floor(Math.random() * 10);
  const usernameSuggestions: string[] = [
    `${firstName}_${lastName}${Array(numberOfCount)
      .fill(null)
      .map((number, index: number) => {
        return Math.round(Math.random() * 10);
      })
      .join('')}`,
    `${firstName}${lastName.toUpperCase()}${v4().slice(0, 3)}`,
    `${firstName.toUpperCase()}${lastName}_${v4().slice(0, 5)}`,
  ];

  return usernameSuggestions[Math.floor(Math.random() * usernameSuggestions.length)];
};
