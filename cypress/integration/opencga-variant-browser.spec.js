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
    it("check Saved Filter actions", () => {
        cy.get("a[data-id=browser]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Variant Browser");

        cy.get("input[value*=LoF]").click({force: true});
        cy.get("opencga-active-filters").contains("Consequence Types 10");

        cy.get("button[data-cy='filter-button']").click({force: true});
        // cy.get("ul.saved-filter-wrapper a").contains("Save filter...").click(); // it also works
        cy.get("ul.saved-filter-wrapper a[data-action='active-filter-save']").contains("Save filter...").click();

        const name = randomString(5);
        // cy.get("input[data-cy='modal-filter-name']").type(name); // TODO Cypress doesn't type the entire string. https://github.com/cypress-io/cypress/issues/5480  invoke("val") is a workaround
        cy.get("input[data-cy='modal-filter-name']").invoke("val", name);
        cy.get("input[data-cy='modal-filter-description']").type(randomString(3));
        cy.get("button[data-cy='modal-filter-save-button']").click(); // confirm save

        cy.get(".swal2-actions").contains(/Yes|OK/).click(); // dismiss notification (either new filter or overwrite a saved one)
        cy.get("button[data-cy='filter-button']").click();
        cy.get("ul.saved-filter-wrapper").contains(name);
        cy.get(`span.delete-filter-button[data-filter-id='${name}']`).click();
        cy.get(".swal2-title").contains("Are you sure?");
        cy.get(".swal2-confirm").click(); // confirm deletion action
        cy.get("#swal2-content", {timeout: 60000}).contains("Filter has been deleted."); // TODO FIXME this selector refers to the previous #swal2-content which has been detatched from DOM before
        cy.get(".swal2-confirm").click({force: true}); // dismiss confirmation modal
        /* cy.get(".swal2-title")
            .then($div => {
                console.log($div)
            })*/

    });

    it("checks the links of the first row", () => {
        cy.get("a[data-id=browser]", {timeout: 60000}).click({force: true});
        cy.get("button[data-id='table-tab']", {timeout: 60000}).click();

        // FIXME hover doesn't work
        // cy.get("variant-browser-grid .bootstrap-table .fixed-table-container tr[data-index='0']").find("a.gene-tooltip").trigger('mouseover');
        // cy.get("variant-browser-grid .bootstrap-table .fixed-table-container tr[data-index='0']").find("a[data-cy='gene-view']").click({force: true});

    });


    it("query", () => {
        cy.get("a[data-id=browser]", {timeout: 60000}).click({force: true});
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Variant Browser"); // should assertion comes from Chai and it follows its logic
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1); // .should("be.gte", 1);


        // Study and Cohorts: Cohort Alternate Stats
        cy.get("cohort-stats-filter i[data-cy='study-cohort-toggle']").click();
        cy.get("cohort-stats-filter input[data-field='value']").type("0.00001"); // set ALL cohort
        cy.get("div.search-button-wrapper button").click();
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1);
        cy.get("opencga-active-filters button[data-filter-name='cohortStatsAlt']").contains("Cohort ALT Stats");
        cy.get("opencga-active-filters button[data-filter-name='cohortStatsAlt']").click();

        // Genomic: Genomic Location
        cy.get("opencga-variant-filter a[data-accordion-id='Genomic']").click();
        cy.get("region-filter textarea").type("1:5000000-10000000");
        cy.get("div.search-button-wrapper button").click();
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1);
        cy.get("opencga-active-filters button[data-filter-name='region']").click();

        // Genomic: Feature IDs
        cy.get("feature-filter input").type("C5{enter}rs4680{enter}");
        cy.get("div.search-button-wrapper button").click();
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1);
        cy.get("opencga-active-filters button[data-filter-name='xref']").click();

        // Genomic: Disease Panels
        /* TODO decomment once opencga error 'URI Too Long' is fixed
        cy.get("disease-panel-filter button").click();
        cy.get("disease-panel-filter div.dropdown-menu a").click();
        cy.get("div.search-button-wrapper button").click();
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1);
        cy.get("opencga-active-filters button[data-filter-name='panel']").click();*/


        // Genomic: Gene Biotype
        cy.get("biotype-filter button").click();
        cy.get("biotype-filter input[type='search']").type("protein"); // typing protein_coding using autocomplete
        cy.get("biotype-filter div.dropdown-menu").find("a").should("have.length", 1);
        cy.get("biotype-filter div.dropdown-menu a").click();
        cy.get("div.search-button-wrapper button").click();
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1);
        cy.get("opencga-active-filters button[data-filter-name='biotype']").click();

        // Genomic: Variant type
        cy.get("variant-type-filter input[value='SNV'").click();
        cy.get("div.search-button-wrapper button").click();
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1);
        cy.get("opencga-active-filters button[data-filter-name='type']").click();

        // Consequence type: SO Term - Use example: Missense
        cy.get("consequence-type-select-filter button").click();
        cy.get("consequence-type-select-filter input[type='search']").type("miss"); // typing missense using autocomplete
        cy.get("consequence-type-select-filter div.dropdown-menu").find("a").should("have.length", 1);
        cy.get("consequence-type-select-filter div.dropdown-menu a").click();
        cy.get("div.search-button-wrapper button").click();
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1);
        cy.get("opencga-active-filters button[data-filter-name='ct']").click();

        // Consequence type: SO Term - LoF Enabled
        cy.get("consequence-type-select-filter input[value='Loss-of-Function (LoF)'").click({force: true});
        cy.get("div.search-button-wrapper button").click();
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1);
        cy.get("opencga-active-filters button[data-filter-name='ct']").click();

        //cy.get("input[value*=LoF]").click({force: true});
    });
});
