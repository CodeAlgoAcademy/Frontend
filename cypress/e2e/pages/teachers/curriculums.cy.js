describe("Curriculum", () => {
   beforeEach(() => {
      cy.setStorage("Teacher");
      cy.visit("/teachers/curriculum");
      cy.interceptGet("/academics/class", "teachers/classes.json");
   });
   it("Add unit flow", () => {
      cy.interceptGet("/academics/curriculums/units/", "teachers/curriculums.json");

      cy.contains(/add unit/i).click();
      cy.getByTestId("add-unit-modal").should("be.visible");
   });
});
