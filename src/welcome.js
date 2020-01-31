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
        this.components = [];
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
        //console.log("opencgaSessionObserver")
        //console.log(this.opencgaSession)
        this.checkProjects = !!(UtilsNew.isNotUndefinedOrNull(this.opencgaSession) && UtilsNew.isNotUndefinedOrNull(this.opencgaSession.project));
        this.components = this.config.components.filter(this.isVisible).slice(0, 4);

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

    isVisible(item) {
        switch (item.visibility) {
        case "public":
            return true;
        case "private":
            return UtilsNew.isNotUndefinedOrNull(this.opencgaSession) && UtilsNew.isNotEmpty(this.opencgaSession.token);
        case "none":
        default:
            return false;
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
                font-size: 20px;
                margin-top: -30px;
                letter-spacing: 0;
            }
            
            .hi-icon-wrap {
                text-align: center;
                margin: 0 auto;
                padding: 2em 0 3em;
            }
            .hi-icon {
                display: inline-block;
                cursor: pointer;
                margin: 15px 30px;
                width: 110px;
                height: 110px;
                border-radius: 50%;
                text-align: center;
                position: relative;
                z-index: 1;
            }
            .hi-icon a p {
                text-decoration: none;
                color: #000966;
            }
            .hi-icon a:hover p {
                text-decoration: none;
            }
            .hi-icon:after {
                pointer-events: none;
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                content: '';
                -webkit-box-sizing: content-box;
                -moz-box-sizing: content-box;
                box-sizing: content-box;
            }
            .hi-icon:before {
                /*font-family: 'ecoicon';*/
                speak: none;
                font-size: 48px;
                line-height: 110px;
                font-style: normal;
                font-variant: normal;
                text-transform: none;
                display: block;
                -webkit-font-smoothing: antialiased;
                color: #000966;
            }
            .hi-icon-mobile:before {
                content: "\\e009";
            }
            .hi-icon-animation .hi-icon {
                -webkit-transition: box-shadow 0.2s;
                -moz-transition: box-shadow 0.2s;
                transition: box-shadow 0.2s;
            }
            .hi-icon-animation p {
                -webkit-transition: all 0.3s;
                -moz-transition: all 0.3s;
                transition: all 0.3s;
                color: #797979;
            }
            .hi-icon-animation .hi-icon svg {
                -webkit-transition: -webkit-transform 0.2s, all 0.2s;
                -moz-transition: -moz-transform 0.2s, all 0.2s;
                transition: transform 0.2s, all 0.2s;
                fill: #000966;
                height: 90px;
                width: 90px;
            }
            .hi-icon-animation .hi-icon.fa,
            .hi-icon-animation .icon-wrapper:hover .hi-icon img{
                -webkit-transition: -webkit-transform 0.2s, all 0.2s;
                -moz-transition: -moz-transform 0.2s, all 0.2s;
                transition: transform 0.2s, all 0.2s;
            }
            .hi-icon-animation .hi-icon svg image{
                height: 90px;
                width: 90px;
            }
            .hi-icon-animation .hi-icon:after {
                top: 0;
                left: 0;
                padding: 0;
                box-shadow: 0 0 0 4px #000966;
                -webkit-transition: -webkit-transform 0.2s, opacity 0.2s;
                -moz-transition: -moz-transform 0.2s, opacity 0.2s;
                transition: transform 0.2s, opacity 0.2s;
            }
            .hi-icon-animation .icon-wrapper:hover {
                display: inline-block;
                text-decoration: none;
            }
            .hi-icon-animation .icon-wrapper:hover .hi-icon:after {
                -webkit-transform: scale(0.85);
                -moz-transform: scale(0.85);
                -ms-transform: scale(0.85);
                transform: scale(0.85);
                opacity: 0.5;
            }
            /* in case of svg or image[src=svg] icon */
            .hi-icon-animation .icon-wrapper:hover .hi-icon svg,
            .hi-icon-animation .icon-wrapper:hover .hi-icon img{
                transform: scale(0.85);
            }
            /* in case of fa icon*/
            .hi-icon-animation .icon-wrapper:hover .hi-icon.fa {
                transform: scale(0.85);
            }
            .hi-icon-animation .icon-wrapper:hover .hi-icon {
                box-shadow: 0 0 0 10px rgba(0, 9, 102, 1);
                color: #fff;
            }
            .hi-icon-animation .icon-wrapper:hover p {
                color: #000966;
            }
            .smaller {
                font-size: 75%;
            }

            .getting-started {
                display: inline-block;
                border: 4px #000966 solid;
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
                color: #000966;
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
                background: #000966;
            }

            .getting-started:hover span {
                -webkit-transform: scale(.8);
                -moz-transform: scale(.8);
                -ms-transform: scale(.8);
                transform: scale(.8);
                color: #fff
            }

            #title {
                font-size: 10em;
                text-align: center;
                font-weight: bold;
                letter-spacing: -20px;
                position: relative;
            }

            #title::first-letter {
                letter-spacing: -5px;
            }

            #title span.subtitle {
                font-size: 20px;
                margin-top: -30px;
                display: block;
                letter-spacing: 0;
            }

            #title .version {
                font-size: 15px;
                display: inline-block;
                vertical-align: top;
                letter-spacing: 0px;
                margin: 25px 0 0 0;
                position: absolute;
            }

            #title .bracket {
                font-size: 2em;
                color: black;
            }

            .footer {
                margin-bottom: 80px;
            }
        
            .hi-icon-wrap {
                display: grid;
                grid-template-columns: auto auto auto auto auto auto; /* TODO FIXME hi-icon:before seems to be a problem there are 5 items not 6 */
            }
        </style>
        
        <!-- This is where main application is rendered -->
        <div class="col-md-6 col-md-offset-3 welcome-center text-muted text-justify">
            <h1 id="title">IVA
                <p class="version">
                    <span class="bracket">(</span><span>${this.version}</span><span class="bracket">)</span>
                </p>
                <span class="subtitle">Interactive Variant Analysis</span>
            </h1>
            
            <p class="text-center">
                Welcome to the IVA tool for whole genome variant analysis.<br />
                This interactive tool allows finding genes affected by deleterious variants that segregate along family
                pedigrees, case-controls or sporadic samples.
            </p>
            <br>
            <!--<input type="text" class="form-control input-lg" id="welcomeSearchTextBoxOld" style="text-align: center;"-->
            <!--placeholder="Search for a gene, transcript, protein or a variant" on-blur="onBlur" on-keyup="onKeyup">-->
            <!--<br>-->
        
            ${this.checkProjects ? html`
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
                </div>`
            : null }
             
             <!--<div class="row hi-icon-wrap hi-icon-effect-9 hi-icon-animation">
                ${this.components.map( tool => html`
                    <div class="col-md-3 col-sm-6">
                        <a class="icon-wrapper" href="#${tool.id}/${this.checkProjects ? `${this.opencgaSession.project.id}/${this.opencgaSession.study.id}` : ''}">
                            <div class="hi-icon">
                                <img src="img/tools/icons/${tool.icon}" />
                            </div>
                            <p>${tool.title}</p>
                            <span class="smaller"></span>
                        </a>
                    </div> 
                `)}
            </div> -->
            
            
            <div class="row hi-icon-wrap hi-icon-effect-9 hi-icon-animation">
                ${this.config.menu.map( item => html`
                            ${item.submenu ? html`
                                <a class="icon-wrapper" href="#cat-${item.id}/${this.checkProjects ? `${this.opencgaSession.project.id}/${this.opencgaSession.study.id}` : ''}">
                                    <div class="hi-icon">
                                        <img src="img/tools/icons/${item.icon}" /> 
                                    </div>
                                    <p>${item.title}</p>
                                    <span class="smaller"></span>
                                </a>
                                ` : html`
                                    <a class="icon-wrapper" href="#${item.id}/${this.checkProjects ? `${this.opencgaSession.project.id}/${this.opencgaSession.study.id}` : ''}">
                                    <div class="hi-icon">
                                        <img src="img/tools/icons/${item.icon}" /> 
                                    </div>
                                    <p>${item.title}</p>
                                    <span class="smaller"></span>
                                </a>
                                `}
                `)}
            </div>

            <div class="row text-center">
                <a class="getting-started" href="#gettingstarted"><span>Getting started with IVA</span></a>
            </div>
                       
           <!-- <h4>Note</h4>
            <small>
                IVA web application makes an intensive use of the HTML5 standard and other cutting-edge web technologies such as
                Web Components,
                so only modern web browsers are fully supported, these include Chrome 49+, Firefox 45+, Microsoft Edge 14+,
                Safari 10+ and Opera 36+.
            </small>-->
            <p><img id="logo" src="img/opencb-logo.png"/></p>
        </div>
        `;
    }

}

customElements.define("welcome-web", WelcomeWeb);
