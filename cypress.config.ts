import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://localhost:3001',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
