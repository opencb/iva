
/**
 * https://github.com/cypress-io/cypress/issues/5743#issuecomment-650421731
 * getAttached(selector)
 * getAttached(selectorFn)
 *
 * Waits until the selector finds an attached element, then yields it (wrapped).
 * selectorFn, if provided, is passed $(document). Don't use cy methods inside selectorFn.
 */
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
    cy.get(gridSelector + " table", {timeout: 60000}).find("tr[data-index]", {timeout: 60000}).should("have.lengthOf", numResults); // .should("be.gte", 1);
};

/**
 * it check the table actually contains results
 */
export const checkResults = gridSelector => {
    cy.get(gridSelector + " table", {timeout: 60000}).find("tr[data-index]", {timeout: 60000}).should("have.length.gt", 0); // .should("be.gte", 1);
};

/**
 * it check the table contains results or the message "No matching records found"
 */
export const checkResultsOrNot = (gridSelector, id) => {
    // FIXME note this selector matches also the inner tables for each row
    cy.get(gridSelector + " table", {timeout: 60000}).find("tbody tr", {timeout: 10000})
        .should("satisfy", $els => {
            // console.error("$els", $els)
            const $firstRow = Cypress.$($els[0]);
            if ($firstRow) {
                // console.error("$firstRow.data(index)", $firstRow.data("index"))
                // console.error("$els.text()", $els.text())
                // console.error("id", id)
                // console.error("No matching records found", $els.text().includes("No matching records found"))
                // it covers either the case of some results or 0 results
                return $firstRow.data("index") === 0 || $els.text().includes("No matching records found")
            }

        });
};

/**
 * given column and row coordinates, it returns a single value out of a bootstrap table
 */
export const getResult = (gridSelector, colIndex = 1, rowIndex = 0) => {
    // check results are >= resultIndex
    //cy.get(gridSelector + " table", {timeout: 60000}).find("tr[data-index]", {timeout: 60000}).should("have.length.gte", rowIndex);
    //cy.get(gridSelector + " table", {timeout: 60000}).find(`tr[data-index=${rowIndex}] > :nth-child(${colIndex})`, {timeout: 60000}).invoke("text").as("text")
    return cy.get(gridSelector + " table", {timeout: 60000}).find(`tr[data-index=${rowIndex}] > :nth-child(${colIndex})`, {timeout: 60000}).invoke("text")
}
