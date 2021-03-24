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
import "../lib/jsorolla/src/core/webcomponents/study/study-dashboard.js";

export default class WelcomeAdmin extends LitElement {

    constructor() {
        super();
        this.checkProjects = false;
    }

    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
            app: {
                type: Object
            },
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

    opencgaSessionObserver() {
        this._checkProjects();
    }

    _checkProjects() {
        return !!(UtilsNew.isNotUndefinedOrNull(this.opencgaSession) && UtilsNew.isNotUndefinedOrNull(this.opencgaSession.project));
    }



// <study-dashboard
// .config=${this.config}
//                     .opencgaSession=${this.opencgaSession}>
// </study-dashboard>
    // TODO Add content 
    render() {
        return html`
            <div>ksaksa aslklks salksalk sallklk as</div>

            <div class="row hi-icon-wrap hi-icon-effect-9 hi-icon-animation">
                <a class="icon-wrapper" href="#study-dashboard"">
                    <p>Study Dashboard</p>
                    <span class="smaller"></span>
                </a>
            </div>

        `;
    }

}

customElements.define("welcome-admin", WelcomeAdmin);
