/// <reference types="cypress" />

describe("Login", () => {
   beforeEach(() => {
      cy.visit("/login/select-account-type");
   });

   it("Select Account Type Rendering", () => {
      cy.contains(/who are you logging in as/i);
      cy.getByTestId("accountType").should("have.length", 3);
   });

   it("Teacher login", () => {
      cy.getByTestId("accountType").contains("Teacher").click();

      // Mock request
      cy.login("useremail@gmail.com", "123456789", "Teacher");

      // route to a new login page
      cy.location("pathname").should("eq", "/login/teacher");

      // log in user
      cy.get(`[type="email"]`).type("useremail@gmail.com");
      cy.get(`[type="password"]`).type("123456789");
      cy.contains("button", /login/i).click();

      // route to the add class page if login is successful
      cy.location("pathname", { timeout: 10000 }).should("eq", "/teachers/addClass");
   });

   it("Parent Login", () => {
      cy.getByTestId("accountType").contains("Parent").click();

      // Mock request
      cy.login("useremail@gmail.com", "123456789", "Parent");

      // route to a new login page
      cy.location("pathname").should("eq", "/login/parent");

      // log in user
      cy.contains("button", /login/i).click();

      // route to the add class page if login is successful
      cy.location("pathname", { timeout: 10000 }).should("eq", "/parents");
   });
});
