export {};
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      createTestUser(): Chainable<void>;
      createNewEvent(): Chainable<void>;
      resetDb(): Chainable<void>;
    }
  }
}
