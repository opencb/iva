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

context("Individual Browser", () => {
    before(() => {
        login();
    });

    it("query", () => {
        cy.get("a[data-id=family]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Family Browser");

        cy.get("opencga-family-grid .bootstrap-table .fixed-table-container").find("tr[data-index]").should("have.length.gte", 1); // .should("be.gte", 1);

    });

    it("aggregated query", () => {
        cy.get("a[data-id=families]").click({force: true});

        cy.get("a[href='#facet_tab']").click({force: true});
        cy.get("button.default-facets-button").click();
        cy.get(".facet-wrapper .button-list button").should("have.length.gte", 1);

    });
});
