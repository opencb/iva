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

import {login, waitTableResults, getResult, checkResults, checkResultsOrNot} from "../plugins/utils.js";


context("14 - RGA Browser", () => {
    before(() => {
        login();
    });

    it("14.1 - Gene View", () => {
        cy.get("a[data-id=rga]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Recessive Variant Browser");

        cy.get("opencga-active-filters button[data-filter-name='geneName']").click();

        waitTableResults("rga-gene-grid");
        checkResults("rga-gene-grid");

        let geneName;
        getResult("rga-gene-grid", 1).then($text => {
            geneName = $text;
            console.log("geneName i", geneName);
            cy.get("feature-filter input[type='text']").type(geneName + "22{enter}");
            cy.get("div.search-button-wrapper button").click();
            checkResults("rga-gene-grid");
        });

        // set numParents=0
        cy.get("section-filter#Confidence .magic-checkbox-wrapper > :nth-child(1) > label").click();
        cy.get("div.search-button-wrapper button").click();
        waitTableResults("rga-gene-grid");
        checkResults("rga-gene-grid");

    });

    /* it("14.2 - Individual View", () => {
        cy.get("a[data-id=rga]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Recessive Variant Browser");

        cy.get("button[data-tab-id='individual-tab']", {timeout: 60000}).click({force: true});

        waitTableResults("rga-individual-grid");
        checkResults("rga-individual-grid");

        let individualId;
        getResult("rga-individual-grid", 2, 0).then($text => {
            individualId = $text;
            console.error("individual", individualId)

            checkResults("rga-individual-grid");
        });
    });*/

    it("14.3 - Variant View", () => {

    });
});
