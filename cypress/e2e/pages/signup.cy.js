describe("Registration", () => {
   beforeEach(() => {
      cy.visit("/signup/select-account-type");
   });

   //    it("Select Account Type Rendering", () => {
   //       cy.contains(/who are you signing up as/i);
   //       cy.getByTestId("accountType").should("have.length", 3);
   //    });

   it("Teacher Signup", () => {
      cy.getByTestId("accountType").contains("Teacher").click();

      const userInfo = {
         email: "user@gmail.com",
         firstname: "user",
         lastname: "user",
         username: "username1",
         password: "userpass1",
         schoolName: "codealgo",
         schoolCountry: "kansas",
      };

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
   });
});
