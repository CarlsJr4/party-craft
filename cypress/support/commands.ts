/// <reference types="cypress" />
import { cy, Cypress, expect, it } from 'local-cypress';
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

Cypress.Commands.addAll({
  login(username: string, password: string) {
    cy.visit('/');
    cy.get('input[name=email]').type(username);
    cy.get('input[name=password]').type(`${password}{enter}`, { log: false });
  },
  createNewEvent() {
    cy.contains('Create New +').click();
    cy.get('input[name="eventname"]').click().type('Newly created event');
    cy.get('textarea[name="eventdesc"]')
      .click()
      .type('Newly created event desc');
    cy.contains('Pick a date').click();
    const dayNumber = new Date().getDate() + 1;
    cy.contains('button[name="day"]:not([disabled])', dayNumber).click();
    cy.contains('Submit').click();
  },
  resetDb() {
    cy.task('resetDatabase');
  },
});
