import {login} from "../plugins/utils.js";
import "cypress-wait-until";

context("Case Portal", () => {
    before(() => {
        login();
    })

    it("query", () => {
        /*cy.waitUntil(() => cy.getCookie("iva_sid").then(cookie => {
            console.log("cookie", cookie)
            return Boolean(cookie && cookie.value)
        }));*/

        cy.get("a[data-id=clinicalAnalysisPortal]", {timeout: 60000}).click({force: true})

        //long timeout to make sure you are logged in
        cy.get("div.page-title h2").should("be.visible").and("contain", "Case Portal")

        //cy.get(".lhs button").should("have.length", 2)
        cy.get(".clearfix > .pull-left > .pagination-info", {timeout: 10000})
            .should("be.visible")
            //.should('contain', /Showing \d+ to \d+ of \d+ records/)
            //.and("contain", "Showing 1 to 10 of 18 records")


        cy.get("opencga-clinical-analysis-grid .success > :nth-child(1)").then(elem => {
            // elem is the underlying Javascript object targeted by the .get() command.
            const firstCase = Cypress.$(elem).text().trim();
            //opencga-clinical-analysis-view > data-form div:nth-child(1) > div.col-md-9
        });

    })
})
