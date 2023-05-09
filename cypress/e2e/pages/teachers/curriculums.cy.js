/// <reference types="cypress" />
const { getDate } = require("../../../../utils/getDate");

describe("Curriculum", () => {
   beforeEach(() => {
      cy.setStorage("Teacher");
      cy.visit("/teachers/curriculum");
      cy.interceptGet("/academics/class", "teachers/classes.json");
   });
   it("Add unit flow", () => {
      // Mock requests
      cy.interceptGet("/academics/curriculums/units/", "teachers/curriculums.json");
      cy.interceptPost("/academics/curriculums/units/", {
         message: "Class added successfully",
      });

      cy.contains(/add unit/i).click();
      cy.getByTestId("add-unit-modal").should("be.visible");

      // Select the standard
      cy.getByTestId("standard").click().find("[data-testid='standard-0']+label").click();

      // Select the level
      cy.getByTestId("level").click().find("[data-testid='level-0']+label").click();

      // Select the grade
      cy.getByTestId("grade").click().find("[data-testid='grade-0']").click();

      // Select the unit
      // Open the modal
      cy.getByTestId("unit-modal-controller").click();
      cy.getByTestId("unit-modal").should("be.visible");
      // The hints on how to add a unit should be displayed
      cy.contains(/hints/i).should("be.visible");

      // Test on adding the first unit - make it current
      const today = new Date();

      cy.getByTestId("unit-0").find("h2").should("be.visible");
      cy.getByTestId("unit-0")
         .contains("button", /current/i)
         .click();
      // add a start date of today's date
      cy.getByTestId("unit-0").find("input[placeholder='start date']").type(getDate());
      // add a future date for end date
      cy.getByTestId("unit-0")
         .find("input[placeholder='end date']")
         .type(getDate(`${today.getFullYear() + 1}-12-20`));

      // Test on adding the second unit - make it upcoming
      cy.getByTestId("unit-1").find("h2").should("be.visible");
      // current shouldn't work since there's already a current unit selected
      cy.getByTestId("unit-1")
         .contains("button", /upcoming/i)
         .click();
      cy.getByTestId("unit-1")
         .find("input[placeholder='start date']")
         .type(getDate(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`));

      cy.getByTestId("unit-1")
         .find("input[placeholder='end date']")
         .type(getDate(`${today.getFullYear() + 1}-12-20`));

      // Close the modal
      cy.contains("button", /done/i).click();

      // Submit request
      cy.contains("button", /submit/i).click();
      // Expect the modal to have closed
      cy.getByTestId("add-unit-modal").should("have.length", 0);
   });
});
