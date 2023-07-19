// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
Cypress.Commands.add("login", ({ username, password }) => {
  cy.get("input[name='username']").type(username)
  cy.get("input[name='password']").type(password)
  cy.get("[data-cy='login-btn']").click()
})

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.get("input[name='title']").type(title)
  cy.get("input[name='author']").type(author)
  cy.get("input[name='url']").type(url)
  cy.get("[data-cy='create-btn']").click()
})

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
