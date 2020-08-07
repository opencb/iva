context("Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/src/#login")
    })

    it("login unsuccessful", () => {
        cy.get("#opencgaUser").type("demo")
        cy.get("#opencgaPassword").type("demo")
        cy.get("form#formLogin").submit()

        cy.get("#error").contains( "Incorrect user or password.")
    })

    it("login uccessful", () => {

        const username = Cypress.env("username")
        const password = Cypress.env("password")

        console.log("username", username)
        console.log("password", password)

        expect(username, "username was set").to.be.a("string").and.not.be.empty
        expect(password, "password was set").to.be.a("string").and.not.be.empty
        cy.get("#opencgaUser").type(username)
        cy.get("#opencgaPassword").type(password)
        cy.get("form#formLogin").submit()

        cy.url().should("include", "#home")
        cy.get(".subtitle").contains( "Interactive Variant Analysis")
    })
})
