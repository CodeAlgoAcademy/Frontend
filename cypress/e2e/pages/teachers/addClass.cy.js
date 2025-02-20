/// <reference types="cypress" />

describe("Add Class", () => {
   beforeEach(() => {
      cy.visit("/login/teacher");

      const user = { email: "user@gmail.com", password: "1234567" };
      cy.login(user.email, user.password, "Teacher");

      // log in user
      cy.contains("button", /login/i).click();
   });

   it("Should fetch all classes", () => {
      cy.interceptGet("/academics/class", "teachers/classes.json");
      //   route to main dashboard page
      cy.getByTestId("single-class")
         .contains(/dashboard/i)
         .click();

      cy.location("pathname", { timeout: 100000 }).should("eq", "/teachers");
   });

   it("Add class flow", () => {
      const classInfo = {
         className: "jss1",
         grade: "9",
         subject: "yoruba",
         roomNumber: 11,
         color: "darkred",
         coTeachers: "none",
         student: {
            firstName: "user",
            lastName: "name",
            email: "user@gmail.com",
            username: "username.mystudent",
         },
      };

      cy.interceptGet("/academics/class", "teachers/classes.json");

      cy.interceptPost("/academics/class", classInfo);

      cy.contains(/Add Class/i).click();

      // modal should be opened
      const modal = cy.getByTestId("addClassModal");

      modal.should("be.visible");

      // get the class inputs
      cy.get("input[name='className']").type(classInfo.className);
      cy.get("input[name='subject']").type(classInfo.subject);
      cy.get("input[name='roomNumber']").type(classInfo.roomNumber);
      cy.get("input[name='coTeachers']").type(classInfo.coTeachers);

      // Color selection - select the second color
      cy.getByTestId("color-modal-controller").click();
      cy.getByTestId("color-modal-1").click();

      // Adding students
      cy.contains("h3", /add new student/i).click();
      cy.get("input[name='firstName']").type(classInfo.student.firstName);
      cy.get("input[name='lastName']").type(classInfo.student.lastName);
      cy.get("input[name='email']").type(classInfo.student.email);
      cy.get("input[name='username']").type(classInfo.student.username);
      cy.contains("button", /add student/i).click();

      // Make the request
      cy.contains("button", /create/i).click();

      // Modal should close
      modal.should("not.be.visible");
   });
});
