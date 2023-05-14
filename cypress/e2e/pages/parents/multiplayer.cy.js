/// <reference types="cypress" />

describe("Multiplayer", () => {
   beforeEach(() => {
      cy.setStorage("Parent");
      cy.visit("/parents/multiplayer");
      cy.interceptGet("/parent/child", "parents/children.json");
      cy.interceptGet("/chat/parent", "parents/conversations.json");
   });

   it("Should render correctly", () => {
      // by rendering correctly it should display 4 boxes
      cy.contains("h1", /multiplayer/i);
      cy.contains("h1", /friends/i);
      cy.contains("h1", /friend requests/i);
      cy.contains("h1", /add a friend/i);
   });

   it("Should display pending requests", () => {
      // From the fixture, child with fullName "Daniel Adejare" is the one with a pending requests, let's first ensure that is the child selected
      cy.getByTestId("select-child").click();

      cy.getByTestId("child", { timeout: 40000 })
         .contains(/Daniel Adejare/i)
         .click();

      cy.getByTestId("select-child").click(); // closes the modal

      //   Now the child the request was sent to has a username "DUNSIN_1cea7"

      cy.getByTestId("friends-container")
         .find(`[data-testid='friend-req-0']`)
         .contains(/dunsin_1cea7/i)
         .should("be.visible");
   });
});
