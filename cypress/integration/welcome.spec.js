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


import {login} from "../plugins/utils.js";


const resolveButtons = page => {
    cy.get(".login-overlay", {timeout: 60000}).should("not.exist");
    cy.get(`a[data-cat-id=${page.id}]`).should("be.visible").click();
    cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", page.title);
    cy.get("a.navbar-brand").click();
};

context("Welcome page", () => {
    before(() => {
        login();
    });

    it("check home page content", () => {
        cy.get("#home-nav > img", {timeout: 60000}).should("be.visible");
        cy.get("a.navbar-brand").click();
        cy.get(".login-overlay", {timeout: 60000}).should("not.exist");
        cy.get("#welcome-page-title", {timeout: 60000}).contains("Interactive Variant Analysis");
        cy.get(".iva-logo").find("img").should("be.visible");
        cy.get("#welcome-page-title ").contains("Interactive Variant Analysis");
    });

    it("check buttons resolves correctly", () => {

        cy.get(".hi-icon-animation > a").each(el => {
            const id = el.data("cat-id");
            const title = el.data("title");
            resolveButtons({id, title});
        });
    });

    it("check documentation page", () => {
        // TODO
    });
});
