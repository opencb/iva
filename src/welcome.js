/**
 * Copyright 2015-2019 OpenCB
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
import { LitElement, html } from "/web_modules/lit-element.js";
import UtilsNew from "./../lib/jsorolla/src/core/utilsNew.js";
import PolymerUtils from "../lib/jsorolla/src/core/webcomponents/PolymerUtils.js";
import "./welcome-iva.js"
import "./welcome-suite.js"
import "./welcome-admin.js"
import "./welcome-clinical.js"

export default class WelcomeWeb extends LitElement {

    constructor() {
        super();
        this.checkProjects = false;
    }

    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
            opencgaSession: {
                type: Object
            },
            version: {
                type: String
            },
            cellbaseClient: {
                type: Object
            },
            checkProjects: {
                type: Boolean
            },
            config: {
                type: Object
            }
        };
    }

    updated(changedProperties) {
        if (changedProperties.has("opencgaSession")) {
            this.opencgaSessionObserver();
        }
    }

    opencgaSessionObserver() {
        this._checkProjects();
    }

    _checkProjects() {
        return !!(UtilsNew.isNotUndefinedOrNull(this.opencgaSession) && UtilsNew.isNotUndefinedOrNull(this.opencgaSession.project));

    }

    onExampleClick(e) {
        const query = { study: this.opencgaSession.study.fqn };
        switch (e.currentTarget.dataset.type) {
            case "gene":
                query.gene = e.currentTarget.text;
                break;
            case "region":
                query.region = e.currentTarget.text;
                break;
            case "snp":
                query.xref = e.currentTarget.text;
                break;
            case "variant":
                query.xref = e.currentTarget.text;
                break;
        }
        this.notify(query);
    }

    notify(query) {
        this.dispatchEvent(new CustomEvent("search", {
            detail: {
                ...query,
                study: this.opencgaSession.study.fqn
            },
            bubbles: true,
            composed: true
        }));
    }

    callAutocomplete(e) {
        // Only gene symbols are going to be searched and not Ensembl IDs
        const featureId = this.querySelector("#welcomeSearchTextBox").value;
        if (UtilsNew.isNotEmpty(featureId)) {
            const query = {};
            if (featureId.startsWith("chr") || featureId.startsWith("X") || featureId.startsWith("Y") || featureId.startsWith("MT") || featureId.match(/^\d/)) {
                if (featureId.split(":").length < 3) {
                    // It's a region, contains only one ':' character
                    query.region = featureId;
                } else {
                    query.xref = featureId;
                }
            } else if (featureId.startsWith("rs")) {
                query.xref = featureId;
            } else {
                // The ID written seems to be a gene name
                query.gene = featureId;
                if (featureId.length >= 3 && !featureId.startsWith("ENS")) {
                    const _this = this;
                    _this.cellbaseClient.get("feature", "id", featureId.toUpperCase(), "starts_with", {}, {})
                        .then(function (response) {
                            let options = "";
                            for (const id of response.response[0].result) {
                                options += `<option value="${id.name}">`;
                            }
                            PolymerUtils.innerHTML("FeatureDatalist", options);
                        });
                }
            }

            if (e.keyCode === 13) {
                this.notify(query);
                this.querySelector("#welcomeSearchTextBox").value = "";
            }

        } else {
            PolymerUtils.innerHTML("FeatureDatalist", "");
        }
    }

    isVisible(item) {
        switch (item.visibility) {
            case "public":
                return true;
            case "private":
                return !!this?.opencgaSession?.token;
            case "none":
            default:
                return false;
        }
    }

    renderWelcome(app) {
        if (!app || app.id === "suite")
            return html`
                <welcome-suite
                    .opencgaSession="${this.opencgaSession}" 
                    .config="${this.config}"
                ></welcome-suite>`

        
        switch (app.id) {
            case "iva":
                return html`
                    <welcome-iva 
                        .opencgaSession="${this.opencgaSession}" 
                        version="${this.config.version}" 
                        .cellbaseClient=${this.cellbaseClient} 
                        .config="${this.config}">
                    </welcome-iva>`;
            case "admin":
                return html`
                    <welcome-admin
                        .opencgaSession="${this.opencgaSession}" 
                        .config="${this.config}">
                    </welcome-admin>`;
            case "clinical":
                return html`
                    <welcome-clinical
                        .opencgaSession="${this.opencgaSession}" 
                        .config="${this.config}">
                    </welcome-clinical>`;
        }
    }
    // TODO Add Behaviour to select different application and render the selected application
    render() {
        return html`${this.renderWelcome(this.app)}`;
    }

}

customElements.define("welcome-web", WelcomeWeb);
