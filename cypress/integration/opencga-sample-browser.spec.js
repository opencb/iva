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
    });

    it("query", () => {
        cy.get("a[data-id=sample]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Sample Browser");

        cy.get("opencga-sample-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1); // .should("be.gte", 1);

        cy.get("#somatic + .subsection-content label").contains("True").click({force: true});

        cy.get(".lhs button[data-filter-name]").should("have.length", 1);
        cy.get("div.search-button-wrapper button").click();

        cy.get(".lhs .somaticActiveFilter").click();
        cy.get(".lhs button[data-filter-name]").should("have.length", 0);

    });

    it("aggregated query", () => {
        cy.get("a[data-id=sample]").click({force: true});

        cy.get("a[href='#facet_tab']").click({force: true});
        cy.get("button.default-facets-button").click();
        cy.get("div.search-button-wrapper button").click();

        cy.get(".facet-wrapper .button-list button").should("have.length", 4);

        cy.get("opencb-facet-results opencga-facet-result-view").should("have.length", 4);

    });
});
