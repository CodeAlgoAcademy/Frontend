describe("Email verification", () => {
   it("Should resend an email", () => {
      cy.visit("/verify-email");
      // On load you should see a success message because the page only shows on successful signup
      cy.contains("p", /An email verification link has been sent to your email address/i);

      cy.interceptPost("/auth/registration/resend-email/", {
         message: "Verification Email Re-sent",
      });
      //   resend the email when the button is clicked
      cy.contains("button", /resend link/i).click();

      //   Should still sho the success message
      cy.contains("p", /An email verification link has been sent to your email address/i).should("be.visible");
   });

   it("Should verify email", () => {
      cy.visit("/verify-email/123456789");

      cy.interceptPost("/auth/confirm-email", {
         message: "Verified",
      });

      //   On page load, it should start verifying the email address
      cy.getByTestId("loader").should("be.visible");
      cy.getByTestId("loading-message").should("be.visible");

      //   Display a success message after verification is complete
      cy.getByTestId("success-message");
   });
});
