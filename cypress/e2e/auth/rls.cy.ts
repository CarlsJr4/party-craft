import { cy, Cypress, expect, it } from 'local-cypress';

// NOTE: These tests will only work if the server is working
// These tests actually interface with the local database
describe('Row level security', () => {
  // // Save this test for when you implement private events
  // it('Only returns events that the user owns', () => {
  //   cy.login('test@test.com', '111111');
  //   cy.contains('My Events').click();
  //   cy.contains('Test event 1').should('exist');
  //   cy.contains('Test event 3').should('not.exist'); // Test event 3 has a different owned_by column than the other two
  // });

  it('Persists a newly created event', () => {
    cy.login('test@test.com', '111111');
    cy.createNewEvent();
    cy.visit('/');
    cy.contains('Newly created event').should('exist');
  });

  it('Does not persist the deleted event', () => {
    cy.login('test@test.com', '111111');
    cy.contains('Delete').first().click();
    cy.contains('Continue').click();
    cy.visit('/');
    cy.contains('Newly created event').should('not.exist');
  });
  // it('Persists an edited event event', () => {});
});