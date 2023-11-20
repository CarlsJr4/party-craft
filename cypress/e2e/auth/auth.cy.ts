describe('The login page', () => {
  // This takes a long time. Only use it if you really need it
  // beforeEach(() => {
  //   cy.exec('npx supabase db reset');
  // });

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
    cy.contains('Upcoming').should('exist');
    cy.visit('/');
    cy.contains('Upcoming').should('exist'); // We get taken back to the dashboard immediately because middleware
  });

  it('Displays an error if a user does not exist when authenticating', () => {
    cy.login('nouser@gmail.com', '111111');
    cy.url().should('not.include', '/dashboard');
    cy.contains('Invalid email or password').should('exist');
    cy.login('test@test.com', '111111');
    cy.contains('Invalid email or password').should('not.exist');
  });
});

describe('protected routes', () => {
  it('Redirects user to login page if accessing dashboard with no session', () => {
    cy.visit('/dashboard/upcoming');
    cy.getCookie('sb-localhost-auth-token').should('not.exist');
    cy.contains('Email:').should('exist');
  });

  it('Redirects user to login page if accessing event with no session', () => {
    cy.visit('/dashboard/event/385a0208-193f-5ece-8a97-b78aa8c9cea8');
    cy.getCookie('sb-localhost-auth-token').should('not.exist');
    cy.contains('Email:').should('exist');
  });
});
