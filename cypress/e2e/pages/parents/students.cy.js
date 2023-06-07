/// <reference types="cypress" />

describe("Students", () => {
   beforeEach(() => {
      cy.setStorage("Parent");
      cy.visit("/parents/student");
      cy.interceptGet("/chat/parent", "parents/conversations.json");
   });

   it("Testing the add child flow", () => {
      const childDetails = {
         fullName: "codealgo child",
         codingExperience: "experienced",
         username: "joe_codealgo",
         dob: "2020-12-09",
         password: "12345678",
      };

      cy.interceptPost("/parent/child", {
         child: childDetails,
         message: "Child added successfully",
      });

      // return an emtpty array for the parent's children
      cy.interceptGet("/parent/child", "parents/no-child.json");

      //   A text should be displayed
      cy.contains(/you do not have a child/i).should("be.visible");
      cy.contains(/Add Child/i).click();

      //   A modal should appear
      cy.getByTestId("add-child-modal").should("be.visible");

      //   Fill the fields
      cy.get("input[name='fullName']").type(childDetails.fullName);
      cy.get("input[name='username']").type(childDetails.username);
      cy.get("input[name='password']").type(childDetails.password);
      cy.get("input[name='dob']").type(childDetails.dob);
      cy.get("select[name='codingExperience']").select(childDetails.codingExperience);

      //   Button to submit req that has been mocked above
      cy.contains("button", /add child/i).click();
   });
});
