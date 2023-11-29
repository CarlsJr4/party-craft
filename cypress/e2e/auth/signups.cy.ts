import { cy, Cypress, expect, it } from 'local-cypress';

describe('event signups', () => {
  it('Does not render sign up and cancel sign up at the same time', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Test future event').click();
    cy.contains('Sign up').should('exist');
    cy.contains('Cancel sign-up').should('not.exist');

    cy.contains('Sign up').click();

    cy.contains('Sign up').should('not.exist');
    cy.contains('Cancel sign-up').should('exist');
  });

  it('Displays your name after a successful signup', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Test future event').click();
    cy.contains('Sign up').click();
    cy.contains('test@test.com').should('exist');
  });

  it('Persists the signup from the previous test', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Test future event').click();
    cy.contains('test@test.com').should('exist');
  });

  it('Removes your name after clicking the cancel signup button', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Test future event').click();
    cy.contains('test@test.com').should('exist');
    cy.contains('Cancel sign-up').should('exist');
    cy.contains('Cancel sign-up').click();
    cy.contains('test@test.com').should('not.exist');
  });

  it('Persists the delete from the previous test', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Test future event').click();
    cy.contains('test@test.com').should('not.exist');
  });
});
