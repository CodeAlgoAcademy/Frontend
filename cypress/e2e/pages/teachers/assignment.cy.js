/// <reference types="cypress" />

describe("Assignments", () => {
   beforeEach(() => {
      cy.setStorage("Teacher");
      cy.visit("/teachers/curriculum");

      cy.getClasses();
   });

   it("Should add an assignment", () => {
      // Get the unit and route to the assignment page for that unit
      cy.interceptGet("/academics/curriculums/units/", "teachers/curriculums.json");
      cy.interceptGet(`/academics/class/1/student`, "teachers/students.json");
      cy.interceptGet("/academics/curriculums/units/1/assignments/", "teachers/assignments.json");
      cy.interceptPost("/academics/curriculums/units/1/assignment/", {
         message: "Assignment added successfully",
      });

      // Get the button to route to the next page
      cy.getByTestId("current-unit-container")
         .contains(/view unit/i)
         .click();

      // get the add assignments button to route to the page
      cy.contains(/add assignment/i, { timeout: 40000 }).click();

      // should be on the assignments page now
      cy.location("pathname", { timeout: 40000 }).should("eq", "/teachers/curriculum/assignments");

      // Add title
      cy.get("input[placeholder='Assignment Title']").type("New Work");
      // Add skill
      cy.getByTestId("skills-modal-controller").click();
      cy.getByTestId("skills-modal").should("be.visible");
      cy.get("label[for='testid-1']").click();
      cy.contains("button", /done/i).click();

      // Add students
      cy.getByTestId("students-modal-controller").click();
      cy.getByTestId("students-modal").should("be.visible");
      cy.get("input#allStudents + label").should("be.visible").click();
      cy.contains("button", /confirm/i).click();

      // Add a schedule
      cy.get("label[for='now-schedule']").click();
      cy.get("input[type='date']").type(`${new Date().getFullYear() + 1}-09-10`);

      // Add number of questions
      // cy.get("input[type='range']").type(80);

      // Add order of questions
      cy.get('label[for="sequence-order"]').click();

      // submit - you can choose to save or confirm

      cy.contains("button", /create/i).click();
   });
});
