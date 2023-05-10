/// <reference types="cypress" />

describe("Students", () => {
   beforeEach(() => {
      cy.setStorage("Teacher");
      cy.visit("/teachers/students");
      cy.getClasses();
      //   Always use 1 as class id for fetching stuffs that require the class id
      cy.interceptGet(`/academics/class/1/student`, "teachers/students.json");
   });

   it("Should fetch all the students", () => {
      cy.getByTestId("single-student").should("have.length", 3);
   });

   it("Add student flow", () => {
      const studentInfo = {
         firstName: "firstname",
         lastName: "lastname",
         email: "firstlast@mail.com",
         username: "first-username",
      };

      cy.interceptPost("/academics/class/1/student", studentInfo);

      cy.contains(/add student/i).click();
      cy.getByTestId("add-student-modal").should("be.visible");

      cy.get("input[name='firstName']").type(studentInfo.firstName);
      cy.get("input[name='lastName']").type(studentInfo.lastName);
      cy.get("input[name='email']").type(studentInfo.email);
      cy.get("input[name='username']").type(studentInfo.username);

      cy.contains("button", /add student/i).click();
   });
});
