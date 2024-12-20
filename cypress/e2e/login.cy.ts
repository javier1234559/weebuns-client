/// <reference types="cypress" />

import { RouteNames } from '../support/constants'

describe('Login Form', () => {
  let testCredentials: {
    email: string
    password: string
  }

  before(() => {
    const email = Cypress.env('TEST_EMAIL')
    const password = Cypress.env('TEST_PASSWORD')

    if (!email || !password) {
      throw new Error('Missing test credentials in cypress.env.json')
    }

    testCredentials = { email, password }
  })

  beforeEach(() => {
    cy.visit(RouteNames.Login)
    cy.clearLocalStorage()
  })

  it('should display login form elements', () => {
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('input[name="rememberMe"]').should('exist')
    cy.contains('Remember me').should('be.visible')
    cy.contains('Forgot Password').should('be.visible')
    cy.contains('button', 'Login').should('be.visible')
  })

  it('should handle successful login', () => {
    cy.get('input[name="email"]').type(testCredentials.email)
    cy.get('input[name="password"]').type(testCredentials.password)
    cy.get('[data-test-id="login-btn"]').click()

    cy.contains('Successfully logged in').should('be.visible')
    cy.url().should('include', RouteNames.Dashboard)
  })

  // it('should handle failed login', () => {
  //   cy.intercept('POST', '/api/auth/login', {
  //     statusCode: 400,
  //     body: {
  //       message: 'Invalid credentials'
  //     }
  //   }).as('loginRequest')

  //   // Fill form with wrong password
  //   cy.get('input[name="email"]').type(testCredentials.email)
  //   cy.get('input[name="password"]').type('wrong-password')
  //   cy.get('[data-test-id="login-btn"]').click()

  //   // Wait for API call
  //   cy.wait('@loginRequest')

  //   // Verify error
  //   cy.contains('Login failed. Please try again.').should('be.visible')
  //   cy.url().should('include', RouteNames.Login)
  // })

  // it('should remember email when remember me is checked', () => {
  //   // Fill form with remember me
  //   cy.get('input[name="email"]').type(testCredentials.email)
  //   cy.get('input[name="password"]').type(testCredentials.password)
  //   cy.get('input[name="rememberMe"]').check()
  //   cy.get('[data-test-id="login-btn"]').click()

  //   // Reload page
  //   cy.reload()

  //   // Verify email is remembered
  //   cy.get('input[name="email"]').should('have.value', testCredentials.email)
  //   cy.get('input[name="rememberMe"]').should('be.checked')
  // })
})
