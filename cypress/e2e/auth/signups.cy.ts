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
    cy.contains('Guest').should('exist');
  });

  it('Persists the signup from the previous test', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Test future event').click();
    cy.contains('Guest').should('exist');
  });

  it('Removes your name after clicking the cancel signup button', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Test future event').click();
    cy.contains('Guest').should('exist');
    cy.contains('Cancel sign-up').should('exist');
    cy.contains('Cancel sign-up').click();
    cy.contains('test@test.com').should('not.exist');
  });

  it('Persists the delete from the previous test', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Test future event').click();
    cy.contains('test@test.com').should('not.exist');
  });

  it('Renders created events in "my events" route', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Test future event').should('exist');
    cy.visit('/dashboard/myevents');
    cy.contains('No events found.').should('not.exist'); // Ensures that loading completes before asserting
    cy.contains('Newly created event').should('not.exist'); // Test future event shouldnt have your own sign up at this point
    cy.createNewEvent();
    cy.contains('Newly created event').should('exist'); // Test future event shouldnt have your own sign up at this point
    cy.contains('Test future event').should('not.exist');

    cy.contains('Newly created event')
      .parent()
      .parent()
      .contains('Delete')
      .click();
    cy.contains('Continue').click();
  });

  it('Renders signed-up events in "my events" route', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Test future event').should('exist');
    cy.visit('/dashboard/myevents');
    cy.contains('No events found.').should('not.exist'); // Ensures that loading completes before asserting
    cy.contains('Test future event').should('not.exist'); // Test future event shouldnt have your own sign up at this point

    cy.visit('/dashboard/explore');
    cy.contains('Test future event').click();
    cy.contains('Sign up').click();
    cy.contains('Guest').should('exist');
    cy.visit('/dashboard/myevents');
    cy.contains('No events found.').should('not.exist'); // Ensures that loading completes before asserting
    cy.contains('Test future event').should('exist');

    cy.contains('Test future event').click();
    cy.contains('Cancel sign-up').click();
  });
});
