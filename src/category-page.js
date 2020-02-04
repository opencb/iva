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

import {LitElement, html, css} from "/web_modules/lit-element.js";

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
        }
    }

    _init(){
        this._prefix = "sf-" + Utils.randomString(6) + "_";

        this.hh = "<button>button</button>"
    }

    updated(changedProperties) {
        if(changedProperties.has("property")) {
            this.propertyObserver();
        }
    }

    isVisible(item) {
        console.log("this" ,this)
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
                font-size: 2em;
                margin-top: 2em;
                color: #000966;
            }
        </style>

        <h2>${this.config.title}</h2>
        <div id="category-page">
            ${this.config.submenu && this.config.submenu.length ? this.config.submenu.map( item => item.category ? html`
                <div class="section-title">${item.title}</div>
                ` : item.separator ? null : html`
                    <a href="#${item.id}" class="shadow-lg item">
                            <div class="title uppercase">${item.title}</div>                    
                            <div class="icon inline-block">
                                <img src="img/tools/icons/${item.icon || "variant_browser.svg"}" />
                            </div>
                            <div class="description inline-block">${this.renderHTML(item.description || "Lorem ipsom sic dolor")}</div>                    
                    </a>
            `) : null }
        </div>
        `;
    }
}

customElements.define("category-page", CategoryPage);
