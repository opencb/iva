import {login} from "../plugins/utils.js"

context("Variant Browser", () => {
    beforeEach(() => {


    })

    it("query", () => {
        login();
        cy.get("a[data-id=browser]").click({force: true})
        cy.get("input#lof").click({force: true});

        cy.get("opencga-active-filters").contains("Consequence Types 10")
    })
})
