describe('Login', () => {
  it('passes', () => {
     cy.visit('/login')
      // 3 different login flows (parent, student & techers)
      // check if login page is displayed correctly
      // try to login without all inputs filled and validate error message
      // try to login with incoorect parameters
      // login in with correct parameters for all three user types and validate redirection to the correct page
  })
});
export{}