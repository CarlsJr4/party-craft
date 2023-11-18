describe('The login page', () => {
  // This takes a long time. Only use it if you really need it
  // beforeEach(() => {
  //   cy.exec('npx supabase db reset');
  // });

  it('Successfully loads', () => {
    cy.visit('/');
  });

  it('Successfully logs in', () => {
    cy.login('test@test.com', '111111');
  });
});
