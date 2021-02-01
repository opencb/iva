/**
 * Copyright 2015-2016 OpenCB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {login, randomString, checkResults, waitTableResults} from "../plugins/utils.js";


context("Case Portal", () => {
    before(() => {
        login();
    });

    it("check query results", () => {
        cy.get("a[data-id=clinicalAnalysisPortal]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Case Portal");

        checkResults("opencga-clinical-analysis-grid");

        cy.get("div[data-cy='form-priority'] button").click();
        cy.get("div[data-cy='form-priority'] ul.dropdown-menu li").contains("URGENT").click({force: true});
        cy.get("div[data-cy='form-priority'] ul.dropdown-menu li").contains("HIGH").click({force: true});
        cy.get("div[data-cy='form-priority'] ul.dropdown-menu li").contains("MEDIUM").click({force: true});
        cy.get("div[data-cy='form-priority'] ul.dropdown-menu li").contains("LOW").click({force: true});
        cy.get("div[data-cy='form-priority'] ul.dropdown-menu li").contains("UNKNOWN").click({force: true});

        //waitTableResults("opencga-clinical-analysis-grid");
        checkResults("opencga-clinical-analysis-grid");

        // reading from the first row the case Id, the proband Id, and the Family Id and use them as filters
        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container tr[data-index=0]", {timeout: 60000})
            .find("td:nth-child(1) a[data-cy='case-id']")
            .then($a => {
                const caseId = $a.text().trim();
                cy.get("div[data-cy='form-case'] button").click();
                cy.get("div[data-cy='form-case'] input").type(caseId + "{enter}", {force: true});
                checkResults("opencga-clinical-analysis-grid");

            })

            .find("td:nth-child(2) span[data-cy='proband-id']")
            .then($div => {
                const probandId = $div.text().trim();
                console.log("probandId", probandId);
                cy.get("div[data-cy='form-proband'] button").click();
                cy.get("div[data-cy='form-proband'] input").type(probandId + "{enter}", {force: true});
                checkResults("opencga-clinical-analysis-grid");

            });

        // cy.get("opencga-clinical-review-cases .rhs button", {timeout: 60000}).should("be.visible").and("contain", "Clear").click()
        cy.get("button[data-cy='filter-button']").click({force: true});
        cy.get(".saved-filter-wrapper a").contains("Clear").click({force: true});

    });

    it("check Columns togglability", () => {
        cy.get("a[data-id=clinicalAnalysisPortal]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Case Portal");


        cy.get("opencga-clinical-analysis-grid .columns-toggle-wrapper button").should("be.visible").and("contain", "Columns").click();
        cy.get("opencga-clinical-analysis-grid .columns-toggle-wrapper ul li").should("have.length.gt", 1);


        cy.get("opencga-clinical-analysis-grid .columns-toggle-wrapper ul li a").click({multiple: true, timeout: 60000}); // deactivate all the columns
        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container tr[data-index=0]", {timeout: 60000}).find("td", {timeout: 60000}).should("have.lengthOf", 1);

        cy.get("opencga-clinical-analysis-grid .columns-toggle-wrapper ul li a").click({multiple: true, timeout: 60000}); // reactivate all the columns
        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container tr[data-index=0]", {timeout: 60000}).find("td", {timeout: 60000}).should("have.length.gt", 1);


    });

});

/* cy.get("variant-browser-grid .columns-toggle-wrapper ul li a").each(($li, index, $lis) => {
    //Cypress.$("a", $li)
});*/
