/*
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

/**
 * Header bar (pre-login)
 */
context("checks on Header Bar elements", () => {
    before(() => {
        cy.visit("http://localhost:3000/src/");

    });

    it("check login page content", () => {
        cy.get("#loginButton", {timeout: 60000}).should("be.visible");
        cy.get("#loginButton").click();
        cy.get("#opencgaUser").should("be.visible");
        cy.get("#opencgaPassword").should("be.visible");
    });

    it("check header-bar icons resolve correctly", () => {
        cy.get("a.navbar-brand").click();
        cy.get("#welcome-page-title", {timeout: 60000}).contains("Interactive Variant Analysis");

    });

    it("check about page", () => {
        // TODO
    });
});