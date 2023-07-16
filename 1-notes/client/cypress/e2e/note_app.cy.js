describe('Note App', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    )
  })

  it('login form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()
  })
})
