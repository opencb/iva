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
import UtilsNew from "../lib/jsorolla/src/core/utilsNew.js";

export default class IvaProfile extends LitElement {

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
        this._prefix = "p-";
    }

    connectedCallback() {
        super.connectedCallback();
        this._config = {...this.getDefaultConfig(), ...this.config};

    }

    updated(changedProperties) {
        if (changedProperties.has("property")) {
            this.propertyObserver();
        }
    }

    /*
    * */
    getDefaultConfig() {
        const u = {
            "id": "aaltamura",
            "name": "Antonio Altamura",
            "email": "aaltamura@opencb.org",
            "organization": "",
            "account": {"type": "FULL", "creationDate": "", "expirationDate": "", "authentication": {"id": "internal", "application": false}},
            "internal": {"status": {"name": "READY", "date": "20200204101741", "description": ""}},
            "quota": {"diskUsage": -1, "cpuUsage": -1, "maxDisk": -1, "maxCpu": -1},
            "projects": [],
            "configs": {},
            "filters": [],
            "attributes": {}
        };
        return {
            title: "Your profile",
            icon: "",
            display: {
                collapsable: true,
                showTitle: false,
                labelWidth: 2,
                defaultVale: "-"
            },
            sections: [
                {
                    title: "General",
                    collapsed: false,
                    elements: [
                        {
                            name: "id",
                            field: "id"
                        },
                        {
                            name: "Name",
                            field: "name"
                        },
                        {
                            name: "Organization",
                            field: "organization"
                        },
                        {
                            name: "Account type",
                            field: "account.type"
                        },
                        {
                            name: "Status",
                            field: "internal.status",
                            type: "custom",
                            display: {
                                render: field => html`${field.name} (${UtilsNew.dateFormatter(field.date)})`
                            }
                        },
                        {
                            name: "Quota",
                            field: "quota",
                            type: "custom",
                            display: {
                                render: field => html`${Object.entries(field).map( ([k, v]) => html`${k}:${v}<br>`)}`
                            }
                        }
                    ]
                }
            ]
        };
    }


    render() {
        return html`
            <div class="page-title">
                <h2>
                    <i class="${this._config.icon}" aria-hidden="true"></i>&nbsp;${this._config.title}
                </h2>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <data-view .data=${this.opencgaSession?.user} .config="${this._config}"></data-view>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("iva-profile", IvaProfile);
