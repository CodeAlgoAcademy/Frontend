describe("Change Password", () => {
   it("Should request for a password reset link", () => {
      cy.visit("/change-password");

      cy.interceptPost("/auth/password-reset", { message: "Password reset link sent" });

      //   Enter in your email
      cy.contains("p", /enter your email address to reset your password/i).should("be.visible");

      cy.get("input[type='email']").type("user123@gmail.com");

      //Make the request
      cy.get("button")
         .contains(/reset password/i)
         .click();

      // Display a success modal if the request is successful
      cy.getByTestId("success-modal").should("be.visible");
   });

   it("Should not reset password if the inputs are different", () => {
      /**
       * @route - /change-password/:uid/:token
       */

      cy.visit("/change-password/1234/56780");

      //   The uid and token attached to the url will be used to make the requests as well
      //   get the inputs

      //   If the inputs values are not the same, an error modal should appear

      cy.get('[placeholder="Enter Your New Password"]').type("1234567");
      cy.get('[placeholder="Confirm Your New Password"]').type("12345");
      cy.contains("button", "Reset Password").click();

      cy.get("[title='error-modal']");
   });

   it("Should reset user password", () => {
      /**
       * @route - /change-password/:uid/:token
       */

      cy.visit("/change-password/1234/56780");

      //   Mock request
      cy.interceptPatch("/auth/password-reset/change/", {
         message: "Password reset successful",
      });

      //   If the inputs values are the same, it will make the request

      cy.get('[placeholder="Enter Your New Password"]').type("1234567");
      cy.get('[placeholder="Confirm Your New Password"]').type("1234567");
      cy.contains("button", "Reset Password").click();

      //   Display modal if request is successful
      cy.getByTestId("success-modal").should("be.visible");
   });
});
