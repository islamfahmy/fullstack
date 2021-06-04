 /* describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user ={
    	name :'eshta',
    	username :'eshta',
    	password :'eshta'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
  })
  it.only('Login with wrong credentials',function(){
    cy.contains('log in').click()
     cy.get('#username').type('kok')
    cy.get('#password').type('kok')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
  
  })
  it('Login with right credentials',function(){
    cy.contains('log in').click()
     cy.get('#username').type('eshta')
    cy.get('#password').type('eshta')
    cy.get('#login-button').click()
  
  })

})*/
  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user ={
    	name :'eshta',
    	username :'eshta',
    	password :'eshta'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'eshta', password: 'eshta'
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
    })
      cy.visit('http://localhost:3000')
        cy.contains('log in').click()
     cy.get('#username').type('eshta')
    cy.get('#password').type('eshta')
    cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
    	cy.get('#add_blog').click()
    	cy.get('#title').type('eshta')
    	cy.get('#author').type('eshta')
    	cy.get('#url').type('eshta')
    	cy.get('#add_bloge').click()
        cy.wait(7000)
    	cy.contains('eshta')
    })
    it('like blog', function() {
    	cy.get('#add_blog').click()
    	cy.get('#title').type('eshta')
    	cy.get('#author').type('eshta')
    	cy.get('#url').type('eshta')
    	cy.get('#add_bloge').click()
    	cy.wait(7000)
    	cy.contains('show').parent().find('button').click()
    	cy.contains('like').parent().find('button').click()
    	cy.contains("likes:1")
    })
    it('delete blog', function() {
    	cy.get('#add_blog').click()
    	cy.get('#title').type('eshta')
    	cy.get('#author').type('eshta')
    	cy.get('#url').type('eshta')
    	cy.get('#add_bloge').click()
    	cy.wait(7000)
    	cy.contains('show').parent().find('button').click()
    	cy.contains('delete').parent().find('button').click()
    	cy.wait(7000)
    	cy.contains('eshta').should('not.exist')
    })
    it.only('likes order',function() 
    {
    	cy.get('#add_blog').click()
    	cy.get('#title').type('eshta')
    	cy.get('#author').type('eshta')
    	cy.get('#url').type('eshta')
    	cy.get('#add_bloge').click()
    	cy.wait(7000)
    	cy.contains('show').parent().find('button').click()
    	cy.get('span').contains('0')
    })
  })

