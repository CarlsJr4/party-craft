import { before, cy, Cypress, expect, it } from 'local-cypress';

describe('The login page', () => {
  before(() => {
    cy.resetDb();
    cy.createTestUser();
    cy.contains('Welcome, John Doe').should('exist');
    cy.contains('Logout').click();
  });

  it('Successfully logs in', () => {
    cy.login('test@test.com', '111111');
    cy.url().should('include', '/dashboard');
    cy.getCookie('sb-localhost-auth-token').should('exist');
  });

  it('Successfully logs out', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Logout').click();
    cy.url().should('not.include', '/dashboard');
    cy.getCookie('sb-localhost-auth-token').should('not.exist');
  });

  it('Redirects user to dashboard if there is already a session', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Explore').should('exist');
    cy.visit('/');
    cy.contains('Explore').should('exist'); // We get taken back to the dashboard immediately because middleware
  });

  it('Displays an error if a user does not exist when authenticating', () => {
    cy.login('nouser@gmail.com', '111111');
    cy.url().should('not.include', '/dashboard');
    cy.contains('Invalid email or password').should('exist');
    cy.login('test@test.com', '111111');
    cy.contains('Invalid email or password').should('not.exist');
  });
});
