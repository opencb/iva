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

import {login, checkResultsOrNot} from "../plugins/utils.js";


/**
 * Header bar (post-login)
 */
context("Header bar (post-login): Checks each menu item in header-bar resolves correctly", () => {
    before(() => {
        login();
    });

    it("checks Variant Browser menu item", () => {
        cy.get("a[data-id=browser]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Variant Browser"); // should assertion comes from Chai and it follows its logic
        checkResultsOrNot("variant-browser-grid");

    });

    it("checks Case Portal menu item", () => {
        cy.get("a[data-id=clinicalAnalysisPortal]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Case Portal");
        checkResultsOrNot("opencga-clinical-analysis-grid");
    });

    it("checks Sample Browser menu item", () => {
        cy.get("a[data-id=sample]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Sample Browser");
        checkResultsOrNot("opencga-sample-grid");
    });

    it("checks Individual Browser menu item", () => {
        cy.get("a[data-id=individual]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Individual Browser"); // should assertion comes from Chai and it follows its logic
        checkResultsOrNot("opencga-individual-grid");

    });

    it("checks Family Browser menu item", () => {
        cy.get("a[data-id=family]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Family Browser"); // should assertion comes from Chai and it follows its logic
        checkResultsOrNot("opencga-family-grid");
    });

    it("checks study selector menu items", () => {
        // switching between all the studies
        cy.get("a[data-study]").each(($el, index, $list) => {
            const study = $el.data("study");
            const studyName = $el.data("study-name");
            const project = $el.data("project");
            cy.get(`a[data-study='${study}'][data-project=${project}]`).click({force: true});
            cy.get("a[data-cy='active-study']").should("be.visible").and("contain", studyName).and("contain", project);
        });
    });

    it("checks User menu items", () => {
        cy.get("li[data-cy='user-menu'] > a").click();
        cy.get("a[data-user-menu='account']").click();
        cy.get("div.page-title h2").should("be.visible").and("contain", "Your profile");

        cy.get("li[data-cy='user-menu'] > a").click();
        cy.get("a[data-user-menu='logout']").click();

    });
});
