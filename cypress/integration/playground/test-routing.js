context("Variant Browser", () => {
    beforeEach(() => {
        // cy.visit("http://localhost:3000/src/#login")
    })

    it("login", () => {

        /*cy.get("#loginButton").within(() => {
            // ends the current chain and yields null
            cy.contains("Login").click().end()
        })*/
        cy.visit("http://localhost:3000/src/test-routing.html")
        cy.get("#about-menu").click()

    })
})
