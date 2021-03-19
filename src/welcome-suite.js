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

export default class WelcomeSuite extends LitElement {

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

    update(changedProperties) {
        if (changedProperties.has("opencgaSession")) {
            this.opencgaSessionObserver();
        }

        super.update(changedProperties);
    }

    opencgaSessionObserver() {
        this._checkProjects();
    }

    _checkProjects() {
        return !!(UtilsNew.isNotUndefinedOrNull(this.opencgaSession) && UtilsNew.isNotUndefinedOrNull(this.opencgaSession.project));

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


    //TODO Add content
    render() {
        return html`
            <div class="col-md-6 col-md-offset-3 col-sm-12 welcome-center text-muted text-justify">
                <h1 style="text-align:center">
                    OpenCB Suite
                </h1>
                ${UtilsNew.renderHTML(this.config.welcomePageContent)}

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
            
                ${UtilsNew.renderHTML(this.config.welcomePageFooter)}
            </div>
            `;
    }

}

customElements.define("welcome-suite", WelcomeSuite);
