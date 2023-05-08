describe("Registration", () => {
   beforeEach(() => {
      cy.visit("/signup/select-account-type");
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

   it("Parent Signup", () => {});
});
