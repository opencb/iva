context("Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/src/#login")
    })

    it("login unsuccessful", () => {
        cy.get("#opencgaUser").type("demo2")
        cy.get("#opencgaPassword").type("demo2")
        cy.get("form#formLogin").submit()

        cy.get("#error").contains( "Incorrect user or password.")
    })

    it("login successful", () => {

        const username = Cypress.env("username")
        const password = Cypress.env("password")

        expect(username, "username was set").to.be.a("string").and.not.be.empty
        expect(password, "password was set").to.be.a("string").and.not.be.empty
        cy.get("#opencgaUser").type(username)
        cy.get("#opencgaPassword").type(password)
        cy.get("form#formLogin").submit()

        //cy.url().should("include", "#home")
        cy.get(".subtitle", {timeout: 60000}).contains( "Interactive Variant Analysis")
    })
})
