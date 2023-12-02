import { defineConfig } from 'cypress';
import { execSync } from 'child_process';

function resetDb() {
  console.log(`Resetting database...`);

  try {
    execSync('npm run supabase:db:reset');

    console.log(`DB reset successful`);

    return true;
  } catch (error) {
    console.error(`DB reset failed`, error);
  }

  return false;
}

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        resetDatabase() {
          return resetDb();
        },
      });
    },
    baseUrl: 'http://localhost:3000',
  },
});
