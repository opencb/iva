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

import {login, checkResults, getResult, Facet, changePage, randomString, goTo} from "../plugins/utils.js";
import {TIMEOUT} from "../plugins/constants.js";


context("8 - Individual Browser", () => {
    before(() => {
        login();
        goTo("iva");
    });

    it("8.1 - query", () => {
        cy.get("a[data-id=individual]", {timeout: TIMEOUT}).click({force: true});
        cy.get("div.page-title h2", {timeout: TIMEOUT}).should("be.visible").and("contain", "Individual Browser");

        checkResults("opencga-individual-grid");

        /**
         * Lookup for the first simple text variable
         * type a random string and then check whether the button in opencga-active-filters is built correctly
         */
        cy.get("opencga-annotation-filter-modal", {timeout: 60000})
            .then($wc => {
                // check whether there are variableSet
                if (Cypress.$("button", $wc).length) {
                    cy.get("div[data-cy='annotations'] button").contains("Annotation").click();
                    const $tabs = Cypress.$("div.tab-pane", $wc);
                    // checkes whether there are VariableSets tabs
                    assert.isAbove($tabs.length, 0, "The number of VariableSets");
                    if ($tabs.length) {
                        const $firstTab = Cypress.$($tabs[0]);
                        if ($firstTab) {
                            // check whether there is actually an input field in the first VariableSet, if not bypass the test
                            const $inputFields = Cypress.$("input[data-variable-id]", $firstTab);
                            if ($inputFields.length) {
                                cy.get("opencga-annotation-filter-modal").find("input[data-variable-id]").first().should("be.visible").then($input => {
                                    const str = randomString();
                                    const variableSetId = $input.data("variableSetId");
                                    const variableId = $input.data("variableId");
                                    cy.wrap($input).type(str);
                                    cy.get("opencga-annotation-filter-modal .modal-footer button").contains("OK").click();
                                    cy.get("opencga-active-filters button[data-filter-name='annotation']").contains(`annotation: ${variableSetId}:${variableId}=${str}`);
                                    cy.get("opencga-active-filters button[data-filter-name='annotation']").click();
                                    checkResults("opencga-individual-grid");
                                });
                            } else {
                                //return true; // cy..then($wc => {}) fails because you cannot mixing up async and sync code.
                                // so we can just make the test pass by check the non existence of inputs fields
                                cy.get("opencga-annotation-filter-modal input[data-variable-id]", {timeout: TIMEOUT}).should("not.exist");
                                cy.get("opencga-annotation-filter-modal .modal-footer button").contains("OK").click();
                            }
                        }
                    }
                } else {
                    cy.wrap($wc).contains("No variableSets defined in the study");
                }
            });

    });


    it("8.2 - aggregated query", () => {
        cy.get("a[data-id=individual]").click({force: true});
        cy.get("a[href='#facet_tab']").click({force: true});

        cy.get("button.default-facets-button").click();
        cy.get("div.search-button-wrapper button").click();
        cy.get(".facet-wrapper .button-list button").should("have.length", 8);
        cy.get("opencb-facet-results opencga-facet-result-view", {timeout: TIMEOUT}).should("have.length", 8);


        Facet.selectDefaultFacet(); // "creationYear>>creationMonth", "status", "ethnicity", "population", "lifeStatus", "phenotypes", "sex", "numSamples[0..10]:1"
        // cy.get("button.default-facets-button").click(); // "creationYear>>creationMonth", "status", "phenotypes", "somatic"

        Facet.checkActiveFacet("creationYear", "creationYear>>creationMonth");
        Facet.checkActiveFacet("status", "status");
        Facet.checkActiveFacet("ethnicity", "ethnicity");
        Facet.checkActiveFacet("population", "population");
        Facet.checkActiveFacet("lifeStatus", "lifeStatus");
        Facet.checkActiveFacet("phenotypes", "phenotypes");
        Facet.checkActiveFacet("sex", "sex");
        Facet.checkActiveFacet("numSamples", "numSamples[0..10]:1");


        Facet.checkActiveFacetLength(8);
        cy.get("div.search-button-wrapper button").click();
        Facet.checkResultLength(8);

        // cy.get("div.facet-wrapper button[data-filter-name='creationYear']").contains("creationYear>>creationMonth");

        cy.get("[data-id='status'] ul.dropdown-menu a").contains("READY").click({force: true}); // status=READY
        Facet.checkActiveFacet("status", "status[READY]");
        // cy.get("div.facet-wrapper button[data-filter-name='status']").contains("status[READY]");


        Facet.select("Status"); // removing status

        Facet.checkActiveFacetLength(7);
        cy.get("div.search-button-wrapper button").click();
        Facet.checkResultLength(7);

    });

});
