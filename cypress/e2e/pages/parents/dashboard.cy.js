/// <reference types="cypress" />

describe("Parent dashboard", () => {
   beforeEach(() => {
      cy.setStorage("Parent");
      cy.visit("/parents");
      // Note - I will be using the children in this fixture to test the app
      cy.interceptGet("/parent/child", "parents/children.json");
      cy.interceptGet("/chat/parent", "parents/conversations.json");
   });

   it("Should render correctly", () => {
      // It should display 4 containers by their title
      cy.contains("h1", /level/i).should("be.visible");
      cy.contains("h1", /skills/i).should("be.visible");
      cy.contains("h1", /screen time/i).should("be.visible");
      cy.contains("h1", /multiplayer/i).should("be.visible");
   });

   it("Should display all the children", () => {
      // get the element that displays the first child and click on it to open a modal that displays all the children
      cy.contains("h1", /Daniel Adejare/i)
         .should("be.visible")
         .click();

      cy.getByTestId("child").should("have.length", 2);
      // Switch child
      cy.getByTestId("child")
         .contains(/Adejare Daniel/i)
         .click();

      // Expect the main child now to be Adejare Daniel not Daniel Adejare
      cy.contains("h1", /Adejare Daniel/i).should("be.visible");
   });

   it("Should render the user details from local storage", () => {
      cy.window().then((slug) => {
         const user = JSON.parse(slug.localStorage.getItem("token"))?.user;

         cy.get("h1").contains(`${user?.firstname} ${user?.lastname}`);
      });
   });
});
