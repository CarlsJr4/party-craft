import { cy, Cypress, expect, it } from 'local-cypress';

describe('protected routes', () => {
  it('Redirects user to login page if accessing dashboard with no session', () => {
    cy.visit('/dashboard/explore');
    cy.getCookie('sb-localhost-auth-token').should('not.exist');
    cy.contains('Email:').should('exist');
  });

  it('Redirects user to login page if accessing event with no session', () => {
    cy.visit('/dashboard/event/385a0208-193f-5ece-8a97-b78aa8c9cea8');
    cy.getCookie('sb-localhost-auth-token').should('not.exist');
    cy.contains('Email:').should('exist');
  });
});
