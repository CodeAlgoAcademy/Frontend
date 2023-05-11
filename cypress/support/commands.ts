/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import React from "react";
const uuid = require("uuid");

Cypress.Commands.add("getByTestId" as any, (id) => {
   cy.get(`[data-testid="${id}"]`);
});

Cypress.Commands.add("interceptPost" as any, (route, reply) => {
   cy.intercept("POST", `https://sea-lion-app-43ury.ondigitalocean.app${route}`, reply as any);
});

Cypress.Commands.add("interceptPatch" as any, (route, reply) => {
   cy.intercept("PATCH", `https://sea-lion-app-43ury.ondigitalocean.app${route}`, reply as any);
});

Cypress.Commands.add("interceptGet" as any, (route, fixture) => {
   cy.intercept("GET", `https://sea-lion-app-43ury.ondigitalocean.app${route}`, {
      fixture,
   });
});

Cypress.Commands.add("login" as any, (email, password, accountType) => {
   cy.intercept("POST", `https://sea-lion-app-43ury.ondigitalocean.app/auth/login`, {
      access_token: uuid.v4(),
      user: {
         firstname: "Firstname",
         lastname: "Lastname",
         is_teacher: accountType === "Teacher",
         is_parent: accountType === "Parent",
         email,
      },
   });

   cy.get(`[type="email"]`).type("useremail@gmail.com");
   cy.get(`[type="password"]`).type("123456789");
});

Cypress.Commands.add("register" as any, (data, accountType) => {
   cy.intercept("POST", `https://sea-lion-app-43ury.ondigitalocean.app/auth/registration`, {
      message: "Verification Email Sent",
   });
});

/**
 * setStorage is used to store the user token in localStorage
 */

Cypress.Commands.add("setStorage" as any, (accountType) => {
   const value = {
      access_token: uuid.v4(),
      user: {
         firstname: "Firstname",
         lastname: "Lastname",
         is_teacher: accountType === "Teacher",
         is_parent: accountType === "Parent",
         email: "user@email.com",
      },
      user_type: (accountType as string).toLowerCase(),
   };
   cy.window().then((slug) => {
      slug.localStorage.setItem("token" as string, JSON.stringify(value));
      slug.localStorage.setItem("token_timestamp", "" + Date.now());
   });
});

// General stuffs
Cypress.Commands.add("getClasses" as any, () => {
   (cy as any).interceptGet("/academics/class", "teachers/classes.json");
});
