describe('Blog List', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'testy_mctestface',
      name: 'Test',
      password: 'test'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testy_mctestface')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with incorrect credentails', function() {
      cy.get('#username').type('testy_mctestface')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })

    it('error alert is red', function() {
      cy.get('#username').type('testy_mctestface')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testy_mctestface', password: 'test' })
      cy.createBlog({ title: 'Test Post', author: 'Testy McTestFace', url: 'http://www.test.com' })
    })

    it('A blog can be created', function() {
      cy.contains('Test Post')
    })

    it('A blog can be liked', function() {
      cy.get('.view-button').click()
      cy.get('.like-button').click()
      cy.contains('1')
    })

    it('A blog can be deleted by the user who created it', function() {
      cy.get('.view-button').click()
      cy.get('.remove-button').click()
      cy.should('not.contain', 'Test Post')
    })

    it('Blogs are ordered according to most liked', function() {
      cy.createBlog({ title: 'Test Post 1', author: 'Testy McTestFace', url: 'http://www.test.com', likes: 32 })
      cy.createBlog({ title: 'Test Post 2', author: 'Testy McTestFace', url: 'http://www.test.com', likes: 20 })
      cy.createBlog({ title: 'Test Post 3', author: 'Testy McTestFace', url: 'http://www.test.com', likes: 45 })
      cy.get('.unexpanded').then((blogs) => {
        cy.get(blogs[0]).should('contain', 'Test Post 3')
        cy.get(blogs[2]).should('contain', 'Test Post 2')
      })
    })
  })
})