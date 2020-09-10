import {login} from "../plugins/utils.js";

context("Individual Browser", () => {
    before(() => {
        login();
    })

    it("query", () => {
        cy.get("a[data-id=individuals]", {timeout: 60000}).click({force: true})
        cy.get("div.page-title h2").should("be.visible").and("contain", "Individual Browser")

        cy.get("#sex + .subsection-content a").contains( "MALE").click({force: true})
        cy.get("#sex + .subsection-content a").contains( "FEMALE").click({force: true})

        cy.get("#date + .subsection-content input[data-tab=recent] + label").click(); //creationDate recent

        cy.get(".lhs button[data-filter-name]").should("have.length", 2);
        cy.get("div.search-button-wrapper button").click();

    })

    it("aggregated query", () => {
        cy.get("a[data-id=individuals]").click({force: true})

        cy.get("a[href='#facet_tab']").click({force: true})
        cy.get("button.default-facets-button").click();

        cy.get(".lhs button[data-filter-name]:nth-child(3)").click(); //remove creationDate

        cy.get("button.default-facets-button").click();

        //cy.get("div.search-button-wrapper button").click()

        //cy.get(".facet-wrapper .button-list button").should("have.length", 4);

        //cy.get("opencb-facet-results opencga-facet-result-view").should("have.length", 4);

    })
})
