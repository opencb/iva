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

import {login, checkResults, getResult} from "../plugins/utils.js";


context("7 - Sample Browser", () => {
    before(() => {
        login();
    });

    it("7.1 - query", () => {
        cy.get("a[data-id=sample]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Sample Browser");

        checkResults("opencga-sample-grid");

        getResult("opencga-sample-grid").then($text => {
            cy.get("sample-id-autocomplete input").type($text + "{enter}");
        });

        cy.get(".lhs button[data-filter-name]").should("have.length", 1);
        cy.get("div.search-button-wrapper button").click();
        checkResults("opencga-sample-grid");

        cy.get("#somatic + .subsection-content label").contains("True").click({force: true}); // setting filter Somatic = true

        cy.get("opencga-active-filters button[data-filter-name='id']").click();
        cy.get("opencga-active-filters button[data-filter-name='somatic']").click();
        cy.get(".lhs button[data-filter-name]").should("have.length", 0);

    });

    it("7.2 - aggregated query", () => {
        cy.get("a[data-id=sample]").click({force: true});
        cy.get("a[href='#facet_tab']").click({force: true});

        cy.get("button.default-facets-button").click();
        cy.get("div.search-button-wrapper button").click();
        cy.get(".facet-wrapper .button-list button").should("have.length", 4);
        cy.get("opencb-facet-results opencga-facet-result-view", {timeout: 60000}).should("have.length", 4);

    });
});
