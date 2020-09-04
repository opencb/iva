import {login} from "../plugins/utils.js";

context("File Browser", () => {
    before(() => {
        login();
        cy.wait(7000);
    })

    it("query", () => {
        cy.get("a[data-id=files]").click({force: true})
        //cy.get("#bs-select-25-0").click({force: true});
        cy.get("#format + .subsection-content a").contains( "VCF").click({force: true})

        cy.get(".pagination-info").contains(new RegExp("Showing \d+ to \d+ of \d+ records"))
        //cy.get(".pagination-info")
        //expect(username, "username was set").to.be.equal("string").and.not.be.empty

        cy.get("div.search-button-wrapper button").click()
    })
/*
    it("aggregated query", () => {
        cy.get("a[data-id=browser]").click({force: true})
        cy.get("a[href='#facet_tab']").click({force: true})
        cy.get("button.detail-facets-button").click()
        cy.get("div.search-button-wrapper button").click()

        cy.wait(2000);

        cy.get("#bs-select-1-4").click({force: true}) // gene aggregation field
        cy.get("#type_Select a").contains( "INSERTION").click({force: true})
        cy.get("div.search-button-wrapper button").click()

    })*/
})
