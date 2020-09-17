import {login} from "../plugins/utils.js";

context("Individual Browser", () => {
    before(() => {
        login();
    })

    it("query", () => {
        cy.get("a[data-id=families]", {timeout: 60000}).click({force: true})
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Family Browser")

        cy.get("opencga-family-grid .bootstrap-table .fixed-table-container").find("tr[data-index]").should("have.length.gte", 1) //.should("be.gte", 1);

    })

    it("aggregated query", () => {
        cy.get("a[data-id=families]").click({force: true})

        cy.get("a[href='#facet_tab']").click({force: true})
        cy.get("button.default-facets-button").click();
        cy.get(".facet-wrapper .button-list button").should("have.length.gte", 1);

    })
})
