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
import "../lib/jsorolla/src/core/webcomponents/commons/view/data-form.js";

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

    }

    connectedCallback() {
        super.connectedCallback();
        this._config = {...this.getDefaultConfig(), ...this.config};

    }

    updated(changedProperties) {
        if (changedProperties.has("property")) {
            this.propertyObserver();
        }
        if (changedProperties.has("opencgaSession")) {
            this.opencgaSessionObserver();
        }
    }

    opencgaSessionObserver() {
        this.currentUser = this.opencgaSession.user;
        this.requestUpdate();

    }

    onFilterChange(field, value) {
        console.log("field, value", field, value)

    }

    getDefaultConfig() {
        return {
            title: "Your profile",
            icon: "",
            display: {
                collapsable: true,
                showTitle: false,
                labelWidth: 2,
                defaultValue: "-"
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
                            name: "Project and studies (you belong / permission)"
                        }
                        /*{
                            name: "Quota",
                            field: "quota",
                            type: "custom",
                            display: {
                                render: field => html`${Object.entries(field).map( ([k, v]) => html`${k}:${v}<br>`)}`
                            }
                        }*/
                    ]
                },
                {
                    title: "Administration",
                    collapsed: false,
                    elements: [
                        {
                            name: "User",
                            field: "user.id",
                            type: "custom",
                            display: {
                                render: data => {
                                    const config = {
                                        addButton: false,
                                        fields: item => ({
                                            name: item.id
                                        }),
                                        dataSource: (query, process) => {
                                            this.opencgaSession.opencgaClient.studies().acl(this.opencgaSession.study.fqn).then(restResponse => {
                                                const results = restResponse.getResults();
                                                process(results.map(config.fields));
                                            });
                                        }
                                    };
                                    return html`<select-field-filter-autocomplete .opencgaSession="${this.opencgaSession}" .config=${config} .value="${this.value}" @filterChange="${e => this.onFilterChange("userid", e.detail.value)}"></select-field-filter-autocomplete>`
                                }
                            }
                        },
                        {
                            name: "Study",
                            field: "study",
                            type: "select",
                            allowedValues: ["study1"],
                            defaultValue: ["study1"],
                            errorMessage: "No found...",
                            display: {
                                width: 9
                            }
                        }
                    ]
                },

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
                        <data-form .data=${this.currentUser} .config="${this._config}"></data-form>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define("iva-profile", IvaProfile);
