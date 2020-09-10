import {login} from "../plugins/utils.js";

context("File Browser", () => {
    before(() => {
        login();
    })

    it("query", () => {
        cy.get("a[data-id=files]", {timeout: 60000}).click({force: true})
        cy.get("div.page-title h2").should("be.visible").and("contain", "File Browser")

        cy.get("#format + .subsection-content a").contains( "VCF").click({force: true})
        cy.get("#bioformat + .subsection-content a").contains( "VARIANT").click({force: true})

        cy.get(".lhs button[data-filter-name]").should("have.length", 2)

        //cy.get('.fixed-table-toolbar').find(".pagination-info", {log:true})
        cy.get("div.search-button-wrapper button").click()
    })

    it("aggregated query", () => {
        cy.get("a[data-id=files]").click({force: true})
        cy.get("a[href='#facet_tab']").click({force: true})
        //cy.get("div.search-button-wrapper button").click()

        //cy.wait(2000);

        cy.get("#bs-select-4-2").click({force: true}) // creation year field
        cy.get(`a[data-collapse="#creationYear_nested"]`).click({force: true}) // creation y field
        cy.get("#bs-select-7-3").click({force: true}) // creation month nested in year field
        cy.get("div.search-button-wrapper button").click()

    })
})
