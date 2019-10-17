/**
 * Created by Antonio Altamura on 07/10/2019.
 */

import {LitElement, html} from '/web_modules/lit-element.js';

export default class ContactWeb extends LitElement {
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
                <h1>Contact</h1>
            </div>
        </div>
        `;
    }
}

customElements.define('contact-web',ContactWeb);