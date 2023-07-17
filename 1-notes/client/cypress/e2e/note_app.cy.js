describe('Note App', function () {
  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const userObj = {
      username: 'gavinoo',
      password: 'gavinoo',
      name: 'Gav',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, userObj)
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    )
  })

  it('login form can be opened', function () {
    cy.contains('sign in').click()
    cy.get('#username').type('gavinoo')
    cy.get('#password').type('gavinoo')
    cy.get('#login-button').click()

    cy.contains('Gav logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'gavinoo', password: 'gavinoo' })
    })

    it('a new note can be created', function () {
      cy.contains('create note').click()
      cy.get('#note-input').type('testing note')
      cy.get('#create-note-button').click()
      cy.contains('testing note')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'another cyprus test note', important: true })
      })

      it('can be made not important', function () {
        cy.contains('another cyprus test note').parent().find('button').as('impButton')
        cy.get('@impButton').contains('make not important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })

  it('login fails with wrong password', function () {
    cy.contains('sign in').click()
    cy.get('#username').type('gavinoo')
    cy.get('#password').type('wrongpass')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Gav logged in')
  })
})
