/// <reference types="cypress" />

describe("Home", () => {
   beforeEach(() => {
      cy.visit("/");
   });
   it("Should display heading text", () => {
      cy.contains(/We Believe Every Child Is A Genius!/i).should("be.visible");
      cy.contains(
         /3D games from CodeAlgo academy will bring students to computer sciences where they can teach themselves coding as they play./i
      ).should("be.visible");
   });
});
