import { after, before, cy, Cypress, expect, it } from 'local-cypress';

describe('Creating a new user', () => {
  before(() => {
    cy.resetDb();
  });

  it('Displays first and last name on explore page after signing up', () => {
    cy.createTestUser();
    cy.contains('Welcome, John Doe').should('exist');
  });

  it('Displays an error when a user of the same email already exists', () => {
    cy.createTestUser();
    cy.contains('A user with this email already exists.').should('exist');
  });
});
