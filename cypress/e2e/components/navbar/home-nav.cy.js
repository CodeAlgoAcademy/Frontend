import React from "react";

describe("Navbar", () => {
   beforeEach(() => {
      cy.visit("/");
   });

   it("Should render navlinks and nav buttons", () => {
      cy.getByTestId("nav-header").should("have.length", 6);
      cy.get("button")
         .contains(/log in/i)
         .should("be.visible");
      cy.get("button")
         .contains(/register/i)
         .should("be.visible");
   });
});
