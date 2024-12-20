import { RouteNames, MESSAGES, TEST_IDS } from '../support/constants'

describe('Login with Google', () => {
  let testCredentials: {
    email: string
    password: string
  }

  before(() => {
    const email = Cypress.env('GOOGLE_TEST_EMAIL')
    const password = Cypress.env('GOOGLE_TEST_PASSWORD')

    if (!email || !password) {
      throw new Error('Missing test credentials in cypress.env.json')
    }

    testCredentials = { email, password }
  })

  beforeEach(() => {
    cy.visit(RouteNames.Login)
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('should display Google login button', () => {
    cy.get(`[data-testid="${TEST_IDS.GOOGLE_BTN}"]`)
      .should('exist')
      .and('be.visible')
      .and('contain', 'Login with Google')
      .and('not.be.disabled')
  })

  it('should handle successful Google login', () => {
    cy.get(`[data-testid="${TEST_IDS.GOOGLE_BTN}"]`).click()

    cy.origin('https://accounts.google.com', { args: { testCredentials } }, ({ testCredentials }) => {
      cy.log('Starting Google login flow...')

      cy.wait(2000)

      cy.get('input[type="email"]', { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type('test@gmail.com', { force: true })

      cy.get('input[type="email"]').then(($el) => {
        cy.log('Input value after typing:', $el.val())
      })

      cy.contains('Next').click()

      cy.get('input[type="password"]', { timeout: 10000 })
        .should('be.visible')
        .clear()
        .type('password123', { force: true })

      cy.get('#passwordNext')
        .click()
        .then(() => {
          cy.log('Clicked password next button')
        })
    })

    cy.url().should('include', RouteNames.Dashboard)
  })
})
