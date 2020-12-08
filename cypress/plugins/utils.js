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
 * it check the table actually contains results
 */
export const checkResults = gridSelector => {
    cy.get(gridSelector + " table", {timeout: 60000}).find("tr[data-index]", {timeout: 60000}).should("have.length.gt", 1); // .should("be.gte", 1);
};

/**
 * it check the table contains results or the message "No matching records found"
 */
export const checkResultsOrNot = gridSelector => {
    cy.get(gridSelector + " table", {timeout: 60000}).find("tbody tr", {timeout: 60000})
        .should("satisfy", $els => {
            // it covers either the case of some results or 0 results
            return $els.data("index") !== undefined || $els.text().includes("No matching records found");
        });
};
