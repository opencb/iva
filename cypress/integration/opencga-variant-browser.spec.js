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


import {login, randomString} from "../plugins/utils.js";

context("Variant Browser", () => {
    before(() => {
        login();
    });

    it("query", () => {
        cy.get("a[data-id=browser]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Variant Browser"); // should assertion comes from Chai and it follows its logic

        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1); // .should("be.gte", 1);

        cy.get("input#lof").click({force: true});
        cy.get("opencga-active-filters").contains("Consequence Types 10");
        cy.get("button.ctActiveFilter").click();
    });

    it("check Columns togglability", () => {
        cy.get("a[data-id=browser]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Variant Browser");

        cy.get("variant-browser-grid .columns-toggle-wrapper button").should("be.visible").and("contain", "Columns").click();
        cy.get("variant-browser-grid .columns-toggle-wrapper ul li").and("have.length.gt", 1);

        cy.get("variant-browser-grid .columns-toggle-wrapper ul li a").click({multiple: true, timeout: 60000}); // deactivate all the columns
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container tr[data-index=0]").find("td").should("have.lengthOf", 1);

        cy.get("variant-browser-grid .columns-toggle-wrapper ul li a").click({multiple: true, timeout: 60000}); // reactivate all the columns
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container tr[data-index=0]").find("td").should("have.length.gt", 1);

        /* cy.get("variant-browser-grid .columns-toggle-wrapper ul li a").each(($li, index, $lis) => {
            //Cypress.$("a", $li)
        });*/
    });

    it("aggregated query", () => {
        cy.get("a[data-id=browser]").click({force: true});
        cy.get("a[href='#facet_tab']").click({force: true});
        cy.get("button.default-facets-button").click();
        cy.get("div.search-button-wrapper button").click();

        // cy.wait(2000);

        cy.get("#bs-select-1-4").click({force: true}); // gene aggregation field
        cy.get("#type_Select a").contains("INSERTION").click({force: true});
        cy.get("div.search-button-wrapper button").click();

    });

    // TODO fix bugs
    /* it("check Filter controls", () => {
        cy.get("a[data-id=browser]", {timeout: 60000}).click({force: true})
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Variant Browser")

        cy.get("input#lof").click({force: true});
        cy.get("opencga-active-filters").contains("Consequence Types 10");

        cy.get("button[data-cy='filter-button']").click({force: true});
        //cy.get("ul.saved-filter-wrapper a").contains("Save filter...").click(); // it also works
        cy.get("ul.saved-filter-wrapper a[data-action='active-filter-save']").contains("Save filter...").click();

        let name = "A";
        cy.get("input[data-cy='modal-filter-name']").type(name); // TODO FIXME for some reason here isn't typed the whole `name` string.
        cy.get("input[data-cy='modal-filter-description']").type(randomString(3));
        cy.get("button[data-cy='modal-filter-save-button']").click(); //confirm save

        cy.get(".swal2-actions").contains(/Yes|OK/).click(); //dismiss notification (either new filter or overwrite a saved one)
        cy.get("button[data-cy='filter-button']").click();
        cy.get("ul.saved-filter-wrapper").contains(name);
        cy.get(`span.delete-filter-button[data-filter-id='${name}']`).click();
        cy.get(".swal2-title").contains("Are you sure?");
        cy.get(".swal2-confirm").click(); //confirm deletion action
        cy.get(".swal2-content").contains("Filter has been deleted"); // TODO FIXME this selector refers to the previous .swal2-title which has been detatched from DOM
        cy.get(".swal2-confirm").click(); //dismiss confirmation modal

        /!*cy.get(".swal2-title")
            .then($div => {
                console.log($div)
            })*!/

    })*/

/*    it("checks the links of the first row", () => {
        //cy.get('.menu-item').trigger('mouseover')
        cy.get("a[data-id=browser]", {timeout: 60000}).click({force: true})
        cy.get("button[data-id='table-tab']", {timeout: 60000}).click()

        //cy.get("variant-browser-grid .bootstrap-table .fixed-table-container tr[data-index=0]").find("td:nth-child(4) span").trigger('mouseover')
        //cy.get('.gene-tooltip').should('be.visible')

    })*/
});
