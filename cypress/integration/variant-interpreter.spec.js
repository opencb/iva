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

context("Case Interpreter", () => {
    before(() => {
        login();
    })

    it("open a Case", () => {

        cy.get("a[data-id=clinicalAnalysisPortal]", {timeout: 60000}).click({force: true})

        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Case Review")
        cy.get(".login-overlay", {timeout: 60000}).should("be.not.visible");

        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container").find("tr[data-index]").should("have.length.gt", 1) //.should("be.gte", 1);

        cy.get("opencga-clinical-analysis-grid .bootstrap-table .fixed-table-container tr[data-index=0] td:nth-child(1) a").click() //FIXME
    })
})
