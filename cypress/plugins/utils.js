export const login = () => {
    cy.visit("http://localhost:3000/src/#login")
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    cy.get("#opencgaUser").type(username)
    cy.get("#opencgaPassword").type(password)
    cy.get("form#formLogin").submit()
}
