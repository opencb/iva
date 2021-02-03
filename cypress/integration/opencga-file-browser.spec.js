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

import {login, waitTableResults, getResult, checkResults} from "../plugins/utils.js";


context("10 - File Browser", () => {
    before(() => {
        login();
    });

    it("10.1 - query", () => {
        cy.get("a[data-id=file]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "File Browser");

        checkResults("opencga-file-grid");

        getResult("opencga-file-grid").then($text => {
            cy.get("file-name-autocomplete input").type($text + "{enter}");
        });

        cy.get(".lhs button[data-filter-name]").should("have.length", 1);

        cy.get("div.search-button-wrapper button").click();
        // waitTableResults("opencga-file-grid");
        checkResults("opencga-file-grid");

        cy.get("#format + .subsection-content a").contains("VCF").click({force: true});
        cy.get("#bioformat + .subsection-content a").contains("VARIANT").click({force: true});

        cy.get(".lhs button[data-filter-name]").should("have.length", 3);
        cy.get("div.search-button-wrapper button").click();

        // waitTableResults("opencga-file-grid");
        checkResults("opencga-file-grid");

    });

    it("10.2 - aggregated query", () => {
        cy.get("a[data-id=file]").click({force: true});
        cy.get("a[href='#facet_tab']").click({force: true});

        cy.get("facet-filter .facet-selector li a").contains("Creation Year").click({force: true}); // Creation Year selection
        cy.get("a[data-collapse=\"#creationYear_nested\"]").click({force: true});
        cy.get("#creationYear_nested select-field-filter div.dropdown-menu a").contains("Creation Month").click({force: true}); // Creation Month nested in year field

        cy.get("div.search-button-wrapper button").click();

        cy.get(".facet-wrapper .button-list button").should("have.length", 1);
        cy.get("opencb-facet-results opencga-facet-result-view", {timeout: 60000}).should("have.length", 1);

    });
});
