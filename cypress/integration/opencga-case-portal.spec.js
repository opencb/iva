/*
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


import {login} from "../plugins/utils.js";

context("File Browser", () => {
    before(() => {
        login();
    })

    it("check query results", () => {
        cy.get("a[data-id=clinicalAnalysisPortal]", {timeout: 60000}).click({force: true})
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Case Portal")


        cy.get("div[data-cy='form-priority'] select").select(["Urgent", "High", "Medium", "Low"],{force: true}); //check all priorities
        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container").find("tr[data-index]").should("have.length.gt", 1) //.should("be.gte", 1);

        //cy.get("input[data-id=case]").type("")

        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container tr[data-index=0]")
            .find("td:nth-child(1)")
            .then($div => {
                const caseId = $div.text().trim()
                cy.get("div[data-cy='form-case'] button").click()
                cy.get("div[data-cy='form-case'] input").type(caseId + "{enter}",{force: true})
                cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container").find("tr[data-index]").should("have.length.gte", 1) //.should("be.gte", 1);

            })
            .find("td:nth-child(2)")
            .then($div => {
                const probandId = $div.text().trim()
                console.log("probandId", probandId)
                cy.get("div[data-cy='form-proband'] button").click()
                cy.get("div[data-cy='form-proband'] input").type(probandId + "{enter}",{force: true})
                cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container").find("tr[data-index]").should("have.length.gte", 1) //.should("be.gte", 1);

            })
            .find("td:nth-child(3)")
            .then($div => {
                const sampleId = $div.html().trim().split("<br>")[0]
                cy.get("div[data-cy='form-sample'] button").click()
                cy.get("div[data-cy='form-sample'] input").type(sampleId + "{enter}",{force: true})
                cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container").find("tr[data-index]").should("have.length.gte", 1) //.should("be.gte", 1);
            })

        //cy.get("opencga-clinical-review-cases .rhs button", {timeout: 60000}).should("be.visible").and("contain", "Clear").click()

    })

})
