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

export default class Breadcrumb extends LitElement {

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
            query: {
                type: Object
            },
            config: {
                type: Object
            }
        }
    }

    _init(){
        this._prefix = "bc-" + Utils.randomString(6) + "_";
    }

    updated(changedProperties) {
    }

    buildHash() {
        let hashFrag = "";
        if (this.opencgaSession.project && this.opencgaSession.project.alias) {
            hashFrag += "/" + this.opencgaSession.project.id;
            if (this.opencgaSession.study && this.opencgaSession.study.alias) {
                hashFrag += "/" + this.opencgaSession.study.id;
            }
        }
        return hashFrag;
    }

    render() {
        return html`
        <style>
            .breadcrumb{
                padding-left: 40px;
            }
        </style>
        <div>
            <ol class="breadcrumb">
                <li>
                    <a href="#projects/${this.buildHash()}" data-category="${this.config.breadcrumb.title}">${this.config.breadcrumb.title}</a></li>
                </li>
                ${!this.opencgaSession.study || Object.keys(this.opencgaSession.study).length === 0 ? html`
                    <li class="active">
                        ${this.opencgaSession.project.alias}
                    </li>` : html`
                    <li>
                        <a href="#project/${this.buildHash()}" data-category="project">${this.opencgaSession.project.alias}</a></li>
                    </li>
                    ${this.samples && this.samples.length ? html`
                        <li>
                            <a href="#browser/${this.buildHash()}" data-category="study">${this.opencgaSession.study.alias}</a>
                        </li>
                        <li class="active">
                            ${this.samples.map( sample => html`${sample.name}`)}
                        </li>
                    ` : html`
                       <li class="active">
                            ${this.opencgaSession.study.alias}
                        </li>
                    `}
                 `}
            </ol>
        </div>
        `;
    }
}

customElements.define("bread-crumb", Breadcrumb);
