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
import Utils from "../lib/jsorolla/src/core/utils.js";
import UtilsNew from "../lib/jsorolla/src/core/utilsNew.js";

export default class CategoryPage extends LitElement {

    constructor() {
        super();
        this._init();
    }

    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
            opencgaSession: {
                type: Object
            },
            config: {
                type: Object
            }
        };
    }

    _init() {
        this._prefix = "sf-" + Utils.randomString(6) + "_";
    }

    updated(changedProperties) {
        if (changedProperties.has("property")) {
            this.propertyObserver();
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

    renderHTML(html) {
        return document.createRange().createContextualFragment(`${html}`);
    }

    render() {
        return html`
        <style>
            #category-page {
                display: grid;
                grid-template-columns: repeat( auto-fit, 25% );
                grid-gap: 10px;
                padding: 10px;
            }
            #category-page > a.item{
                padding: 10px;
                display: block;
                color: #333;
                position: relative;
            }
            
            #category-page > a.item:hover{
                text-decoration: none;
            }

        
            #category-page .icon {
                width: 100px;
                vertical-align: bottom;
            }
            
            #category-page .description {
                padding: 10px
            }
            
            #category-page .section-title {
                grid-column: 1 / span 4;
                font-size: 2.5em;
                font-variant: all-small-caps;
                font-weight: 500;
                letter-spacing: 5px;
                margin-top: 1em;
                color: #000966;
                font-family: "Roboto",serif;
            }
            
            #category-page .lock-overlay {            
                position: absolute;
                background-image: linear-gradient(45deg, #4d4d4d80 25%, #47474780 25%, #47474780 50%, #4d4d4d80 50%, #4d4d4d80 75%, #47474780 75%, #47474780 100%);
                background-size: 40px 40px;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: -10px;
            }
        </style>

        <h1>${this.config.title}</h1>
        <div id="category-page">
            ${this.config.submenu && this.config.submenu.length ? this.config.submenu.map( (item, i) => item.category ? html`
                <div class="section-title">${item.title}</div>
                ` : item.separator ? null : item.disabled ? html`
                    <a  class="shadow-lg item ${item.disabled ? "disabled" : ""}">
                    <div class="lock-overlay">
                        <i class="fas fa-4x fa-lock"></i>
                    </div>
                        <div class="title uppercase">${item.title}</div>                    
                            <div class="text-icon ${i % 2 === 0 ? "green": i % 3 === 0 ? "red": ""}">
                                ${item.acronym ? item.acronym : item.title[0] + item.title[1] + item.title[2].toLowerCase()}
                                <!--<img src="img/tools/icons/${item.icon || "variant_browser.svg"}" /> -->
                            </div>
                            <div class="description">${this.renderHTML(item.description || "Lorem ipsom sic dolor")}</div>
                    
                                                
                    </a>` : html`
                    <a href="#${item.id}" class="shadow-lg item">
                            <div class="title uppercase">${item.title}</div>                    
                            <div class="text-icon ${i % 2 === 0 ? "green": i % 3 === 0 ? "red": ""}">
                                ${item.acronym ? item.acronym : item.title[0] + item.title[1] + item.title[2].toLowerCase()}
                                <!--<img src="img/tools/icons/${item.icon || "variant_browser.svg"}" /> -->
                            </div>
                            <div class="description">${this.renderHTML(item.description || "Lorem ipsom sic dolor")}</div>                    
                    </a>
            `) : null }
        </div>
        `;
    }

}

customElements.define("category-page", CategoryPage);
