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

import {login, checkResults, changePage, getResult, Facet, randomString} from "../plugins/utils.js";
import {TIMEOUT} from "../plugins/constants.js";


context("7 - Sample Browser", () => {
    before(() => {
        login();
    });

    it("7.1 - query", () => {
        cy.get("a[data-id=sample]", {timeout: TIMEOUT}).click({force: true});
        cy.get("div.page-title h2", {timeout: TIMEOUT}).should("be.visible").and("contain", "Sample Browser");

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

        checkResults("opencga-sample-grid");
        changePage("opencga-sample-grid", 2);
        checkResults("opencga-sample-grid");


        /**
         * Lookup for the first simple text variable
         * type a random string and then check whether the button in opencga-active-filters is built correctly
          */
        cy.get("opencga-annotation-filter-modal", {timeout: 60000})
            .then($wc => {
                // check whether there are variableSet
                if (Cypress.$("button", $wc).length) {
                    cy.get("sample-browser-filter div[data-cy='annotations'] button").contains("Annotation").click();
                    const $tabs = Cypress.$("div.tab-pane", $wc);
                    // console.log("$wc", $tabs.length)
                    if ($tabs.length) {
                        const $firstTab = Cypress.$($tabs[0]);
                        if ($firstTab) {
                            cy.get("opencga-annotation-filter-modal").find("input[data-variable-id]").first().should("be.visible").then($input => {
                                const str = randomString();
                                const variableSetId = $input.data("variableSetId");
                                const variableId = $input.data("variableId");
                                cy.wrap($input).type(str);
                                cy.get("opencga-annotation-filter-modal .modal-footer button").contains("OK").click();
                                cy.get("opencga-active-filters button[data-filter-name='annotation']").contains(`annotation: ${variableSetId}:${variableId}=${str}`);
                                cy.get("opencga-active-filters button[data-filter-name='annotation']").click();
                                checkResults("opencga-sample-grid");
                            });
                        }
                    } else {
                        return true;
                    }
                } else {
                    cy.wrap($wc).contains("No variableSets defined in the study");
                }
            });
    });
    it("7.2 - aggregated query", () => {
        cy.get("a[data-id=sample]").click({force: true});
        cy.get("a[href='#facet_tab']").click({force: true});

        Facet.selectDefaultFacet(); // "creationYear>>creationMonth", "status", "phenotypes", "somatic"
        // cy.get("button.default-facets-button").click(); // "creationYear>>creationMonth", "status", "phenotypes", "somatic"

        Facet.checkActiveFacet("creationYear", "creationYear>>creationMonth");
        Facet.checkActiveFacet("status", "status");
        Facet.checkActiveFacet("phenotypes", "phenotypes");
        Facet.checkActiveFacet("somatic", "somatic");


        Facet.checkActiveFacetLength(4);
        cy.get("div.search-button-wrapper button").click();
        Facet.checkResultLength(4);

        // cy.get("div.facet-wrapper button[data-filter-name='creationYear']").contains("creationYear>>creationMonth");

        cy.get("[data-id='status'] ul.dropdown-menu a").contains("READY").click({force: true}); // status=READY
        Facet.checkActiveFacet("status", "status[READY]");
        // cy.get("div.facet-wrapper button[data-filter-name='status']").contains("status[READY]");


        cy.get("[data-id='somatic'] ul.dropdown-menu a").contains("true").click({force: true}); // somatic=true
        Facet.checkActiveFacet("somatic", "somatic[true]");

        Facet.select("Status"); // removing status

        Facet.checkActiveFacetLength(3);
        cy.get("div.search-button-wrapper button").click();
        Facet.checkResultLength(3);
    });
});
