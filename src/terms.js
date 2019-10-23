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

export default class TermsWeb extends LitElement {

	constructor() {
		super()
	}

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <h1>Terms</h1>
            </div>
        </div>
        `;
	}
}

customElements.define("terms-web", TermsWeb);
