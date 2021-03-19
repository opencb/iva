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
import {LitElement, html} from "/web_modules/lit-element.js";
import UtilsNew from "./../lib/jsorolla/src/core/utilsNew.js";
import PolymerUtils from "../lib/jsorolla/src/core/webcomponents/PolymerUtils.js";

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
        const query = {study: this.opencgaSession.study.fqn};
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

    renderSuiteWelcome() {
        return html`
            <div>
                
                
            </div>
        `;
    }

    renderIvaWelcome() {
        return html`
            <welcomw-iva></welcomw-iva>
        `;
    }

    renderClinicalWelcome() {
        return html`
        
        `;
    }

    renderAdminWelcome() {
        return html`
        
        `;
    }

    render() {
        return html`
        <style>
            #logo {
                width: 200px;
                margin: 50px 0 0 0;
            }
                    
            .smaller {
                font-size: 75%;
            }

            .getting-started {
                display: inline-block;
                border: 4px var(--main-bg-color) solid;
                background: white;
                position: relative;
                padding: 10px 35px;
                -webkit-transition: all 0.3s;
                -moz-transition: all 0.3s;
                transition: all 0.3s;
                border-radius: 30px;
            }

            .getting-started:hover {
                text-decoration: none;
            }

            .getting-started span {
                color: var(--main-bg-color);
                font-size: .8em;
                display: inline-block;
                -webkit-transition: all 0.3s;
                -moz-transition: all 0.3s;
                transition: all 0.3s;
            }

            .getting-started:hover {
                -webkit-transform: scale(1.2);
                -moz-transform: scale(1.2);
                -ms-transform: scale(1.2);
                transform: scale(1.2);
                border: 4px #fff solid;
                background: var(--main-bg-color);
            }

            .getting-started:hover span {
                -webkit-transform: scale(1);
                -moz-transform: scale(1);
                -ms-transform: scale(1);
                transform: scale(1);
                color: #fff
            }

            .footer {
                margin-bottom: 80px;
            }
        
            
        </style>                                         

        <!-- This is where main application is rendered -->
        <div class="col-md-6 col-md-offset-3 col-sm-12 welcome-center text-muted text-justify">
            <h1 id="welcome-page-title">
                <div class="iva-logo">
                    <img alt="IVA" src="./img/iva.svg" />
                    <p class="version">
                        <span class="bracket">(</span><span>${this.version}</span><span class="bracket">)</span>
                    </p>
                    <span class="subtitle">Interactive Variant Analysis</span>
                </div>
            </h1>
            
            ${UtilsNew.renderHTML(this.config.welcomePageContent)}
            
            <!--<input type="text" class="form-control input-lg" id="welcomeSearchTextBoxOld" style="text-align: center;"-->
            <!--placeholder="Search for a gene, transcript, protein or a variant" on-blur="onBlur" on-keyup="onKeyup">-->
            <!--<br>-->
        
            <!--${false && this._checkProjects() ? html`
                <div>
                    <input id="welcomeSearchTextBox" type="text" class="form-control input-lg" list="FeatureDatalist" @change="${this.callAutocomplete}" placeholder="Search for gene symbols, genomic regions or variants" value="">
                        <datalist id="FeatureDatalist"></datalist>
                        <!-- Examples -->
                    <span style="font-size: 0.8em; padding-left: 10px">
                            Examples - Gene: <a @click="${this.onExampleClick}" data-type="gene" style="cursor: pointer">BRCA2</a>,
                            Region: <a @click="${this.onExampleClick}" data-type="region" style="cursor: pointer">3</a>, <a @click="${this.onExampleClick}" data-type="region" style="cursor: pointer">3:113000-1150000</a>,
                            SNP: <a @click="${this.onExampleClick}" data-type="snp" style="cursor: pointer">rs445909</a>
                            Variant: <a @click="${this.onExampleClick}" data-type="variant" style="cursor: pointer">13:32962274:G:T</a>
                    </span>
                </div>` :
        null }
            -->
             
            <div class="row hi-icon-wrap hi-icon-effect-9 hi-icon-animation">
                ${this.config.apps.filter(this.isVisible).map(item => html`
                    ${item.submenu ? html`
                        <a class="icon-wrapper" data-cat-id="cat-${item.id}" data-title="${item.name}" href="#cat-${item.id}/${this._checkProjects() ? `${this.opencgaSession.project.id}/${this.opencgaSession.study.id}` : ""}">
                            <div class="hi-icon">
                                <img alt="${item.name}" src="img/tools/icons/${item.icon}" /> 
                            </div>
                            <p>${item.name}</p>
                            <span class="smaller"></span>
                        </a>
                        ` : html`
                            <a class="icon-wrapper" href="#${item.id}/${this._checkProjects() ? `${this.opencgaSession.project.id}/${this.opencgaSession.study.id}` : ""}">
                            <div class="hi-icon">
                                <img alt="${item.name}" src="${item.logo}" /> 
                            </div>
                            <p>${item.name}</p>
                            <span class="smaller"></span>
                        </a>
                    `}
                `)}
            </div>

            ${suite.appConfig === "opencb" ? html`
                <div class="row text-center">
                    <a class="getting-started" href="#gettingstarted"><span>Getting started with IVA</span></a>
                </div>
            ` : html`
                <div class="row text-center">
                    <a class="getting-started" href="${this.config.about.links.find(link => link.id === "documentation").url}" target="_blank"><span>Documentation</span></a>
                </div>
            `}

            ${!this.app || this.app.id === "suite" ? html`
                        ${this.renderSuiteWelcome()}`
                    : null
            }


            ${this.app && this.app.id === "iva" ? html`
                        <welcomw-iva></welcomw-iva>`
                    : null
            }

            ${this.app && this.app.id === "clinical" ? html`
                        ${this.renderClinicalWelcome()}`
                    : null
            }

            ${this.app && this.app.id === "admin" ? html`
                        ${this.renderAdminWelcome()}`
                    : null
            }
            
           <!-- <h4>Note</h4>
            <small>
                IVA web application makes an intensive use of the HTML5 standard and other cutting-edge web technologies such as
                Web Components,
                so only modern web browsers are fully supported, these include Chrome 49+, Firefox 45+, Microsoft Edge 14+,
                Safari 10+ and Opera 36+.
            </small>-->
            ${UtilsNew.renderHTML(this.config.welcomePageFooter)}

        </div>
        `;
    }

}

customElements.define("welcome-web", WelcomeWeb);
