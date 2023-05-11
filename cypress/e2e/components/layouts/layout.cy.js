/// <reference types="cypress" />

describe("Layout", () => {
   // So far there's no token, user will be redirected to login except for some specific pages which can be found in the Layout.tsx file

   it("Should not redirect an unrestricted page", () => {
      cy.visit("/press");

      cy.location("pathname").should("eq", "/press");
   });

   it("Should redirect restricted pages when there's no token", () => {
      cy.visit("/teachers/addClass");

      cy.location("pathname", { timeout: 10000 }).should("eq", "/login/select-account-type");
   });

   it("Should not redirect if the user is already logged in", () => {
      cy.visit("/login/teacher");

      const user = { email: "user@gmail.com", password: "1234567" };
      cy.login(user.email, user.password, "Teacher");

      // log in user
      cy.contains("button", /login/i).click();

      cy.location("pathname", { timeout: 10000 }).should("eq", "/teachers/addClass");
   });
});
