describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:6006/?path=/story/vuenumber-nativeinput--basic-usage')
  })

  it('Does not do much!', () => {
    cy.get('[data-cy]').type('123.1111')
    expect(true).to.equal(true)
  })
})
