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
    cy.visit('/');
    cy.getCookie('sb-localhost-auth-token').should('exist');
    cy.contains('Welcome to PartyCraft!').should('exist');
    cy.contains('Logging in...').should('exist');
  });

  it('Displays an error if a user does not exist when authenticating', () => {
    cy.login('nouser@gmail.com', '111111');
    cy.url().should('not.include', '/dashboard');
    cy.contains('Invalid email or password').should('exist');
    cy.login('test@test.com', '111111');
    cy.contains('Invalid email or password').should('not.exist');
  });
});
