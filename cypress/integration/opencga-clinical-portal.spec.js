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
import "cypress-wait-until";

context("Case Portal", () => {
    before(() => {
        login();
    })

    it("query", () => {
        /*cy.waitUntil(() => cy.getCookie("iva_sid").then(cookie => {
            console.log("cookie", cookie)
            return Boolean(cookie && cookie.value)
        }));*/

        cy.get("a[data-id=clinicalAnalysisPortal]", {timeout: 60000}).click({force: true})

        //long timeout to make sure you are logged in
        cy.get("div.page-title h2", {timeout: 60000}).should("be.visible").and("contain", "Case Portal")

        /*cy.get(".clearfix > .pull-left > .pagination-info", {timeout: 10000})
            .should("be.visible")*/

            //.should('contain', /Showing \d+ to \d+ of \d+ records/)
            //.and("contain", "Showing 1 to 10 of 18 records")


       /* cy.get("opencga-clinical-analysis-grid .success > :nth-child(1)").then(elem => {
            // elem is the underlying Javascript object targeted by the .get() command.
            const firstCase = Cypress.$(elem).text().trim();
            //opencga-clinical-analysis-view > data-form div:nth-child(1) > div.col-md-9
        });*/

    })
})
