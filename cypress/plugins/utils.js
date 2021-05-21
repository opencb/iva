
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

/**
 * Routes to a specific Tool
 * @param {String} toolId The tool you want to go to
 * @returns {void}
 */
export const goTo = toolId => {
    cy.get("#waffle-icon").click();
    cy.get(`#side-nav > nav > ul > li > a[data-id='${toolId}']`).click();
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
 * @param {String} [gridSelector] - name gridSelector
 * @param {Number} [numResults] - nums results
 * @returns {void}
 */
export const checkExactResult = (gridSelector, numResults = 1) => {
    cy.get(gridSelector + " table", {timeout: 60000}).find("tr[data-index]", {timeout: 60000}).should("have.lengthOf", numResults); // .should("be.gte", 1);
};

/**
 * it check the table actually contains results
 * @param {String} [gridSelector] - name gridSelector
 * @returns {void}
 */
export const checkResults = gridSelector => {
    cy.get(gridSelector + " table", {timeout: 60000}).find("tr[data-index]", {timeout: 60000}).should("have.length.gt", 0); // .should("be.gte", 1);
};

/**
 * it check the table contains results or the message "No matching records found"
 * @param {String} [gridSelector] - name gridSelector
 * @param {Number} [id] - id
 * @returns {void}
 */
export const checkResultsOrNot = (gridSelector, id) => {
    // TODO (no-unnecessary-waiting) #L99
    // https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting
    // Temporal solution for now

    // *************************
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000); // it is necessary to avoid the following negative assertion is early satisfied
    // *************************

    cy.get(gridSelector + " div.fixed-table-loading", {timeout: 60000}).should("be.not.visible");

    cy.get(gridSelector + " .fixed-table-body > table > tbody", {timeout: 60000}).find(" > tr", {timeout: 10000})
        .should("satisfy", $els => {

            // TODO Debug this. the first print is defined the second is not
            /* console.error("$els", $els)
            cy.wait(1000)
            console.error("$els", $els)*/

            const $firstRow = Cypress.$($els[0]);
            if ($firstRow) {
                // console.error("$firstRow.data(index)", $firstRow.data("index"))
                // console.error("$els.text()", $els.text())
                // console.error("id", id)
                // console.error("No matching records found", $els.text().includes("No matching records found"))
                // it covers either the case of some results or 0 results
                return $firstRow.data("index") === 0 || $els.text().includes("No matching records found");
            }

        });
};

/**
 * given column and row coordinates, it returns a single value out of a bootstrap table
 * @param {String} [gridSelector] - name of the gridSelector
 * @param {Number} [colIndex] - index of the column
 * @param {Number} [rowIndex] - index of the row
 * @param {String} [invokeFn] - invoke a function
 * @returns {Promise} - return a promise
 */
export const getResult = (gridSelector, colIndex = 0, rowIndex = 0, invokeFn= "text") => {
    // check results are >= resultIndex
    // cy.get(gridSelector + " table", {timeout: 60000}).find("tr[data-index]", {timeout: 60000}).should("have.length.gte", rowIndex);
    // cy.get(gridSelector + " table", {timeout: 60000}).find(`tr[data-index=${rowIndex}] > :nth-child(${colIndex})`, {timeout: 60000}).invoke("text").as("text")
    return cy.get(gridSelector + " table", {timeout: 60000}).find(`tr[data-index=${rowIndex}] > :nth-child(${colIndex + 1})`, {timeout: 60000}).first().invoke(invokeFn);
};

/**
 * it checks whether the grid has results.
 * @param {String} [gridSelector] - name of the gridSelector
 * @returns {boolean} - return a boolean
 */
export const hasResults = gridSelector => {
    return cy.get(gridSelector + " .fixed-table-body > table > tbody > tr")
        .then($rows => {
            if ($rows.length) {
                return !Cypress.$($rows[0]).hasClass("no-records-found");
            }
        });
};

/**
 * change page in a BT table
 * @param {String} [gridSelector] - Name of the grid
 * @param {Number} [page] - Number the page of the grid
 * @returns {String} Page
 */
export const changePage = (gridSelector, page) => {
    cy.get(gridSelector + " .fixed-table-container + .fixed-table-pagination ul.pagination li a.page-link").should("be.visible").contains(page).click();
};

export const Facet = {
    select: label => {
        cy.get("facet-filter .facet-selector li a").contains(label).click({force: true});
    },
    // TODO add action: remove from select
    remove: label => {
        // TODO check whether it is active and then remove from select
        // cy.get("div.facet-wrapper button[data-filter-name='" + field + "']")
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
        cy.get("opencb-facet-results opencga-facet-result-view", {timeout: 180000}).should("have.length", len);
    }
};
