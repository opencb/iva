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

import {login, randomString, checkResultsOrNot} from "../plugins/utils.js";


context("Variant Browser", () => {
    before(() => {
        login();
    });

    beforeEach(() => {
        cy.get("a[data-id=browser]", {timeout: 60000}).click({force: true});
    });
/*

    it("check Columns togglability", () => {
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Variant Browser");

        cy.get("variant-browser-grid .columns-toggle-wrapper button").should("be.visible").and("contain", "Columns").click();
        cy.get("variant-browser-grid .columns-toggle-wrapper ul li").and("have.length.gt", 1);

        cy.get("variant-browser-grid .columns-toggle-wrapper ul li a").click({multiple: true, timeout: 60000}); // deactivate all the columns
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container tr[data-index=0]", {timeout: 60000}).find("td", {timeout: 60000}).should("have.lengthOf", 1);

        cy.get("variant-browser-grid .columns-toggle-wrapper ul li a").click({multiple: true, timeout: 60000}); // reactivate all the columns
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container tr[data-index=0]", {timeout: 60000}).find("td", {timeout: 60000}).should("have.length.gt", 1);


    });

    // Variant Browser: Filter controls
    it("check Saved Filter actions", () => {
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

        // cy.get(".swal2-content", {timeout: 60000}).contains("Filter has been deleted."); // this selector doesn't work without .should("be.visible") assertion because it refers to the previous #swal2-content which has been detatched from DOM before
        cy.contains(".swal2-content", "Filter has been deleted", {timeout: 60000}).should("be.visible");
        cy.get(".swal2-confirm").click({force: true}); // dismiss confirmation modal

    });
*/

    // Variant Browser: Individual filters
    it("query", () => {
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Variant Browser"); // should assertion comes from Chai and it follows its logic
        checkResultsOrNot("variant-browser-grid");

        cy.get("variant-browser a[href='#filters_tab']").click();
        // Study and Cohorts: Cohort Alternate Stats
        cy.get("cohort-stats-filter i[data-cy='study-cohort-toggle']").first({timeout: 60000}).should("be.visible").click();
        cy.get("cohort-stats-filter input[data-field='value']").first({timeout: 60000}).type("0.00001"); // set ALL cohort
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='cohortStatsAlt']").contains("Cohort ALT Stats");
        cy.get("opencga-active-filters button[data-filter-name='cohortStatsAlt']").click();

        // Genomic: Genomic Location
        cy.get("opencga-variant-filter a[data-accordion-id='Genomic']").click();
        cy.get("region-filter textarea").type("1:5000000-10000000");
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='region']").click();

        // Genomic: Feature IDs
        cy.get("feature-filter input").type("C5{enter}rs4680{enter}");
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='xref']").click();

        // Genomic: Disease Panels
        // TODO decomment once opencga error 'URI Too Long' is fixed
        // cy.get("disease-panel-filter button").click();
        // cy.get("disease-panel-filter div.dropdown-menu a").click();
        // cy.get("div.search-button-wrapper button").click();
        // cy.get("variant-browser-grid .bootstrap-table .fixed-table-container", {timeout: 60000}).find("tr[data-index]").should("have.length.gt", 1);
        // cy.get("opencga-active-filters button[data-filter-name='panel']").click();

        // Genomic: Gene Biotype
        cy.get("biotype-filter button").click();
        cy.get("biotype-filter input[type='search']").type("protein"); // typing protein_coding using autocomplete
        cy.get("biotype-filter div.dropdown-menu").find("a").should("have.length", 1);
        cy.get("biotype-filter div.dropdown-menu a").click();
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='biotype']").click();

        // Genomic: Variant type cy.get('.magic-checkbox-wrapper > :nth-child(1) > label')
        cy.get("variant-type-filter input[value='SNV'] + label").click({force: true});
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='type']").click();

        // Consequence type: SO Term - LoF Enabled
        cy.get("opencga-variant-filter a[data-accordion-id='ConsequenceType']").click();
        cy.get("consequence-type-select-filter input[value='Loss-of-Function (LoF)'").click({force: true});
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='ct']").click();

        // Consequence type: SO Term - Use example: Missense
        cy.get("consequence-type-select-filter button").click();
        cy.get("consequence-type-select-filter input[type='search']").type("miss"); // typing missense using autocomplete
        cy.get("consequence-type-select-filter div.dropdown-menu").find("a").should("have.length", 1);
        cy.get("consequence-type-select-filter div.dropdown-menu a").click();
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='ct']").click();

        // Population Frequency: 1000 Genomes - AFR < 0.0001 AND EUR > 0.0001
        cy.get("opencga-variant-filter a[data-accordion-id='PopulationFrequency']").click();
        cy.get("population-frequency-filter i[data-cy='pop-freq-toggle-1kG_phase3']").click();
        cy.get("population-frequency-filter div[data-cy='pop-freq-codes-wrapper-1kG_phase3']").should("be.visible");
        cy.get("population-frequency-filter div[data-cy='pop-freq-codes-wrapper-1kG_phase3'] div[data-cy='number-field-filter-wrapper-AFR'] input[data-field='value']").type("0.0001");
        cy.get("population-frequency-filter div[data-cy='pop-freq-codes-wrapper-1kG_phase3'] div[data-cy='number-field-filter-wrapper-AFR'] select[data-field='comparator']").select("<");
        cy.get("population-frequency-filter div[data-cy='pop-freq-codes-wrapper-1kG_phase3'] div[data-cy='number-field-filter-wrapper-EUR'] input[data-field='value']").type("0.0001");
        cy.get("population-frequency-filter div[data-cy='pop-freq-codes-wrapper-1kG_phase3'] div[data-cy='number-field-filter-wrapper-EUR'] select[data-field='comparator']").select(">");
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='populationFrequencyAlt']").click();

        // Population Frequency: gnomAD	- Set all < 0.00001
        cy.get("population-frequency-filter i[data-cy='pop-freq-toggle-GNOMAD_GENOMES']").click();
        cy.get("population-frequency-filter div[data-cy='pop-freq-codes-wrapper-GNOMAD_GENOMES']").should("be.visible");
        cy.get("population-frequency-filter div[data-cy='pop-freq-codes-wrapper-GNOMAD_GENOMES'] div[data-cy='number-field-filter-wrapper-AFR'] input[data-field='value']").type("0.0001");
        cy.get("population-frequency-filter div[data-cy='pop-freq-codes-wrapper-GNOMAD_GENOMES'] div[data-cy='number-field-filter-wrapper-AFR'] select[data-field='comparator']").select("<");
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='populationFrequencyAlt']").click();

        // Clinical and Disease: ClinVar Accessions	Use example: Pathogenic
        cy.get("opencga-variant-filter a[data-accordion-id='ClinicalandDisease']").click();
        cy.get("clinvar-accessions-filter select").select("Pathogenic", {force: true});
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='clinicalSignificance']").click();

        // Clinical and Disease: Full text	Use example: ceroid
        cy.get("fulltext-search-accessions-filter textarea").type("centroid");
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='traits']").click();

        // Phenotype: GO Accessions	Use example
        cy.get("opencga-variant-filter a[data-accordion-id='Phenotype']").click();
        cy.get("go-accessions-filter > textarea").type("GO:0032996");
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='go']").click();

        // TODO cannot relies on data-nodeid because the order in not guaranteed
        // cy.get("go-accessions-filter > button").click();
        // cy.get(".modal-body .list-group-item[data-nodeid='2'] > .expand-icon").click(); // click on cellular component
        // cy.get(".modal-body .list-group-item[data-nodeid='2'] > .expand-icon").click(); // click on protein-containing complex
        // cy.get(".modal-body .list-group-item[data-nodeid='3'] > .expand-icon").click(); // click on bcl3


        // Phenotype: HPO Accessions Use example
        cy.get("hpo-accessions-filter > textarea").type("HP:0041054");
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='annot-hpo']").click();

        // Deleteriousness: Sift / Polyphen - OR operation
        cy.get("opencga-variant-filter a[data-accordion-id='Deleteriousness']").click();
        cy.get("protein-substitution-score-filter .sift input[type='text']").type("0.1");
        cy.get("protein-substitution-score-filter .polyphen input[type='text']").type("0.1");
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='protein_substitution']").click();

        // Deleteriousness: Sift / Polyphen - AND operation
        cy.get("protein-substitution-score-filter .sift input[type='text']").type("0.1");
        cy.get("protein-substitution-score-filter .polyphen input[type='text']").type("0.1");
        cy.get("protein-substitution-score-filter .rating-label-and").click();
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='protein_substitution']").click();

        // Conservation: PhyloP Use example
        cy.get("opencga-variant-filter a[data-accordion-id='Conservation']").click();
        cy.get("conservation-filter .cf-phylop input[type='text']").type("1");
        cy.get("conservation-filter .cf-phastCons input[type='text']").type("1");
        cy.get("div.search-button-wrapper button").click();
        checkResultsOrNot("variant-browser-grid");
        cy.get("opencga-active-filters button[data-filter-name='conservation']").click();


    });
/*
    it("aggregated query", () => {
        cy.get("a[href='#facet_tab']").click({force: true});
        cy.get("button.default-facets-button").click(); // default facets selection (chromosome, type)
        cy.get("facet-filter .facet-selector li a").contains("Gene").click({force: true}); // gene facets selection
        cy.get("#type_Select a").contains("INSERTION").click({force: true}); // type=INSERTION

        cy.get("div.search-button-wrapper button").click();
        cy.get("opencb-facet-results", {timeout: 60000}).find("opencga-facet-result-view", {timeout: 60000}).should("have.lengthOf", 3); // 2 default fields + genes

        cy.get("div.facet-wrapper button[data-filter-name='chromosome']").click();
        cy.get("opencb-facet-results", {timeout: 60000}).find("opencga-facet-result-view", {timeout: 60000}).should("have.lengthOf", 2);
        cy.get("div.facet-wrapper button[data-filter-name='type']").click();
        cy.get("opencb-facet-results", {timeout: 60000}).find("opencga-facet-result-view", {timeout: 60000}).should("have.lengthOf", 1);
        cy.get("div.facet-wrapper button[data-filter-name='genes']").click();
        cy.get("opencb-facet-results", {timeout: 60000}).find("opencga-facet-result-view", {timeout: 60000}).should("have.lengthOf", 0);

    });

    // Variant Browser: Tabs
    /!*it("checks Variant Browser detail tabs", () => {

        // TODO FIXME this line doesn't work if you run it along with other tests. It works if you run this test case alone..
        cy.get("variant-browser-detail > div > h3", {timeout: 60000}).should("be.visible").should("contain", /Variant: [a-z0-9:]+/gim);

        cy.get("cellbase-variant-annotation-summary").contains("Summary");

        cy.get("variant-browser-detail [data-id='annotationConsType']").click();
        checkResultsOrNot("variant-consequence-type-view");

        cy.get("variant-browser-detail [data-id='annotationPropFreq']").click();
        checkResultsOrNot("cellbase-population-frequency-grid");

        cy.get("variant-browser-detail [data-id='annotationClinical']").click();
        checkResultsOrNot("variant-annotation-clinical-view");

        cy.get("variant-browser-detail [data-id='cohortStats']").click();
        checkResultsOrNot("variant-cohort-stats-grid");

        cy.get("variant-browser-detail [data-id='samples']").click();
        checkResultsOrNot("opencga-variant-samples");

        cy.get("variant-browser-detail [data-id='beacon']").click();
        cy.get("variant-beacon-network", {timeout: 60000}).find(".beacon-square").its("length").should("eq", 15);


    });*!/

    it("checks the links of the first row", () => {
        cy.get("button[data-id='table-tab']", {timeout: 60000}).click();
        cy.get("variant-browser-grid .bootstrap-table .fixed-table-container tr[data-index='0'] a.gene-tooltip")
            .should("be.visible", {timeout: 60000})
            .click({force: true});
        // .trigger('mouseover'); // .trigger('mouseover') doesn't work in this case as the hover action changes the DOM
        cy.get(".qtip-content").find("a[data-cy='gene-view']").click({force: true});
        cy.get("div.page-title h2").contains(/Gene [a-z0-9:]+/gim);


    });

    */
});
