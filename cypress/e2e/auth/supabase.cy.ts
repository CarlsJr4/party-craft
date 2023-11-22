import { cy, Cypress, expect, it } from 'local-cypress';

describe('Row level security', () => {
  it('Only returns events that the user owns', () => {
    cy.login('test@test.com', '111111');
    cy.contains('My Events').click();
    cy.contains('Test event 1').should('exist');
    cy.contains('Test event 3').should('not.exist'); // Test event 3 has a different owned_by column than the other two
  });
});
