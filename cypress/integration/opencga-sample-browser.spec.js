import {login} from "../plugins/utils.js";

context("File Browser", () => {
    before(() => {
        login();
    })

    it("query", () => {
        cy.get("a[data-id=samples]").click({force: true})
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Sample Browser")

        cy.get("#somatic + .subsection-content label").contains( "True").click({force: true})

        cy.get(".lhs button[data-filter-name]").should("have.length", 1);
        cy.get("div.search-button-wrapper button").click();

        cy.get(".lhs .somaticActiveFilter").click();
        cy.get(".lhs button[data-filter-name]").should("have.length", 0);

    })

    it("aggregated query", () => {
        cy.get("a[data-id=samples]").click({force: true})

        cy.get("a[href='#facet_tab']").click({force: true})
        cy.get("button.default-facets-button").click()
        cy.get("div.search-button-wrapper button").click()

        cy.get(".facet-wrapper .button-list button").should("have.length", 4);

        cy.get("opencb-facet-results opencga-facet-result-view").should("have.length", 4);

    })
})
