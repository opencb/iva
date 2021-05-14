
/**
 * https://github.com/cypress-io/cypress/issues/5743#issuecomment-650421731
 * getAttached(selector)
 * getAttached(selectorFn)
 *
 * Waits until the selector finds an attached element, then yields it (wrapped).
 * selectorFn, if provided, is passed $(document). Don't use cy methods inside selectorFn.
 */

import {TIMEOUT} from "./constants.js";

Cypress.Commands.add("getAttached", selector => {
    const getElement = typeof selector === "function" ? selector : $d => $d.find(selector);
    let $el = null;
    return cy.document().should($d => {
        $el = getElement(Cypress.$($d));
        expect(Cypress.dom.isDetached($el)).to.be.false;
    }).then(() => cy.wrap($el));
});

export const waitTable = gridSelector => {
    cy.wait(1000); // it is necessary to avoid the following negative assertion is early satisfied
    cy.get(gridSelector + " div.fixed-table-loading", {timeout: 60000}).should("be.not.visible");
};

export const login = () => {
    cy.visit("http://localhost:3000/src/#login");
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    cy.get("#opencgaUser").type(username);
    cy.get("#opencgaPassword").type(password, {log: false});
    cy.get("form#formLogin").submit();

    // temp fix
    cy.get(".login-overlay", {timeout: 60000}).should("be.visible");
    cy.get(".login-overlay", {timeout: 60000}).should("not.exist");

    // switch to defined Study
    if (Cypress.env("study")) {
        cy.get(`a[data-fqn="${Cypress.env("study")}"]`, {timeout: 60000}).click({force: true});
    }


};

export const randomString = length => {
    let result = "";
    const _length = length || 6;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < _length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const waitTableResults = gridSelector => {
    cy.get(gridSelector + " div.fixed-table-loading", {timeout: 60000}).should("be.visible");
    cy.get(gridSelector + " div.fixed-table-loading", {timeout: 60000}).should("be.not.visible");
};

/**
 * it check the table actually contains a single result
 */
export const checkExactResult = (gridSelector, numResults = 1) => {
    waitTable(gridSelector);
    cy.get(gridSelector + " table", {timeout: 60000}).find("tr[data-index]", {timeout: 60000}).should("have.lengthOf", numResults); // .should("be.gte", 1);
};

/**
 * it check the table actually contains results
 */
export const checkResults = gridSelector => {
    waitTable(gridSelector);
    cy.get(gridSelector + " table", {timeout: 60000}).find("tr[data-index]", {timeout: 60000}).should("have.length.gt", 0); // .should("be.gte", 1);
};

/**
 * it check the table contains results or the message "No matching records found"
 */
export const checkResultsOrNot = (gridSelector, id) => {
    waitTable(gridSelector);
    cy.get(gridSelector + " .fixed-table-body > table > tbody", {timeout: 60000}).find(" > tr", {timeout: 10000})
        .should("satisfy", $els => {

            // TODO Debug this. the first print is defined the second is not
            /* console.error("$els", $els)
            cy.wait(1000)
            console.error("$els", $els)*/

            const $firstRow = Cypress.$($els[0]);
            if ($firstRow) {
                // it covers either the case of some results or 0 results
                return $firstRow.data("index") === 0 || $els.text().includes("No matching records found");
            }

        });
};

/**
 * Given column and row coordinates, it returns the value of a single cell out of a bootstrap table
 * @param {String} gridSelector CSS selector of the table
 * @param {Number} colIndex column index
 * @param {Number} rowIndex row index
 * @param {String} invokeFn text|html
 * @return {Cypress.Chainable}
 */
export const getResult = (gridSelector, colIndex = 0, rowIndex = 0, invokeFn= "text") => {
    // cy.get(gridSelector + " table", {timeout: 60000}).find("tr[data-index]", {timeout: 60000}).should("have.length.gte", rowIndex);
    // cy.get(gridSelector + " table", {timeout: 60000}).find(`tr[data-index=${rowIndex}] > :nth-child(${colIndex})`, {timeout: 60000}).invoke("text").as("text")
    return cy.get(gridSelector + " table", {timeout: 60000}).find(`tr[data-index=${rowIndex}] > :nth-child(${colIndex + 1})`, {timeout: 60000}).first().invoke(invokeFn);
};

/**
 * it checks whether the grid has results.
 *
 */
export const hasResults = gridSelector => {
    return cy.get(gridSelector + " .fixed-table-body > table > tbody > tr")
        .then($rows => {
            if ($rows.length) {
                return !Cypress.$($rows[0]).hasClass("no-records-found");
            }
        });
};


export const Facet = {
    select: label => {
        cy.get("facet-filter .facet-selector li a").contains(label).click({force: true});
    },
    selectDefaultFacet: () => {
        cy.get("button.default-facets-button").click();
    },
    removeActive: field => {
        cy.get("div.facet-wrapper button[data-filter-name='" + field + "']").click();
    },
    checkActiveFacet: (field, value) => {
        cy.get("div.facet-wrapper button[data-filter-name='" + field + "']").contains(value);
    },
    checkActiveFacetLength: len => {
        cy.get("div.facet-wrapper button[data-filter-value]", {timeout: TIMEOUT}).should("have.length", len);
    },
    checkResultLength: len => {
        cy.get("opencb-facet-results opencga-facet-result-view", {timeout: TIMEOUT}).should("have.length", len);
    }
};
