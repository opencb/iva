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
        cy.get("a[data-id=file]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "File Browser");

        cy.get("opencga-file-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1); // .should("be.gte", 1);

        cy.get("#format + .subsection-content a").contains("VCF").click({force: true});
        cy.get("#bioformat + .subsection-content a").contains("VARIANT").click({force: true});

        cy.get(".lhs button[data-filter-name]").should("have.length", 2);

        // cy.get('.fixed-table-toolbar').find(".pagination-info", {log:true})
        cy.get("div.search-button-wrapper button").click();
    });

    it("aggregated query", () => {
        cy.get("a[data-id=file]").click({force: true});
        cy.get("a[href='#facet_tab']").click({force: true});
        // cy.get("div.search-button-wrapper button").click()

        // cy.wait(2000);

        cy.get("#bs-select-4-2").click({force: true}); // creation year field
        cy.get("a[data-collapse=\"#creationYear_nested\"]").click({force: true}); // creation y field
        cy.get("#bs-select-7-3").click({force: true}); // creation month nested in year field
        cy.get("div.search-button-wrapper button").click();

    });
});
