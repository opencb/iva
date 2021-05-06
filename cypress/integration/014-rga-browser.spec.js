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

import {login, getResult, checkResults, checkResultsOrNot} from "../plugins/utils.js";
import {TIMEOUT} from "../plugins/constants.js";


context("14 - RGA Browser", () => {
    before(() => {
        login();
    });
    /* "geneName",
        "IndividualId",
        "numParents",
        "cohort",
        "populationFrequencyAlt",
        "type",
        "consequenceType",
        "clinicalSignificance"*/
    it("14.1 - Gene View", () => {
        cy.get("a[data-id=rga]", {timeout: TIMEOUT}).click({force: true});
        cy.get("div.page-title h2", {timeout: TIMEOUT}).should("be.visible").and("contain", "Recessive Variant Browser");
        cy.get("button[data-tab-id='gene-tab']", {timeout: TIMEOUT}).click({force: true});


        checkResults("rga-gene-grid");

        // gene Name
        // queries for the first gene and then check if the first result contains the gene.
        let geneName;
        getResult("rga-gene-grid", 0).then($text => {
            geneName = $text;
            // console.log("geneName", geneName);
            cy.get("feature-filter input[type='text']").type(geneName + "{enter}");
            cy.get("div.search-button-wrapper button").click();
            checkResults("rga-gene-grid");
            getResult("rga-gene-grid", 0).then($resultCell => {
                cy.wrap($resultCell).should("contain", geneName);

            });
        });

        // knockoutType
        cy.get("section-filter#Gene div[data-cy='knockoutType-content'] button").click();
        cy.get("section-filter#Gene div[data-cy='knockoutType-content'] .dropdown-menu a").contains("COMP_HET").click();
        cy.get("div.search-button-wrapper button").click();
        checkResults("rga-gene-grid");

        // set numParents=2
        cy.get("section-filter#Confidence .magic-checkbox-wrapper > :nth-child(3) > label").click();
        cy.get("div.search-button-wrapper button").click();
        checkResults("rga-gene-grid");

        // checking the number of CH Definite is > 0 (the current query is geneName=XXX,knockoutType=COMP_HET,numParents=2)
        getResult("rga-gene-grid", 3).then($CHDefiniteNum => {
            //expect($div.text().trim()).gt(0)
            assert.isAbove(Number($CHDefiniteNum), 0, "Results")
        });

        //cy.get("opencga-active-filters button[data-filter-name='knockoutType']").click();

        cy.get("button.active-filter-label").click()
        cy.get("a[data-action='active-filter-clear']").click()
        checkResults("rga-gene-grid");

    });

    it("14.2 - Individual View", () => {
        cy.get("a[data-id=rga]", {timeout: TIMEOUT}).click({force: true});
        cy.get("div.page-title h2", {timeout: TIMEOUT}).should("be.visible").and("contain", "Recessive Variant Browser");
        cy.get("button[data-tab-id='individual-tab']", {timeout: TIMEOUT}).click({force: true});

        checkResults("rga-individual-grid");

        // queries for the first gene and then check if the first result contains the gene.
        let IndividualId;
        getResult("rga-individual-grid", 0).then($text => {
            IndividualId = $text;
            console.log("IndividualId i", IndividualId);
            cy.get("div[data-cy='individualId-content'] input[type='text']").type(IndividualId + "{enter}");
            cy.get("div.search-button-wrapper button").click();
            checkResults("rga-individual-grid");

            getResult("rga-individual-grid", 0).then($resultCell => {
                console.log("$TEXT", $resultCell);
                cy.wrap($resultCell).should("contain", IndividualId);

            });
        });
        cy.get("button.active-filter-label").click()
        cy.get("a[data-action='active-filter-clear']").click()
        checkResults("rga-gene-grid");

    });

    it("14.3 - Variant View", () => {
        cy.get("a[data-id=rga]", {timeout: TIMEOUT}).click({force: true});
        cy.get("div.page-title h2", {timeout: TIMEOUT}).should("be.visible").and("contain", "Recessive Variant Browser");
        cy.get("button[data-tab-id='variant-tab']", {timeout: TIMEOUT}).click({force: true});

        checkResults("rga-variant-view");

        cy.get("button.active-filter-label").click();
        cy.get("a[data-action='active-filter-clear']").click();

        checkResults("rga-variant-view");

        // variant Id
        getResult("rga-variant-view", 0).then(variantId => {
            const region = variantId.trim().match(/\d+:\d+/)[0];
            cy.get("region-filter textarea").type(region);
            cy.get("div.search-button-wrapper button").click();
            checkResults("rga-variant-view");
            getResult("rga-variant-view", 0).then($resultCell => {
                cy.wrap($resultCell).should("contain", region);

            });
        });

        cy.get("opencga-active-filters button[data-filter-name='region']").click();
        checkResults("rga-variant-view");


        // gene Name
        getResult("rga-variant-view", 1).then(geneName => {
            console.log("geneName", geneName);
            cy.get("feature-filter input[type='text']").type(geneName + "{enter}");
            cy.get("div.search-button-wrapper button").click();
            checkResults("rga-variant-view");
            getResult("rga-variant-view", 1).then($resultCell => {
                cy.wrap($resultCell).should("contain", geneName);

            });
        });

    });
});
