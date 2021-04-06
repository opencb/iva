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

import {login, randomString, checkResults, checkExactResult, checkResultsOrNot, waitTableResults} from "../plugins/utils.js";


context("6 - Case Interpreter", () => {
    before(() => {
        login();
    });

    it("6.1 - check query results", () => {
        let caseId;

        cy.get("a[data-id=clinicalAnalysisPortal]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Case Portal");

        checkResults("opencga-clinical-analysis-grid");

        // reading from the first row the case Id, the proband Id, and the Family Id and use them as filters
        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container tr[data-index=0]", {timeout: 60000})
            .find("td:nth-child(1) a[data-cy='case-id']", {timeout: 60000})
            .then($a => {
                caseId = $a.text().trim();
                cy.get("div[data-cy='form-case'] button").click();
                cy.get("div[data-cy='form-case'] input").type(caseId + "{enter}", {force: true});
                checkResultsOrNot("opencga-clinical-analysis-grid");
            });

        checkExactResult("opencga-clinical-analysis-grid");

        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container tr[data-index=0]", {timeout: 60000}).find("td:nth-child(1) a[data-cy='case-id']", {timeout: 60000}).click();

        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Case Interpreter");


    });


});

