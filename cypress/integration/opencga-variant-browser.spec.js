import {login} from "../plugins/utils.js";

context("Variant Browser", () => {
    before(() => {
        login();
        cy.wait(7000);
    })

    it("query", () => {
        cy.get("a[data-id=browser]").click({force: true})

       cy.get("div.page-title h2").contains("Variant Browser")

        cy.get("input#lof").click({force: true});
        cy.get("opencga-active-filters").contains("Consequence Types 10")
        cy.get("button.ctActiveFilter").click()
    })

    it("aggregated query", () => {
        cy.get("a[data-id=browser]").click({force: true})
        cy.get("a[href='#facet_tab']").click({force: true})
        cy.get("button.default-facets-button").click()
        cy.get("div.search-button-wrapper button").click()

        cy.wait(2000);

        cy.get("#bs-select-1-4").click({force: true}) // gene aggregation field
        cy.get("#type_Select a").contains( "INSERTION").click({force: true})
        cy.get("div.search-button-wrapper button").click()

    })
})
