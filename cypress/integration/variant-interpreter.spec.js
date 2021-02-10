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

import {login, waitTableResults} from "../plugins/utils.js";


context("Case Interpreter", () => {
    before(() => {
        login();
    });

    it("open a Case", () => {

        cy.get("a[data-id=clinicalAnalysisPortal]", {timeout: 60000}).click({force: true});

        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Case Portal");
        cy.get(".login-overlay", {timeout: 60000}).should("not.exist");

        waitTableResults("opencga-clinical-analysis-grid");

        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container").find("tr[data-index]").should("have.length.gt", 1); // .should("be.gte", 1);
        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container tr[data-index=0] a[data-cy=case-id]").click(); // FIXME
    });
});
