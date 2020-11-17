/**
 * Created by Antonio Altamura on 02/11/2020.
 */

context("Login", () => {
    before(() => {
        cy.visit("http://localhost:3000/src/swal.html")
    })

    it("swal DOM check", () => {
        cy.get("button").click();
        cy.get(".swal2-title").contains("Are you sure?");
        cy.get(".swal2-confirm").click(); //confirm action
        cy.get(".swal2-title").contains("Deleted");
        cy.get(".swal2-confirm").click(); //dismiss confirmation modal

    })

})
