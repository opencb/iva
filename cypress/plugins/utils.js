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
