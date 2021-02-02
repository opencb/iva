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

import {login} from "../plugins/utils.js";


context("Login", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/src/#login");
    });

    it("login unsuccessful", () => {
        cy.get("#opencgaUser").type("demo2");
        cy.get("#opencgaPassword").type("demo2");
        cy.get("form#formLogin").submit();
        cy.get("#error").should("be.visible");
        cy.get("#error").contains("Incorrect user or password.");
    });

    it("login successful", () => {

        const username = Cypress.env("username");
        const password = Cypress.env("password");

        expect(username, "username was set").to.be.a("string").and.not.be.empty;
        expect(password, "password was set").to.be.a("string").and.not.be.empty;
        cy.get("#opencgaUser").type(username);
        cy.get("#opencgaPassword").type(password);
        cy.get("form#formLogin").submit();

        cy.get(".login-overlay", {timeout: 60000}).should("be.visible");
        cy.get(".login-overlay", {timeout: 60000}).should("not.exist");

        cy.url().should("include", "#home", {timeout: 15000})
        cy.get(".subtitle", {timeout: 60000}).contains("Interactive Variant Analysis");
    });

});
