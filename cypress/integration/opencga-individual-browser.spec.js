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


import {login, checkResults} from "../plugins/utils.js";

context("Individual Browser", () => {
    before(() => {
        login();
    });

    it("query", () => {
        cy.get("a[data-id=individual]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Individual Browser");

        checkResults("opencga-individual-grid");

        // FIXME
        cy.get("opencga-individual-grid table", {timeout: 60000}).find(`tr[data-index=0] > :nth-child(1)`, {timeout: 60000}).then($td => { 
            cy.get("individual-id-autocomplete").find("input[name=sample]").then($input => {
                cy.wrap($input.first()).type($td.text().trim() + "{enter}");
            })
            
        });

        cy.get("#sex + .subsection-content a").contains("MALE").click({force: true}); // query: sex=MALE
        cy.get("#sex + .subsection-content a").contains("FEMALE").click({force: true}); // query: sex=FEMALE

        cy.get("#date + .subsection-content input[data-tab=recent] + label").click(); // query: creationDate recent

        cy.get(".lhs button[data-filter-name]").should("have.length", 2);
        cy.get("div.search-button-wrapper button").click();

    });

   
    it("aggregated query", () => {
        cy.get("a[data-id=individual]").click({force: true});
        cy.get("a[href='#facet_tab']").click({force: true});

        cy.get("a[data-id=sample]").click({force: true});
        cy.get("button.default-facets-button").click();
        cy.get("div.search-button-wrapper button").click();

        cy.get(".facet-wrapper .button-list button").should("have.length", 4);

        cy.get("opencb-facet-results opencga-facet-result-view").should("have.length", 4);
    });

});