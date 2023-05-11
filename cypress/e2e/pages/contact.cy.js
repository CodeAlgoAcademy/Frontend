import React from "react";

describe("Contact", () => {
   beforeEach(() => {
      cy.visit("/contact");
   });

   it("contact workflow", () => {
      cy.interceptPost("/contact/message", {
         email: "tester@gmail.com",
         message: "Teach my child how to code",
         subject: "My Child",
         name: "Codealgo User",
      });
      // Fill all the inputs
      cy.get(`input[placeholder="What's your name?"]`).type("Codealgo User");
      cy.get(`input[type="email"]`).type("tester@gmail.com");
      cy.get("input[placeholder='How can we help you?']").type("My Child");
      cy.get("textarea").type("Teach my child how to code");

      // Send the request
      cy.contains("button", /submit/i).click();

      // Open a success modal if request was successful
      cy.getByTestId("contact-modal").should("be.visible");
   });
});
