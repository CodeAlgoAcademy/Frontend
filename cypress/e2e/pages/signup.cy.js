/// <reference types="cypress" />

describe("Registration", () => {
   beforeEach(() => {
      cy.visit("/signup");
   });

   it("Select Account Type Rendering", () => {
      cy.contains(/who are you signing up as/i);
      cy.getByTestId("accountType").should("have.length", 3);
   });

   it("Teacher Signup", () => {
      cy.getByTestId("accountType").contains("Teacher").click();

      const userInfo = {
         email: "user@gmail.com",
         firstname: "user",
         lastname: "user",
         username: "username1",
         password: "userpass1",
         schoolName: "codealgo",
         schoolCountry: "Nigeria",
      };

      cy.register(userInfo, "Teacher");

      // route to a new signup page
      cy.location("pathname", { timeout: 100000 }).should("eq", "/signup/teacher");

      //   Multistep form test
      const submitButton = cy.get("button[type='submit']");

      //   First step
      cy.get("input[type='email']").type(userInfo.email);
      submitButton.click();

      //   Second step
      cy.get('input[placeholder="Enter your firstname"]').type(userInfo.firstname);
      cy.get('input[placeholder="Enter your lastname"]').type(userInfo.lastname);
      submitButton.click();

      // Third step
      cy.get('input[placeholder="Enter your username"]').type(userInfo.username);
      cy.get('input[placeholder="Enter your password"]').type(userInfo.password);
      submitButton.click();

      // Last step
      cy.get('input[placeholder="Enter School Name"]').type(userInfo.schoolName);
      cy.get("select").select(userInfo.schoolCountry);

      // Signup button should be in last step, make the request
      cy.contains("button", /sign up/i).click();

      cy.location("pathname", { timeout: 10000 }).should("eq", "/verify-email");
   });

   it("Parent Signup", () => {
      cy.getByTestId("accountType").contains("Parent").click();

      const userInfo = {
         email: "user@gmail.com",
         firstname: "user",
         lastname: "user",
         username: "username1",
         password: "userpass1",
         studentName: "user-child",
         studentExperience: "experienced",
         studentUsername: "username-child",
         studentPassword: "123456789",
         friendUsername: "user-friend",
      };

      // Mock requests

      cy.register(userInfo, "Parent");
      cy.interceptPost("/parent/child", {
         studentName: userInfo.studentName,
         studentExperience: userInfo.studentExperience,
         studentPassword: userInfo.studentPassword,
         studentUsername: userInfo.studentUsername,
      });
      cy.interceptPost("/parent/child/friend-request", {
         friendUsername: userInfo.friendUsername,
      });

      // route to a new signup page
      cy.location("pathname", { timeout: 100000 }).should("eq", "/signup/parent");

      //   Multistep form test
      const submitButton = cy.get("button[type='submit']");

      //   First step
      cy.get("input[type='email']").type(userInfo.email);
      submitButton.click();

      //   Second step
      cy.get('input[placeholder="Enter your firstname"]').type(userInfo.firstname);
      cy.get('input[placeholder="Enter your lastname"]').type(userInfo.lastname);
      submitButton.click();

      // Third step
      cy.get('input[placeholder="Enter your username"]').type(userInfo.username);
      cy.get('input[placeholder="Enter your password"]').type(userInfo.password);
      submitButton.click();

      // once user registers a modal should appear
      cy.getByTestId("success-modal").should("be.visible");
      cy.contains("button", /got it!/i).click();
      cy.getByTestId("success-modal").should("not.undefined");

      // Fourth step should be a welcome message
      cy.contains(/welcome to codealgo/i).should("be.visible");
      submitButton.click();

      // Fifth step
      cy.get('input[name="name"]').type(userInfo.studentName);
      submitButton.click();

      // Sixth step
      cy.get("input[type='date']").type("2022-11-10");
      cy.get("select").select(userInfo.studentExperience);
      submitButton.click();

      // Seventh step
      cy.get("input[name='username']").type(userInfo.studentUsername);
      cy.get("input[name='password']").type(userInfo.studentPassword);
      cy.get("input[name='confirm-password']").type(userInfo.studentPassword);
      submitButton.click();

      // Eighth step - success response
      cy.contains(/Your child's account has been created successfully!/i).should("be.visible");

      /**
       * @note - This tests includes the screentime. Normally, a paragraph can be asserted for which when clicked will add the student's details without screentime
       */
      submitButton.click();

      // Ninth step
      cy.contains(/Set your student's parental permissions next/i).should("be.visible");
      submitButton.click();

      // Tenth step - screentime for seven days in a week
      for (let i = 0; i < 7; i++) {
         const container = cy.getByTestId("screentime-component-" + i);
         // open the modal
         container.find("[data-testid='toggle-container']").click();
         // select the second hour for all items in the list
         container.getByTestId("hour-1").click();
      }
      submitButton.click();

      // Eleventh step - multiplayer
      cy.get("input").type(userInfo.friendUsername);
      submitButton.click();

      cy.location("pathname", { timeout: 10000 }).should("eq", "/parents");
   });
});
