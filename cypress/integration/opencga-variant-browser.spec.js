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

context("Variant Browser", () => {
    before(() => {
        login();
    })

    it("query", () => {
        cy.get("a[data-id=browser]", {timeout: 60000}).click({force: true})
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Variant Browser")

        cy.get("opencga-variant-grid .bootstrap-table .fixed-table-container").find("tr[data-index]").should("have.length.gt", 1) //.should("be.gte", 1);

        cy.get("input#lof").click({force: true});
        cy.get("opencga-active-filters").contains("Consequence Types 10");
        cy.get("button.ctActiveFilter").click();


    })

    it("aggregated query", () => {
        cy.get("a[data-id=browser]").click({force: true})
        cy.get("a[href='#facet_tab']").click({force: true})
        cy.get("button.default-facets-button").click()
        cy.get("div.search-button-wrapper button").click()

        cy.wait(2000);

        cy.get("#bs-select-1-4").click({force: true}) // gene aggregation field
        cy.get("#type_Select a").contains( "INSERTION").click({force: true})
        cy.get("div.search-button-wrapper button").click()

    })
})
