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

export default class WelcomeWeb extends LitElement {

    constructor() {
        super();
        this.checkProjects = false;
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
            }
        };
    }

    createRenderRoot() {
        return this;
    }

    updated(changedProperties) {
        if (changedProperties.has("opencgaSession")) {
            this.opencgaSessionObserver();
        }
    }

    opencgaSessionObserver() {
        this.checkProjects = !!(UtilsNew.isNotUndefinedOrNull(this.opencgaSession) && UtilsNew.isNotUndefinedOrNull(this.opencgaSession.project));
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
        query.study = this.opencgaSession.study.fqn;
        this.dispatchEvent(new CustomEvent("search", {
            detail: query,
            bubbles: true,
            composed: true
        }));
    }

    callAutocomplete(e) {
        // Only gene symbols are going to be searched and not Ensembl IDs
        const featureId = PolymerUtils.getElementById("welcomeSearchTextBox").value;
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
                        .then(function(response) {
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
                PolymerUtils.getElementById("welcomeSearchTextBox").value = "";
            }

        } else {
            PolymerUtils.innerHTML("FeatureDatalist", "");
        }
    }

    render() {
        return html`
        <style>
            #logo {
                width: 200px;
                margin: 50px 0 0 0;
            }
        
            #title {
                font-size: 10em;
                text-align: center;
                font-weight: bold;
                letter-spacing: -20px;
            }
        
            #title::first-letter {
                letter-spacing: -5px;
            }
        
            #title span {
                font-size: 30px;
                margin-top: -30px;
                display: block;
                letter-spacing: 0;
            }
        
        </style>
        
        <!-- This is where main application is rendered -->
        <div class="col-md-6 col-md-offset-3 welcome-center text-muted text-justify">
            <br>
        
            <h1 id="title">IVA <span>${this.version}</span></h1>
        
            <h2>Overview</h2>
            <p>
                Welcome to the IVA tool for whole genome variant analysis.
                This interactive tool allows finding genes affected by deleterious variants that segregate along family
                pedigrees, case-controls or sporadic samples.
            </p>
            <br>
            <!--<input type="text" class="form-control input-lg" id="welcomeSearchTextBoxOld" style="text-align: center;"-->
            <!--placeholder="Search for a gene, transcript, protein or a variant" on-blur="onBlur" on-keyup="onKeyup">-->
            <!--<br>-->
        
            ${this.checkProjects ? html`
                                    <div style="padding: 20px 10px">
                                        <input id="welcomeSearchTextBox" type="text" class="form-control input-lg" list="FeatureDatalist" @change="${this.callAutocomplete}"
                                                   placeholder="Search for gene symbols, genomic regions or variants" value="">
                                            <datalist id="FeatureDatalist"></datalist>
                                            <!-- Examples -->
                                            <span style="font-size: 0.8em; padding-left: 10px">
                                                Examples - Gene: <a @click="${this.onExampleClick}" data-type="gene" style="cursor: pointer">BRCA2</a>,
                                                Region: <a @click="${this.onExampleClick}" data-type="region" style="cursor: pointer">3</a>, <a @click="${this.onExampleClick}" data-type="region" style="cursor: pointer">3:113000-1150000</a>,
                                                SNP: <a @click="${this.onExampleClick}" data-type="snp" style="cursor: pointer">rs445909</a>
                                                Variant: <a @click="${this.onExampleClick}" data-type="variant" style="cursor: pointer">13:32962274:G:T</a>
                                            </span>
                                    </div>` : null
            }
        
            <h4>Note</h4>
            <small>
                IVA web application makes an intensive use of the HTML5 standard and other cutting-edge web technologies such as
                Web Components,
                so only modern web browsers are fully supported, these include Chrome 49+, Firefox 45+, Microsoft Edge 14+,
                Safari 10+ and Opera 36+.
            </small>
            <p><img id="logo" src="img/opencb-logo.png"/></p>
        </div>
        `;
    }

}

customElements.define("welcome-web", WelcomeWeb);
