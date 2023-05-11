const nextJest = require("next/jest");

const createJestConfig = nextJest({
   dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
   moduleNameMapper: {
      "^@/components/(.*)$": "<rootDir>/components/$1",
      "^@/assets/(.*)$": "<rootDir>/assets/$1",
      "^@/pages/(.*)$": "<rootDir>/pages/$1",
   },
   testEnvironment: "jest-environment-jsdom",
   moduleDirectories: ["node_modules", "<rootDir>/"],
};

module.exports = createJestConfig(customJestConfig);
