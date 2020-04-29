context("Variant Browser", () => {
    beforeEach(() => {
       // cy.visit("http://localhost:3000/src/#login")
    })

    it("login", () => {

        /*cy.get("#loginButton").within(() => {
            // ends the current chain and yields null
            cy.contains("Login").click().end()
        })*/
        cy.visit("/#login")
        cy.get("#opencgaUser").type("demouser").should("have.value", "demouser")
        cy.get("#opencgaPassword").type("demouser{enter}").should("have.value", "demouser")
        //TODO add spy cy.server()
        cy.url().should("include", "#home")
        cy.get(".subtitle").should("have.value", "Interactive Variant Analysis")

        //cy.get("button[type=submit]").click()
    })
})
