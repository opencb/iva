import {login} from "../../plugins/utils.js";

context("Variant Browser", () => {
    before(() => {
        login();
    });

    // https://cypress.io/blog/2020/07/22/do-not-get-too-detached/
    it("Example of DOM manipulation and wrap", () => {
        cy.contains(".select2-results__option",
            "Clementine Bauch").should("be.visible")
            .pause()
            .then($clem => {
                // remove the element from the DOM using jQuery method
                $clem.remove();
                // pass the element to the click
                cy.wrap($clem);
            })
            .click();


    });
});
