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

//import { LitElement, html } from 'lit-element'; // bare import by name doesn't work yet in browser,
// see: https://www.polymer-project.org/blog/2018-02-26-3.0-preview-paths-and-names
import {LitElement, html} from "/web_modules/lit-element.js";
import {OpenCGAClient, OpenCGAClientConfig} from "../lib/jsorolla/src/core/clients/opencga-client.js";
import {CellBaseClient, CellBaseClientConfig} from "../lib/jsorolla/src/core/clients/cellbase-client.js";
import {ReactomeClient} from "../lib/jsorolla/src/core/clients/reactome-client.js";

// import {OpencgaLogin,
//     OpencgaVariantBrowser
// } from "../lib/jsorolla/components.js";

import "./welcome.js";
import "./about.js";
import "./contact.js";
import "./faq.js";
import "./terms.js";
import "./getting-started.js";
import "./opencga-breadcrumb.js";
import "./category-page.js";

import "../lib/jsorolla/src/core/webcomponents/variant/opencga-variant-facet.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/clinical/opencga-clinical-portal.js";
import "../lib/jsorolla/src/core/webcomponents/variant/variant-beacon.js";
import "../lib/jsorolla/src/core/webcomponents/variant/opencga-variant-browser.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/opencga-projects.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/samples/opencga-sample-browser.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/files/opencga-file-browser.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/opencga-transcript-view.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/opencga-gene-view.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/samples/opencga-sample-view.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/opencga-transcript-view.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/opencga-protein-view.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/opencga-login.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/individual/opencga-individual-browser.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/family/opencga-family-browser.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/cohorts/opencga-cohort-browser.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/clinical/opencga-clinical-analysis-browser.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/files/opencga-file-facet.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/samples/opencga-samples-facet.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/individual/opencga-individual-facet.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/family/opencga-family-facet.js";
import "../lib/jsorolla/src/core/webcomponents/opencga/catalog/cohorts/opencga-cohort-facet.js";
import "../lib/jsorolla/src/core/webcomponents/variant/analysis/opencga-gwas-analysis.js";
import "../lib/jsorolla/src/core/webcomponents/variant/opencga-variant-interpretation.js";

class IvaApp extends LitElement {

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
            // samples: {
            //     type: Array
            // },
            // studySummaries: {
            //     type: Array
            // },
            // tool: {
            //     type: String
            // },
            cellbaseClient: {
                type: Object
            },
            config: {
                type: Object
            }
        }
    }

    /**
     * This function creates all the initial configuration
     * @private
     */
    _init() {
        // Create the 'config' , this objects contains all the different configuration
        let _config = application;
        _config.menu.counter = 0;
        _config.cellbase = cellbase;
        _config.tools = tools;
        _config.opencga = opencga;
        // _config.species = DEFAULT_SPECIES;
        _config.enabledComponents = {};
        // _config.panelExamples = diseasePanels;
        _config.populationFrequencies = populationFrequencies;
        _config.proteinSubstitutionScores = proteinSubstitutionScores;
        _config.consequenceTypes = consequenceTypes;

        // We can customise which components are active by default, this improves the first loading time.
        _config.enabledComponents.home = true;
        _config.enabledComponents.about = false;
        _config.enabledComponents.contact = false;
        _config.enabledComponents.terms = false;
        _config.enabledComponents.faq = false;
        _config.enabledComponents.gettingstarted = false;
        _config.enabledComponents["files-facet"] = false;
        _config.enabledComponents["sample-grid"] = false;

        // Enable tools reading the configuration
        for (let tool in _config.tools) {
            if (UtilsNew.isNotUndefinedOrNull(_config.tools[tool].active)) {
                _config.enabledComponents[tool] = _config.tools[tool].active;
            }
        }

        //console.log("this.config.enabledComponents",_config.enabledComponents)
        // Enabled components catalog
        let components = [
            "login",
            "projects",
            "project",
            "sample",
            "files",
            "samples",
            "individuals",
            "families",
            "cohorts",
            "clinicalAnalysis",
            "clinicalAnalysisPortal",
            "clinicalAnalysisCreator",
            "settings",
            "gene",
            "transcript",
            "protein",
            "files-facet",
            "sample-browser",
            "samples-facet",
            "individual-facet",
            "family-facet",
            "cohort-facet",
            "cat-browser",
            "cat-analysis",
            "cat-clinical",
            "cat-catalog",
            "cat-ga4gh",
            "gwas"];

        for (let component of components) {
            _config.enabledComponents[component] = false;
        }

        // We set the global Polymer variable, this produces one single event
        this.config = _config;


        // We deep clone some config sections for having a default initial copy, this allows us to reset config.
        this.defaultConfig = {};
        if (UtilsNew.isNotUndefined(populationFrequencies)) {
            this.defaultConfig.populationFrequencies = JSON.parse(JSON.stringify(populationFrequencies));
        }
        if (UtilsNew.isNotUndefined(proteinSubstitutionScores)) {
            this.defaultConfig.proteinSubstitutionScores = JSON.parse(JSON.stringify(proteinSubstitutionScores));
        }
        if (UtilsNew.isNotUndefined(consequenceTypes)) {
            this.defaultConfig.consequenceTypes = JSON.parse(JSON.stringify(consequenceTypes));
        }


        // We need to listen to hash fragment changes to update the display and breadcrumb
        let _this = this;
        window.onhashchange = function () {
            _this.hashFragmentListener(_this);
        };

        // Remember the tool that was previously set
        this.tool = window.location.hash.split("/")[0];
        if (UtilsNew.isEmpty(this.tool)) {
            this.tool = "#home";
        }

        // Go to the page that tool has
        if (window.location.hash !== this.tool) {
            window.location.hash = this.tool;
        }


        // Other initialisations
        this.icd10 = ICD_10;
        this._isBreadcrumbVisible = false;
        // This manages the samples selected in each tool for updating the breadcrumb
        this.samples = [];
        this._samplesPerTool = {};


        // Initialise clients and create the session
        this.opencgaClientConfig = new OpenCGAClientConfig(this.config.opencga.host, this.config.opencga.version, true, this.config.opencga.cookie.prefix);
        this.opencgaClientConfig.serverVersion = this.config.opencga.serverVersion;
        this.opencgaClient = new OpenCGAClient(this.opencgaClientConfig);

        this.cellBaseClientConfig = new CellBaseClientConfig(this.config.cellbase.hosts, this.config.cellbase.version, "hsapiens");
        this.cellbaseClient = new CellBaseClient(this.cellBaseClientConfig);


        console.log("cellbaseClient iva-app", this.cellbaseClient)

        this.reactomeClient = new ReactomeClient();

        let sid = Cookies.get(this.config.opencga.cookie.prefix + "_sid");
        if (UtilsNew.isNotEmpty(sid)) {    // && !this._publicMode
            this.opencgaClient._config.sessionId = sid;
            this._createOpenCGASession();
            // This must happen after creating the OpencgaClient
            this.checkSessionActive();
            this.intervalCheckSession = setInterval(this.checkSessionActive.bind(this), this.config.session.checkTime);
        } else {
            this._createOpencgaSessionFromConfig();
        }

        // this.browserSearchQuery = {gene: "BRCA2", sample: "NA12877", study: "platinum"};
        // this.browserSearchQuery = {};

        //run the observer the first time doesnt work TODO check why
        //this.opencgaSessionObserver();

        this.browserSearchQuery = {};
        //keeps track of the executedQueries transitioning from browser tool to facet tool
        this.queries = []
    }

    updated(changedProperties) {
        if (changedProperties.has("opencgaSession")) {
            this.opencgaSessionObserver()
        }
    }


    opencgaSessionObserver() {
        this.renderHashFragments();
        // this._isBreadcrumbVisible = this.config.breadcrumb.visible && this.opencgaSession.projects !== undefined && this.opencgaSession.projects.length !== 0;
        this.requestUpdate()
        //this.renderBreadcrumb();
    }

    _createOpenCGASession() {
        let _this = this;
        let opencgaSession = this.opencgaClient.createSession()
            .then(function (response) {

                console.log("_createOpenCGASession",response)
                // check if project array has been defined in the config.js
                if (UtilsNew.isNotEmptyArray(_this.config.opencga.projects)) {
                    // We store the project and study ids the user needs to visualise (defined in the config.js)
                    let configProjects = {};
                    for (let i = 0; i < _this.config.opencga.projects.length; i++) {
                        configProjects[_this.config.opencga.projects[i].id] = [];

                        for (let j = 0; j < _this.config.opencga.projects[i].studies.length; j++) {
                            configProjects[_this.config.opencga.projects[i].id].push(
                                _this.config.opencga.projects[i].studies[j].id
                            );
                        }
                    }

                    // We must keep only the projects defined in the configuration file
                    let activeProjects = [];
                    for (let i = 0; i < response.projects.length; i++) {
                        if (response.projects[i].id in configProjects) {
                            let project = response.projects[i];
                            let activeStudies = [];
                            for (let j = 0; j < project.studies.length; j++) {
                                let study = project.studies[j];
                                if (configProjects[project.id].indexOf(study.id) > -1) {
                                    activeStudies.push(study);
                                }
                            }

                            // We replace the studies obtained with the ones from the configuration file
                            project.studies = activeStudies;
                            activeProjects.push(project);
                        }
                    }

                    // TODO we must query projects/info URL to get the whole object
                    response.projects = activeProjects;
                    if (UtilsNew.isNotEmptyArray(response.projects[0].studies)) {
                        response.project = response.projects[0];
                        response.study = response.projects[0].studies[0];
                    }
                }

                // this forces the observer to be executed.
                _this.opencgaSession = Object.assign({}, response);
                //_this.set('config.menu', application.menu.slice()); // Do not remove: this is for refreshing the menu
                //TODO check if render works
                _this.config.menu = application.menu.slice()
                _this.config = {..._this.config}
            })
            .catch(function (response) {
                console.log("An error when creating the OpenCGA session:");
                console.log(response);
            });
    }

    _createOpencgaSessionFromConfig() {
        // Create a private opencga-session to avoid calling to the Observer
        let opencgaSession = this.opencgaClient.createAnonymousSession();

        // If 'config.opencga.anonymous' exists and contains either 'user' or 'projects'
        if (UtilsNew.isNotUndefinedOrNull(this.config.opencga.anonymous) && Object.keys(this.config.opencga.anonymous).length > 0) {
            // If 'projects' is defined we only load those projects
            if (UtilsNew.isNotUndefinedOrNull(this.config.opencga.anonymous.projects)) {
                if (this.config.opencga.anonymous.projects.length > 0) {
                    // TODO we must query projects/info URL to get the whole object
                    opencgaSession.projects = this.config.opencga.anonymous.projects;
                    if (UtilsNew.isNotEmptyArray(opencgaSession.projects[0].studies)) {
                        opencgaSession.project = opencgaSession.projects[0];
                        opencgaSession.study = opencgaSession.projects[0].studies[0];
                    }
                }

                // This triggers the event and call to opencgaSessionObserver
                this.opencgaSession = opencgaSession;
            } else {
                // When no 'projects' is defined we fetch all public projects
                if (UtilsNew.isNotUndefinedOrNull(this.config.opencga.anonymous.user)) {
                    let _this = this;
                    this.opencgaClient.users().getProjects(this.config.opencga.anonymous.user, {})
                        .then(function (response) {
                            // _this._setup(_projects);

                            opencgaSession.projects = response.response[0].result;
                            if (UtilsNew.isNotEmptyArray(opencgaSession.projects) && UtilsNew.isNotEmptyArray(opencgaSession.projects[0].studies)) {
                                // this sets the current active project and study
                                opencgaSession.project = opencgaSession.projects[0];
                                opencgaSession.study = opencgaSession.projects[0].studies[0];
                            }

                            // This triggers the event and call to opencgaSessionObserver
                            _this.opencgaSession = opencgaSession;
                        })
                        .catch(function (response) {
                            console.log("An error when getting projects: ", response);
                        });
                }
            }
        } else {
            // This triggers the event and call to opencgaSessionObserver
            this.opencgaSession = opencgaSession;
        }
    }

    login(credentials) {
        // This creates a new authenticated opencga-session object

        console.log("iva-app: roger I'm in", credentials);
        this.opencgaClient._config.sessionId = credentials.detail.sessionId;
        this._createOpenCGASession();


        if (this.tool === "#login") {
            this.tool = "#home";
        }

        // 60000 ms = 1 min. Every 1 min we check if session is close to expire.
        this.intervalCheckSession = setInterval(this.checkSessionActive.bind(this), this.config.session.checkTime);
    }

    refresh() {
        this.opencgaClient.refresh();
    }

    logout() {
        // this delete sessionId in the client and removes the Cookies
        this.opencgaClient.logout();
        this._createOpencgaSessionFromConfig();

        //TODO check if render works
        this.config.menu = application.menu.slice(); // Do not remove: this is for refreshing the menu

        this.tool = "#home";
        window.location.hash = "home";

        window.clearInterval(this.intervalCheckSession);
    }

    onUrlChange(e) {
        let hashFrag = e.detail.id;
        if (UtilsNew.isNotUndefined(this.opencgaSession.project) && UtilsNew.isNotEmpty(this.opencgaSession.project.alias)) {

            hashFrag += "/" + this.opencgaSession.project.alias;
            if (UtilsNew.isNotUndefined(this.opencgaSession.study) && UtilsNew.isNotEmpty(this.opencgaSession.study.alias)) {
                hashFrag += "/" + this.opencgaSession.study.alias;
            }
        }

        let myQueryParams = [];
        for (let key in e.detail.query) {
            myQueryParams.push(key + "=" + e.detail.query[key]);
        }
        if (myQueryParams.length > 0) {
            hashFrag += `?${myQueryParams.join("&")}`;
        }

        window.location.hash = hashFrag;
    }

    checkSessionActive() {
        let _message = "";
        // We check if refresh token has updated session id cookie
        // let sid = Cookies.get(this.config.opencga.cookie.prefix + "_sid");

        if (UtilsNew.isNotUndefinedOrNull(this.opencgaClient._config.sessionId)) {    // UtilsNew.isNotEmpty(this.opencgaSession.token) &&
            // this.sessionId = sid;
            let decoded = jwt_decode(this.opencgaClient._config.sessionId);
            let currentTime = new Date().getTime();
            let remainingTime = ((decoded.exp * 1000) - currentTime);
            // 600000 ms = 10 min = 1000(1sec) * 60(60 sec = 1min) * 10(10 min)
            if (remainingTime <= this.config.session.maxRemainingTime && remainingTime >= this.config.session.minRemainingTime) {
                let remainingMinutes = Math.floor(remainingTime / this.config.session.minRemainingTime);
                _message = "Your session is close to expire. <strong>" + remainingMinutes + ` minutes remaining</strong>. <a href="#" onclick='eval(NotificationUtils.refreshToken()); return false;'>Click here to refresh</a>`;
            } else {
                if (remainingTime < this.config.session.minRemainingTime) {
                    _message = "Your session has expired.";
                    this.logout();
                    window.clearInterval(this.intervalCheckSession);
                } else {
                    if (UtilsNew.isNotUndefinedOrNull(this.notifySession)) {
                        NotificationUtils.closeNotify(this.notifySession);
                    }
                    return;
                }
            }
        } else {
            // _message = "Your session has expired.";
            // window.clearInterval(this.intervalCheckSession);
        }
        // delay = 0 to fix the notify until user closes it.
        if (UtilsNew.isNotEmpty(_message)) {
            this.notifySession = NotificationUtils.showNotify(_message, UtilsNew.MESSAGE_INFO,
                {}, {
                    delay: 0,
                    onClosed: this.onCloseRefreshNotify.bind(this)
                }, this.opencgaClient, this.notifySession);
        }
    }

    onCloseRefreshNotify() {
        delete this.notifySession;
    }

    changeTool(e) {
        $(".navbar-inverse ul > li", this).removeClass("active");
        $(e.target).parent("li").addClass("active");
        if($(e.target).closest("ul").hasClass("dropdown-menu")) {
            $(e.target).closest("ul").closest("li").addClass("active");
        }

        if (UtilsNew.isNotUndefined(e)) {
            e.preventDefault(); // prevents the hash change to "#" and allows to manipulate the hash fragment as needed
        }

        if (UtilsNew.isNotUndefined(e.target) && UtilsNew.isNotUndefined(e.target.attributes.href)) {
//                    $(e.target.attributes.href.value).show(); // get the href and use it find which div to show
            this.tool = e.target.attributes.href.value;
            if (UtilsNew.isNotUndefinedOrNull(this._samplesPerTool)) {
                if (this._samplesPerTool.hasOwnProperty(this.tool.replace("#", ""))) {
                    this.samples = this._samplesPerTool[this.tool.replace("#", "")];
                } else {
                    this.samples = [];
                }
            }
            // this.renderBreadcrumb()
        } else {
            this.tool = "#home";
        }

        this.renderHashFragments();
    }

    // _setup(projects) {
    //     // We check that at least one project with one study exist, otherwise we do not do anything
    //     if (UtilsNew.isNotUndefined(projects) && projects.length > 0 && projects[0].studies.length > 0) {
    //         this.projects = projects;
    //         this.project = projects[0];
    //         this.study = projects[0].studies[0];
    //
    //         let _this = this;
    //         let projectPromises = [];
    //         projects.forEach(function (project) {
    //             let studyPromises = [];
    //             project.studies.forEach(function (study) {
    //                 studyPromises.push(_this.opencgaClient.studies().summary(project.alias + ":" + study.alias));
    //             });
    //             projectPromises.push(Promise.all(studyPromises)
    //                 .then(function (responses) {
    //                     let studies = [];
    //                     responses.forEach(function (response) {
    //                         let study = response.response[0].result[0];
    //                         study.creationDate = moment(study.creationDate, "YYYYMMDDHHmmss").format('D MMM YY');
    //                         studies.push(study);
    //                     });
    //                     return studies;
    //                 }));
    //         });
    //
    //         let _projects = [];
    //         Promise.all(projectPromises)
    //             .then(function (responses) {
    //                 for (let i = 0; i < responses.length; i++) {
    //                     _projects.push({
    //                         id: _this.projects[i].id,
    //                         alias: _this.projects[i].alias,
    //                         name: _this.projects[i].name,
    //                         organism: _this.projects[i].organism,
    //                         studies: responses[i]
    //                     });
    //                 }
    //                 _this.studySummaries = _projects;
    //             });
    //     }
    // }

    renderHashFragments() {
        console.log("renderHashFragments - DEBUG", this.tool)
        let hashFrag = this.tool;
        if (UtilsNew.isNotUndefined(this.opencgaSession.project) && UtilsNew.isNotEmpty(this.opencgaSession.project.alias)) {

            hashFrag += "/" + this.opencgaSession.project.id;
            if (UtilsNew.isNotUndefined(this.opencgaSession.study) && UtilsNew.isNotEmpty(this.opencgaSession.study.alias)) {
                hashFrag += "/" + this.opencgaSession.study.id;
            }
        }

        if (window.location.hash === hashFrag) {
            this.hashFragmentListener(this);
        } else {
            window.location.hash = hashFrag;
        }

    }

    hashFragmentListener(ctx) {
        console.log("hashFragmentListener - DEBUG", this.tool)
        // Hide all elements
        for (let element in this.config.enabledComponents) {
            if (UtilsNew.isNotUndefined(this.config.enabledComponents[element])) {
                this.config.enabledComponents[element] = false
            }
        }

        let arr = window.location.hash.split("/");
        let [hashTool, hashProject, hashStudy, feature] = arr;

        // Stopping the recursive call
        if (hashTool !== this.tool || (UtilsNew.isNotUndefined(this.opencgaSession) && UtilsNew.isNotUndefined(this.opencgaSession.project) && hashProject !== this.opencgaSession.project.alias) ||
            (UtilsNew.isNotUndefined(this.study) && hashStudy !== this.opencgaSession.study.alias)) {
            if (arr.length > 1) {
                // Field 'project' is being observed, just in case Polymer triggers
                // an unnecessary event we can check they are really different
                if (ctx.opencgaSession.project.alias !== hashProject) {
                    ctx.opencgaSession.project.alias = hashProject;
                }
                if (arr.length > 2 && ctx.opencgaSession.study !== hashStudy) {
                    for (let i = 0; i < ctx.opencgaSession.projects.length; i++) {
                        if (ctx.opencgaSession.projects[i].name === ctx.opencgaSession.project.name
                            || ctx.opencgaSession.projects[i].alias === ctx.opencgaSession.project.alias) {
                            for (let j = 0; j < ctx.opencgaSession.projects[i].studies.length; j++) {
                                if (ctx.opencgaSession.projects[i].studies[j].name === hashStudy || ctx.opencgaSession.projects[i].studies[j].alias === hashStudy) {
                                    ctx.opencgaSession.study = ctx.opencgaSession.projects[i].studies[j];
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            }

            switch (hashTool) {
            case "#browser":
                this.browserSearchQuery = Object.assign({}, this.browserSearchQuery);
                break;
            case "#protein":
                break;
            case "#interpretation":
                this.clinicalAnalysisId = feature;
                break;
            }


            if (UtilsNew.isNotEmpty(feature)) {
                if (hashTool === "#protein") {
                    ctx.protein = feature;
                } else if (feature.startsWith("ENST")) {
                    ctx.transcript = feature;
                } else {
                    ctx.gene = feature;
                }
            }
            ctx.tool = hashTool;
        }

        let searchArr = window.location.hash.split("?");
        if (searchArr.length > 1) {
            let search = searchArr[1];
            arr = search.split("&");
            let query = {};
            for (let i = 0; i < arr.length; i++) {
                let split = arr[i].split("=");
                query[split[0]] = split[1];
            }
            this.query = query;
        }

        if (UtilsNew.isNotUndefined(this.config.enabledComponents[this.tool.replace("#", "")])) {
            this.config.enabledComponents[this.tool.replace("#", "")] = true;
        }

        this.config = {...this.config};
    }

    refreshConfig(e) {
        let colorConfig = e.detail.config;
        let _this = this;
        for (let key in colorConfig) {
            switch (key) {
            case "consequenceTypes":
                let ctColor = colorConfig[key].color;
                for (let impact in ctColor) {
                    _this.consequenceTypes.color[impact] = ctColor[impact];
                }
                let ctModified = Object.assign({}, _this.consequenceTypes);
                _this.consequenceTypes = ctModified;
                break;
            case "proteinSubstitutionScores":
                for (let source in colorConfig[key]) {
                    if (source === "sift") {
                        let sift = colorConfig[key].sift;
                        for (let prediction in sift) {
                            _this.proteinSubstitutionScores.sift[prediction] = sift[prediction];
                        }
                    } else if (source === "polyphen") {
                        let polyphen = colorConfig[key].polyphen;
                        for (let pred in polyphen) {
                            _this.proteinSubstitutionScores.polyphen[pred] = polyphen[pred];
                        }
                    }
                }
                let pssModified = Object.assign({}, _this.proteinSubstitutionScores);
                _this.proteinSubstitutionScores = pssModified;
                break;
            case "populationFrequencies":
                let pfColor = colorConfig[key].color;
                for (let i in pfColor) {
                    _this.populationFrequencies.color[i] = pfColor[i];
                }
                let pfModified = Object.assign({}, _this.populationFrequencies);
                _this.populationFrequencies = pfModified;
                break;
            }
        }
    }

    onStudySelect(e) {
        e.preventDefault(); // prevents the hash change to "#" and allows to manipulate the hash fragment as needed
        let [_studyname, _projectname] = [e.target.getAttribute("data-study"), e.target.getAttribute("data-project")]
        let _project, _study;
        for (let i = 0; i < this.opencgaSession.projects.length; i++) {
            if (this.opencgaSession.projects[i].name === _projectname) {
                _project = this.opencgaSession.projects[i];
                for (let j = 0; j < this.opencgaSession.projects[i].studies.length; j++) {
                    if (this.opencgaSession.projects[i].studies[j].name === _studyname
                        || this.opencgaSession.projects[i].studies[j].alias === _studyname) {
                        _study = this.opencgaSession.projects[i].studies[j];
                        break;
                    }
                }
                break;
            }
        }
        this.opencgaSession = {...this.opencgaSession, project: _project, study: _study};
    }

    updateProject(e) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].name === e.detail.project.name) { // getting the selected project from projects array
                this.project = this.projects[i];
            }
        }
        this.tool = "#project";
        this.renderHashFragments();
        // this.renderBreadcrumb();
    }

    updateStudy(e) {
        if (UtilsNew.isNotUndefined(e.detail.project) && UtilsNew.isNotEmpty(e.detail.project.name)) {
            this.project = e.detail.project;
        }
        for (let i = 0; i < this.project.studies.length; i++) {
            if (this.project.studies[i].name === e.detail.study.name || this.project.studies[i].alias === e.detail.study.alias) {
                this.study = this.project.studies[i];
            }
        }

//                TODO: Opencga study will be shown later. For now variant browser is shown when the study changes
//                this.tool = "studyInformation";
        this.tool = "#browser";
        this.renderHashFragments();
        // this.renderBreadcrumb();
    }

    onSampleChange(e) {
        if (UtilsNew.isNotUndefinedOrNull(this.samples) && UtilsNew.isNotUndefinedOrNull(e.detail)) {
            this.samples = e.detail.samples;
            this._samplesPerTool[this.tool.replace("#", "")] = this.samples;
            // this.renderBreadcrumb();
        }
    }

    buildQuery(e) {
        let query = {};
        let value = "";
        if (UtilsNew.isNotUndefined(e) && UtilsNew.isNotUndefined(e.detail.value)) {
            value = e.detail.value; // It takes care of the fired event from welcome.html
        } else if (UtilsNew.isNotUndefined(e) && e.keyCode === "13" || UtilsNew.isNotUndefined(e) && e.type === "click") {
            value = this.querySelector("#" + searchTextBox).value;  // When enter key is pressed or search icon is clicked, it takes the value entered and assign it
        }

        if (value !== "") {
            if (value.startsWith("rs") || value.split(":").length > 2) {
                query.ids = value;
            } else if (value.indexOf(":") > -1 && value.indexOf("-") > -1) {
                query.region = value;
            } else if (value.startsWith("GO:")) {
                query["annot-go"] = value;
            } else if (value.startsWith("HP:")) {
                query["annot-hpo"] = value;
            } else if (value.startsWith("ENST")) {
                this.transcript = value;
                this.tool = "#transcript";
            } else {
                this.gene = value.toUpperCase();
                this.tool = "#gene";
            }

            // This query object is built for variant browser. Only when the queries to browser are made, we are setting the tool to browser
            if (Object.keys(query).length > 0) {
                this._query = query;
                this.tool = "#browser";
            }

            this.renderHashFragments();
            //TODO convert in LitElement compliant
            this.$.searchTextBox.value = ""; // Empty the value of search text box when search is complete and respective view is loaded
        }
    }

    onQuickSearch(e) {
        let gene = PolymerUtils.getValue("searchTextBox");
        if (UtilsNew.isNotUndefinedOrNull(this.tool)) {
            let _query = {
                xref: gene
            };
            switch (this.tool) {
            case "#browser":
                window.location.hash = "browser/" + this.opencgaSession.project.id + "/" + this.opencgaSession.study.id;
                this.browserSearchQuery = _query;
                break;
            case "#interpretation":
                window.location.hash = "interpretation/" + this.opencgaSession.project.id + "/" + this.opencgaSession.study.id;
                this.interpretationSearchQuery = _query;
                break;
            default:
                this.tool = "#browser";
                window.location.hash = "browser/" + this.opencgaSession.project.id + "/" + this.opencgaSession.study.id;
                this.browserSearchQuery = _query;
                break;
            }
        }
        // debugger
    }

    quickSearch(e) {
        // debugger
        this.tool = "#browser";
        window.location.hash = "browser/" + this.opencgaSession.project.id + "/" + this.opencgaSession.study.id;
        // this.browserQuery = {xref: e.detail.value};

        this.browserSearchQuery = e.detail;
    }

    quickFacetSearch(e) {
        console.log("IVA-APP quickfacetsearch")
        this.tool = "#facet";
        window.location.hash = "facet/" + this.opencgaSession.project.id + "/" + this.opencgaSession.study.id;
        // this.browserQuery = {xref: e.detail.value};
        this.browserSearchQuery = e.detail;
    }

    // _checkBreadcrumbVisible() {
    //     if (UtilsNew.isNotUndefinedOrNull(this.config) && UtilsNew.isNotUndefinedOrNull(this.opencgaSession)) {
    //         this._isBreadcrumbVisible = this.config.breadcrumb.visible && this.opencgaSession.projects !== undefined && this.opencgaSession.projects.length !== 0;
    //     }
    // }

//     renderBreadcrumb() {
//         debugger
//         this._checkBreadcrumbVisible();
//
//         let breadcrumbElement = PolymerUtils.getElementById("breadcrumb");
//
//         if (UtilsNew.isNotNull(breadcrumbElement) && UtilsNew.isNotUndefined(this.config)
//             && UtilsNew.isNotUndefinedOrNull(this.opencgaSession) && UtilsNew.isNotEmptyArray(this.opencgaSession.projects)) {
//
//             // If there is no project in config, breadcrumb is set private so that it is shown only when logged in
//             // if (UtilsNew.isUndefined(this.config.opencga.projects) || this.config.opencga.projects.length === 0) {
//             //     this.config.breadcrumb.visibility = "private";
//             // }
//
//             // we empty everything
// //                    console.log(this.breadcrumbElement)
//             PolymerUtils.innerHTML("breadcrumb", "");
//             // we add the 'Projects' link
//             let projects = this._createBreadcrumbElement(this.config.breadcrumb.title, false, this.config.breadcrumb.title);
//             breadcrumbElement.appendChild(projects);
//
//             // We first check if one study is selected, for this study must be defined and have at least one key
//             if (UtilsNew.isUndefined(this.opencgaSession.study) || Object.keys(this.opencgaSession.study).length === 0) {
//                 if (UtilsNew.isNotUndefinedOrNull(this.opencgaSession.project)) {
//                     let project = this._createBreadcrumbElement(this.opencgaSession.project.alias, true, "project"); // render only project if exists
//                     breadcrumbElement.appendChild(project);
//                 }
//             } else {
//                 let project = this._createBreadcrumbElement(this.opencgaSession.project.alias, false, "project");
//                 breadcrumbElement.appendChild(project);
//
//                 if (UtilsNew.isNotUndefined(this.samples) && this.samples.length > 0) {
//                     let study = this._createBreadcrumbElement(this.opencgaSession.study.alias, false, "study");
//                     let sampleNames = [];
//                     for (let i in this.samples) {
//                         sampleNames.push(this.samples[i].name);
//                     }
//                     let samples = this._createBreadcrumbElement(sampleNames.join(","), true, "sample");
//                     breadcrumbElement.appendChild(study);
//                     breadcrumbElement.appendChild(samples);
//                 } else {
//                     let study = this._createBreadcrumbElement(this.opencgaSession.study.alias, true, "study");
//                     breadcrumbElement.appendChild(study);
//                 }
//             }
//
//             let _this = this;
//             PolymerUtils.querySelectorAll(".breadcrumb li a").forEach(function (element) {
//                 element.addEventListener("click", function (e) {
//                     e.preventDefault();
//                     switch (e.target.dataset.category) {
//                     case _this.config.breadcrumb.title:
//                         _this.tool = "projects";
//                         break;
//                     case "project":
//                         _this.tool = "project";
//                         break;
//                     case "study":
//                         _this.tool = "browser";
//                         break;
//                     }
//                     _this.renderHashFragments();
//                 });
//             });
//         }
//         this.requestUpdate();
//     }

    // _createBreadcrumbElement(name, active, category) {
    //     // name can be undefined when Polymer initialise
    //     if (typeof name === "undefined") {
    //         name = "undefined";
    //     }
    //
    //     let li = document.createElement("li");
    //     if (active === true) {
    //         li.setAttribute("class", "active");
    //         li.textContent = name;
    //     } else {
    //         let a = document.createElement("a");
    //         a.setAttribute("href", "#");
    //         a.setAttribute("class", "");
    //         a.setAttribute("data-category", category);
    //         a.textContent = name;
    //         li.appendChild(a);
    //     }
    //     return li;
    // }

    _isMenuItemVisible(item) {
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

    onNotifyMessage(e) {
        NotificationUtils.closeNotify(this.notifySession);
        NotificationUtils.showNotify(e.detail.message, e.detail.type, e.detail.options, e.detail.settings);
    }

    //TODO geneSelected() is called by several components but it doesn't exists

    //TODO CONTINUE this should keep in sync the query object between variant-browser and variant-facet
    onQueryChange(e) {
        console.log("onQueryChange", e)
        this.browserSearchQuery = {...e.detail.query}
    }


    onQueryFilterSearch(e, source) {

        //FIXME filters component emits a event containing {detail:{query:Object}} while active-filter emits {detail:{Object}}
        //TODO fix active-filters
        const q = e.detail.query || e.detail;
        this.queries[source] = {...q};
        this.queries = {...this.queries};
        //console.log("this.queries",this.queries);
        this.requestUpdate();
    }

    /* Set the width of the side navigation to 250px */
    openNav() {
        this.querySelector("#side-nav").style.width = "250px";
        console.log("open")
    }

    /* Set the width of the side navigation to 0 */
    closeNav() {
        this.querySelector("#side-nav").style.width = "0";
    }

    toggleSideNav(e) {
        e.preventDefault();
        let sidenav = this.querySelector("#side-nav");
        $("#side-nav").toggleClass("active")
        $("#overlay").toggleClass("active")
    }


    render() {
        return html`
            <style include="jso-styles">            	
                .navbar-inverse {
                    background-color: #0c2f4c;
                }
                .navbar-inverse .navbar-nav>.open>a, .navbar-inverse .navbar-nav>.open>a:focus, .navbar-inverse .navbar-nav>.open>a:hover {
                    background-color: #09243a;
                }
                .navbar-inverse .navbar-nav>.active>a, .navbar-inverse .navbar-nav>.active>a:focus, .navbar-inverse .navbar-nav>.active>a:hover {
                	background-color: #09243a;
                }
                .navbar-inverse .navbar-nav>li>a {
    				color: #d2d2d2;
				}
				.navbar-inverse .dropdown-menu>.active>a, .navbar-inverse .dropdown-menu>.active>a:focus, .navbar-inverse .dropdown-menu>.active>a:hover {
					background-color: #0c2f4c;
				}
								
				.navbar-nav li.notification > a > i {
                    font-size: 25px;
                    position: absolute;
                    left: 10px;
                    top: 13px;
				}
				
				.navbar-nav li.user-menu > a {
                    padding-left: 40px;				
				}
    
				.navbar-nav li.user-menu > a > i {
				    font-size: 25px;
                    position: absolute;
                    left: 10px;
                    top: 13px;
				}
				
				.navbar-nav .badge  {
                    position: relative;
                    z-index: 10;
                    bottom: 6px;
                    left: 9px;
                    background-color: #41a7ff;
				}
				
				.center {
                    margin: auto;
                    text-align: justify;
                    width: 60%;
                    font-size: 18px;
                    color: #797979;
                }
            
                .feature-view {
                    margin: auto;
                    text-align: justify;
                    width: 90%;
                }
                .search-box-wrapper .form-control{
                    border-right-width: 0;                   
                }
                .search-box-wrapper .input-group-addon{
                    background: #fff;
                    cursor: pointer;
                }
                .search-box-wrapper .input-group-addon:hover{
                    background: #eee;
                }
                #searchTextBox {
                    width: 100px;
                }
                
                #login {
                    display: flex;
                    align-items: center; 
                    justify-content: center;
                }
               
                            
            /* The side navigation menu TODO  use transform: translateX(); instead of margin */

            #side-nav {
                position: fixed;
                z-index: 10; 
                top: 0; 
                left: -250px;
                background-color: #fff; 
                overflow-x: hidden;
                padding-top: 20px; 
                width: 250px;
                visibility: hidden;
                /*transform: translate(-250px);*/                
                height: 100vh;
                transform-origin: top left;
                animation-duration: .3s;
                animation-timing-function: ease;
                animation-name: slideOutFrames
            }
            
            #side-nav.active {
                left: 0px;
                visibility: visible;
                animation-name: slideInFrames
            }  
            
            #side-nav a.logo {
                margin: 25px 0px 15px 30px;
                display: block;;
            }
            
            #side-nav .logo img{
                width: 150px;
            }
            
            #side-nav .nav a {
                padding: 8px 8px 8px 32px;
                text-decoration: none;
                color: #818181;
                display: block;
                transition: 0.3s;
                font-size: 15px;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            
            #side-nav .nav a:hover {            
                color: #fff;
                background-color: #204d74;
            }

            #side-nav .closebtn {
                position: absolute;
                top: 0;
                right: 25px;
                font-size: 36px;
                margin-left: 50px;
                padding:0;
                z-index: 99;
            }
            
            #side-nav a.closebtn:hover {        
                background: transparent;
                text-decoration: none;
                color: black;
            }
            
            #overlay {
                position: fixed;
                transform: translate(-100%);
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0,0,0,.2);
                z-index: 9;
                transition: filter .3s, opacity .3s; 
                opacity:0;                
                filter:alpha(opacity=100);
            }
            
            #overlay.active {
                display: block;
                opacity:1;                
                filter:alpha(opacity=50);
                transform: translate(0);
            }

            
            </style>

            <div id="overlay" @click="${this.toggleSideNav}"></div>
            <div id="side-nav" class="sidenav shadow-lg">
                <a href="javascript:void(0)" class="closebtn" @click="${this.toggleSideNav}">&times;</a>
                <nav class="navbar" id="sidebar-wrapper" role="navigation">
                    <div>
                        <a href="#home" class="logo" @click="${this.changeTool}"><img src="${this.config.logo}" alt="logo"></a>
                    </div>
                    <ul class="nav sidebar-nav">
                    ${this.config.menu && this.config.menu.length ? this.config.menu.map( item => html`
                        <li>
                            <a href="#cat-${item.id}" role="button" @click="${ e => {this.toggleSideNav(e); this.changeTool(e)} }">${item.title}</a>
                         </li>
                    `) : null}
                    </ul>
                </nav>
            </div>
            
			<div>
				<nav class="navbar navbar-inverse" style="margin-bottom: 5px; border-radius: 0px">
					<div>
			
			            <ul class="nav navbar-nav">
			                <li>
			                    <a href="#" @click="${this.toggleSideNav}" id="waffle-icon">
			                       <img src="/src/styles/waffle-icon.svg" />
                                </a>
                            </li>
                        </ul>
						<!-- Brand and toggle get grouped for better mobile display -->
						<div class="navbar-header">
							<a href="#home" class="navbar-brand" style="padding-top: 10px" @click="${this.changeTool}">
								<img src="${this.config.logo}" width="100px" alt="logo">
							</a>
							<a class="navbar-brand" href="#home" @click="${this.changeTool}">
								<b>${this.config.title} <sup>${this.config.version}</sup></b>
							</a>
						</div>
			
						<!-- Collect the nav links, forms, and other content for toggling -->
						<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			
							<!-- Controls aligned to the LEFT -->
							<ul class="nav navbar-nav">
								<!-- This code parse the config menu arrays and creates a custom menu taken into account visibility -->
								${this.config.menu.length && this.config.menu.map(item => html`
									<!-- If there is not submenu we just display a button -->
									${!item.submenu ? html`
										<li>
											<a href="#${item.id}" role="button" @click="${this.changeTool}">${item.title}</a>
										</li>` : html`
										<!-- If there is a submenu we create a dropdown menu item -->
										<li class="dropdown">
											<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
												${item.title} <span class="caret"></span>
											</a>
											<ul class="dropdown-menu">
												${item.submenu.map( subitem =>
                                                    subitem.category ? html`
                                                        <li><a><label>${subitem.title}</label></a></li>
                                                    ` : subitem.separator ? html`
                                                        <li role="separator" class="divider"></li>
                                                    ` : html`
                                                    <li><a href="#${subitem.id}" @click="${this.changeTool}" data-id="${subitem.id}">${subitem.title}</a></li>
                                                    `)}
											</ul>
										</li>`
                                    }`
                                ) }
							</ul>
							<!-- Controls aligned to the RIGHT: settings and about-->
							<ul class="nav navbar-nav navbar-right">
							   <!-- Jobs -->
								${this.opencgaSession.token ? html`
                                    <li class="notification">
                                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                            <span class="badge badge-pill badge-primary">666</span><i class="fas fa-bell"></i>
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li>
                                                <a href="#projects">that would be a lot of notifications</a>
                                            </li>
                                            <li>
                                                <a href="#projects"> All notifications </a>
                                            </li>
                                        </ul>                                           
                                    </li>
								` : null}
			
			                    
								<!--Studies dropdown and Search menu-->
								${this.opencgaSession.projects && this.opencgaSession.projects.length ? html`
									<li class="dropdown">
										<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
										    <i class="fa fa-database fa-lg" style="padding-right: 5px"></i>Studies <span class="caret"></span>
										</a>
										<ul class="dropdown-menu pre-scrollable">
											${this.opencgaSession.projects.map(project => html`
												<li><a><b>${project.name}</b></a></li>
												${project.studies && project.studies.length && project.studies && project.studies.map(study => html`
													<li>
														<a href="#" data-study="${study.alias}" data-project="${project.name}" @click="${this.onStudySelect}">${study.alias}</a>
													</li>
												`)}                                            
											`)}
										</ul>
									</li>
								` : null}
			
			                    <!--Search menu-->
			                    ${this.opencgaSession.projects && this.config.search.visible ? html`
										<form class="navbar-form navbar-left" role="search">
											<div class="form-group">
												<div class="input-group search-box-wrapper">
													<input class="form-control" id="searchTextBox"  placeholder="${this.config.search.placeholder}" @input="${this.buildQuery}">
													<span class="input-group-addon"><span class="fa fa-search" aria-hidden="true" @click="${this.onQuickSearch}"></span></span>
												</div>
											</div>
										</form>
								` : null}
			
					            <!-- About dropdown menu-->
								${this.config.about.dropdown ? html`
									<li class="dropdown">
										<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
											<i class="fa fa-question-circle fa-lg" style="padding-right: 5px"></i>About
										</a>
										<ul class="dropdown-menu">
											${this.config.about.links && this.config.about.links.map( link => html`
                                                <li>
                                                    <a href="${link.url}" ><i class="${link.icon}" aria-hidden="true"></i> ${link.name}</a>
                                                </li>
											`)}
										</ul>
									</li>
								` : this.config.about.links && this.config.about.links.map(link => html`
									<li>
										<a href="#${link.id}" role="button" @click="${this.changeTool}">${link.name}</a>
									</li>
								`)}
								
								<!-- Login/Logout button -->
                                ${this.config.login.visible && !this.opencgaSession.token ? html`
									<li>
                                        <a href="#login" id="loginButton" role="button" @click="${this.changeTool}">
										    <i href="#login" class="fa fa-sign-in-alt fa-lg" aria-hidden="true" style="padding-right: 5px"></i>Login
										</a>
									</li>
								` : null}
                                
                                <!--User-->
                                ${this.opencgaSession.token ? html`
									<li class="dropdown user-menu">
										<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
											<i class="fa fa-user-circle" aria-hidden="true" style="padding-right: 5px"></i>${this.opencgaSession.user.id} <span class="caret"></span>
										</a>
										<ul class="dropdown-menu">
										    <li>
										        <a href="#account"><i class="fa fa-user" aria-hidden="true"></i> Your account</a>
										    </li>
										    <li>
										        <a href="#projects"><i class="fa fa-database" aria-hidden="true"></i> Projects</a>
										    </li>
										    <li role="separator" class="divider"></li>
											<li>
											    <a href="#settings"><i class="fa fa-cog" aria-hidden="true"></i> Settings</a>
											</li>
										    <li>
											    <a id="logoutButton" role="button" @click="${this.logout}">
											        <i class="fa fa-sign-out-alt" aria-hidden="true"></i> Logout
											    </a>
											</li>
										</ul>
									</li>
								` : null}                   
							</ul>
						</div>
					</div>
				</nav>
			</div>
			<!-- End of navigation bar -->
			
			<!--Breadcrumb-->
			${this.config.breadcrumb.visible && this.opencgaSession.projects ? html`
				<!--<div>
					<ol id="breadcrumb" class="breadcrumb" style="margin-bottom: 1px;padding-left: 40px"></ol>
				</div>-->
				<opencga-breadcrumb .config="${this.config}" .opencgaSession="${this.opencgaSession}"></opencga-breadcrumb>
			` : null}
			
			<!-- This is where main application is rendered -->
			<div>
				${this.config.enabledComponents.home ? html`
					<div class="content" id="home">
						<welcome-web .opencgaSession="${this.opencgaSession}" version="${this.config.version}" .cellbaseClient=${this.cellbaseClient} @search="${this.quickSearch}" .config="${this.config}"> </welcome-web>
					</div>
				` : null}
			
				${this.config.enabledComponents.about ? html`
					<div class="content" id="about">
						<about-web version="${this.config.version}"></about-web>
					</div>
				` : null}
			
				${this.config.enabledComponents.terms ? html`
					<div class="content" id="terms">
						<terms-web version="${this.config.version}"></terms-web>
					</div>
				` : null}
			
				${this.config.enabledComponents.contact ? html`
					<div class="content" id="contact">
						<contact-web version="${this.config.version}"></contact-web>
					</div>
				` : null}
			
				${this.config.enabledComponents.faq ? html`
				<div class="content" id="faq">
					<faq-web version="${this.config.version}"></faq-web>
				</div>
				` : null}
				
				${this.config.enabledComponents.gettingstarted ? html`
				<div class="content" id="getting-started">
					<getting-started .opencgaSession="${this.opencgaSession}" .config="${this.config}"></getting-started>
				</div>
				` : null}
			</div>
			
			 <!-- -<div class="alert alert-info">${JSON.stringify(this.queries)}</div> --> 
			
			<!-- This is where main IVA application is rendered -->
			<div class="container-fluid">
			
				${this.config.enabledComponents.login ? html`
					<div class="content" id="login">
						<opencga-login  .opencgaClient="${this.opencgaClient}"
										loginTitle="Sign in"
									    .notifyEventMessage="${this.config.notifyEventMessage}"
									    @login="${this.login}"
									    @notifymessage="${this.onNotifyMessage}">
						</opencga-login>
					</div>
				` : null}
							
				${this.config.enabledComponents.browser ? html`
					<div class="content" id="browser">
						<!--search="{{browserSearchQuery}}"-->
						<opencga-variant-browser .opencgaSession="${this.opencgaSession}"
												.cellbaseClient="${this.cellbaseClient}"
												.reactomeClient="${this.reactomeClient}"
										        .query="${this.queries.variant}"
												.active="${this.config.tools.browser.active}"
												.populationFrequencies="${this.config.populationFrequencies}"
												.proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
												.consequenceTypes="${this.config.consequenceTypes}"
												.config="${this.config.tools.browser}"
												style="font-size: 12px"
												@onGene="${this.geneSelected}"
												@onSamplechange="${this.onSampleChange}"
											    @querySearch="${e => this.onQueryFilterSearch(e,"variant")}"
											    @activeFilterChange="${e => this.onQueryFilterSearch(e, "variant")}"
												@facetSearch="${this.quickFacetSearch}">
						</opencga-variant-browser>
					</div>
				` : null}
				
				${this.config.enabledComponents.facet ? html`
					<div class="content" id="facet">
						<opencga-variant-facet  .opencgaSession="${this.opencgaSession}"
											    .opencgaClient="${this.opencgaSession.opencgaClient}"
										        .query="${this.queries.variant}"
												.config="${this.config.tools.facet}"
											    .cellbaseClient="${this.cellbaseClient}"
											    .populationFrequencies="${this.config.populationFrequencies}"
											    .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
											   	.consequenceTypes="${this.config.consequenceTypes}"
                                                @querySearch="${e => this.onQueryFilterSearch(e, "variant")}"
                                                @activeFilterChange="${e => this.onQueryFilterSearch(e, "variant")}">
						</opencga-variant-facet>
					</div>				
				` : null}

				${this.config.enabledComponents.clinicalAnalysisPortal ? html`
					<div class="content" id="clinicalAnalysisPortal">
						<opencga-clinical-portal .opencgaSession="${this.opencgaSession}"
						                        .opencgaClient="${this.opencgaSession.opencgaClient}"
												.config="${this.config.tools.clinicalPortal}"
											    .cellbaseClient="${this.cellbaseClient}">
						</opencga-clinical-portal>
					</div>
				` : null}
				
				${this.config.enabledComponents.interpretation ? html`
					<div class="content" id="interpretation">
						<opencga-variant-interpretation .opencgaSession="${this.opencgaSession}"
														.cellbaseClient="${this.cellbaseClient}"
														.clinicalAnalysisId="${this.clinicalAnalysisId}"
														.query="${this.interpretationSearchQuery}"
														.populationFrequencies="${this.config.populationFrequencies}"
														.proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
														.consequenceTypes="${this.config.consequenceTypes}"
														.config="${this.config.tools.interpretation}"
														style="font-size: 12px"
														@gene="${this.geneSelected}"
														@samplechange="${this.onSampleChange}">
						</opencga-variant-interpretation>
					</div>
				` : null }
				
				${this.config.enabledComponents.beacon ? html`
					<div class="content" id="beacon">
						<variant-beacon .opencgaSession="${this.opencgaSession}"
										.hosts="${this.config.tools.beacon.hosts}">
						</variant-beacon>
					</div>
				` : null }
					
				${this.config.enabledComponents.genomeBrowser ? html`
					<div class="content" id="genomeBrowser">
						<opencga-genome-browser .opencgaSession="${this.opencgaSession}"
												.cellbaseClient="${this.cellbaseClient}"
												.opencgaClient="${this.opencgaClient}">
						</opencga-genome-browser>
					</div>
				` : null } 
				
				${this.config.enabledComponents.projects ? html`
					<div class="content" id="projects">
						<opencga-projects  .opencgaSession="${this.opencgaSession}"  
						                   .opencgaClient="${this.opencgaClient}"
										   .projects="${this.opencgaSession.projects}"
										   .studySummaries="${this.studySummaries}"
										   @project="${this.updateProject}"
										   @study="${this.updateStudy}">
						</opencga-projects>
					</div>
				` : null }
				
				${this.config.enabledComponents.samples ? html`
					<div class="content" id="samples">
						<opencga-sample-browser .query="${this.queries.sample}"
						                        .opencgaSession="${this.opencgaSession}"
												.opencgaClient="${this.opencgaClient}"
												.config="${this.config.sampleBrowser}"
                                                @querySearch="${e => this.onQueryFilterSearch(e, "sample")}"
                                                @activeFilterChange="${e => this.onQueryFilterSearch(e, "sample")}"
                                                @facetSearch="${this.quickFacetSearch}">
						</opencga-sample-browser>
					</div>
				` : null }
				
				${this.config.enabledComponents["samples-facet"] ? html`
					<div class="content" id="samples-facet">
						<opencga-samples-facet resource="sample"
										.opencgaSession="${this.opencgaSession}"
                                        .opencgaClient="${this.opencgaSession.opencgaClient}"
                                        .query="${this.queries.sample}"
                                        .config="${this.config.tools.facet}"
                                        .cellbaseClient="${this.cellbaseClient}"
                                        .populationFrequencies="${this.config.populationFrequencies}"
                                        .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                        .consequenceTypes="${this.config.consequenceTypes}"
										@querySearch="${e => this.onQueryFilterSearch(e,"sample")}"
									    @activeFilterChange="${e => this.onQueryFilterSearch(e, "sample")}">
						</opencga-samples-facet>
					</div>
				` : null}
				
				${this.config.enabledComponents.panel ? html`
					<div class="content" id="panel">
						<opencga-panel-browser  .opencgaSession="${this.opencgaSession}"
												.opencgaClient="${this.opencgaClient}"
											    .cellbaseClient="${this.cellbaseClient}"
											    .eventNotifyName="${this.config.notifyEventMessage}"
											    @notifymessage="${this.onNotifyMessage}">
						</opencga-panel-browser>
					</div>
				` : null }
				
				${this.config.enabledComponents.files ? html`
					<div class="content" id="files">
						<opencga-file-browser .opencgaSession="${this.opencgaSession}"
											  .config="${this.config.fileBrowser}"
											  .query="${this.queries.files}"
                                              @querySearch="${e => this.onQueryFilterSearch(e, "files")}"
                                              @activeFilterChange="${e => this.onQueryFilterSearch(e, "files")}"
                                              @facetSearch="${this.quickFacetSearch}">
						</opencga-file-browser>
					</div>
				` : null }

                ${this.config.enabledComponents["files-facet"] ? html`
					<div class="content" id="files-facet">
						<opencga-file-facet .opencgaSession="${this.opencgaSession}"
                                        .opencgaClient="${this.opencgaSession.opencgaClient}"
                                        .query="${this.queries.files}"
                                        .config="${this.config.tools.facet}"
                                        .cellbaseClient="${this.cellbaseClient}"
                                        .populationFrequencies="${this.config.populationFrequencies}"
                                        .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                        .consequenceTypes="${this.config.consequenceTypes}"
                                        @querySearch="${e => this.onQueryFilterSearch(e, "files")}"
                                        @activeFilterChange="${e => this.onQueryFilterSearch(e, "files")}">
						</opencga-file-facet>
					</div>
				` : null}

				<!--todo check-->
				${this.config.enabledComponents.gene ? html`
					<div class="content" id="gene" style="margin: auto; width: 90%">
						<opencga-gene-view .opencgaSession="${this.opencgaSession}"
										   .cellbaseClient="${this.cellbaseClient}"
										   .project="${this.opencgaSession.project}"
										   .study="${this.opencgaSession.study}"
										   .gene="${this.gene}"
										   .populationFrequencies="${this.config.populationFrequencies}"
										   .consequenceTypes="${this.config.consequenceTypes}"
										   .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
										   .config="${this.config.tools.gene}"
										   .summary="${this.config.opencga.summary}">
						</opencga-gene-view>
					</div>
				` : null }
				
				${this.config.enabledComponents.sample ? html`
					<div class="content" id="sample" style="margin: auto; width: 90%">
						<opencga-sample-view    .opencgaSession="${this.opencgaSession}"
												.config="${this.config.sampleView}">
						</opencga-sample-view>
					</div>
				` : null }
				
				
				${this.config.enabledComponents.transcript ? html`
					<div class="content feature-view" id="transcript">
						<opencga-transcript-view .cellbaseClient="${this.cellbaseClient}"
												 .opencgaClient="${this.opencgaClient}"
												 .project="${this.opencgaSession.project}"
												 .study="${this.opencgaSession.study}"
												 .transcript="${this.transcript}"
												 .gene="${this.gene}"
												 .populationFrequencies="${this.config.populationFrequencies}"
												 .consequenceTypes="${this.config.consequenceTypes}"
												 .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
												 .config="${this.config.tools.gene}">
						</opencga-transcript-view>
					</div>
				` : null }
				
				${this.config.enabledComponents.protein ? html`
					<div class="content feature-view" id="protein">
						<opencga-protein-view .opencgaSession="${this.opencgaSession}"
											  .cellbaseClient="${this.cellbaseClient}"
											  .opencgaClient="${this.opencgaClient}"
											  .project="${this.opencgaSession.project}"
											  .study="${this.opencgaSession.study}"
											  .protein="${this.protein}"
											  .populationFrequencies="${this.config.populationFrequencies}"
											  .consequenceTypes="${this.config.consequenceTypes}"
											  .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
											  .config="${this.config.tools.gene.protein}">
						</opencga-protein-view>
					</div>
				` : null }
				
                ${this.config.enabledComponents.individuals ? html`
					<div class="content" id="individuals">
						<opencga-individual-browser .query="${this.queries.individuals}"
						                            .opencgaClient="${this.opencgaClient}"
						                            .opencgaSession="${this.opencgaSession}"
													.configValues="${this.config.tools.clinical}"
											        @querySearch="${e => this.onQueryFilterSearch(e,"individuals")}"
											        @activeFilterChange="${e => this.onQueryFilterSearch(e, "individuals")}"
                                                    @facetSearch="${this.quickFacetSearch}">
                        </opencga-individual-browser>
					</div>
                ` : null }
                
                ${this.config.enabledComponents["individual-facet"] ? html`
					<div class="content" id="individual-facet">
						<opencga-individual-facet .opencgaSession="${this.opencgaSession}"
                                        .opencgaClient="${this.opencgaSession.opencgaClient}"
                                        .query="${this.queries.individuals}"
                                        .config="${this.config.tools.facet}"
                                        .cellbaseClient="${this.cellbaseClient}"
                                        .populationFrequencies="${this.config.populationFrequencies}"
                                        .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                        .consequenceTypes="${this.config.consequenceTypes}"
                                        @querySearch="${e => this.onQueryFilterSearch(e, "individuals")}"
                                        @activeFilterChange="${e => this.onQueryFilterSearch(e, "individuals")}">
						</opencga-individual-facet>
					</div>
				` : null}
                
                ${this.config.enabledComponents.families ? html`
                    <div class="content" id="families">
						<opencga-family-browser .query="${this.queries.families}"
						                        .opencgaClient="${this.opencgaClient}"
												.opencgaSession="${this.opencgaSession}"
											    @querySearch="${e => this.onQueryFilterSearch(e,"families")}"
											    @activeFilterChange="${e => this.onQueryFilterSearch(e, "families")}"
                                                @facetSearch="${this.quickFacetSearch}">
                        </opencga-family-browser>
					</div>
                ` : null }
                
                ${this.config.enabledComponents["family-facet"] ? html`
					<div class="content" id="family-facet">
						<opencga-family-facet .opencgaSession="${this.opencgaSession}"
                                        .opencgaClient="${this.opencgaSession.opencgaClient}"
                                        .query="${this.queries.families}"
                                        .config="${this.config.tools.facet}"
                                        .cellbaseClient="${this.cellbaseClient}"
                                        .populationFrequencies="${this.config.populationFrequencies}"
                                        .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                        .consequenceTypes="${this.config.consequenceTypes}"
                                        @querySearch="${e => this.onQueryFilterSearch(e, "families")}"
                                        @activeFilterChange="${e => this.onQueryFilterSearch(e, "families")}">                                        
						</opencga-family-facet>
					</div>
				` : null}

                ${this.config.enabledComponents.cohorts ? html`
					<div class="content" id="cohorts">
						<opencga-cohort-browser .query="${this.queries.cohorts}"
						                        .opencgaSession="${this.opencgaSession}"
												.config="${this.config.cohortBrowser}"
											    @querySearch="${e => this.onQueryFilterSearch(e,"cohorts")}"
											    @activeFilterChange="${e => this.onQueryFilterSearch(e, "cohorts")}"
											    @facetSearch="${this.quickFacetSearch}">
                        </opencga-cohort-browser>
					</div>
                ` : null }

                ${this.config.enabledComponents["cohort-facet"] ? html`
					<div class="content" id="cohort-facet">
						<opencga-cohort-facet   .opencgaSession="${this.opencgaSession}"
                                                .opencgaClient="${this.opencgaSession.opencgaClient}"
                                                .query="${this.queries.cohorts}"
                                                .config="${this.config.tools.facet}"
                                                .cellbaseClient="${this.cellbaseClient}"
                                                .populationFrequencies="${this.config.populationFrequencies}"
                                                .proteinSubstitutionScores="${this.config.proteinSubstitutionScores}"
                                                .consequenceTypes="${this.config.consequenceTypes}"
                                                @querySearch="${e => this.onQueryFilterSearch(e, "cohorts")}"
                                                @activeFilterChange="${e => this.onQueryFilterSearch(e, "cohorts")}"
						</opencga-cohort-facet>
					</div>
				` : null}
                
                ${this.config.enabledComponents.clinicalAnalysis ? html`
					<div class="content" id="clinicalAnalysis">
						<opencga-clinical-analysis-browser  .opencgaSession="${this.opencgaSession}"
														    .config="${this.config.clinicalAnalysisBrowser}"
														    .query="${this.queries.clinicalAnalysis}"
														    @urlchange="${this.onUrlChange}">
                        </opencga-clinical-analysis-browser>
					</div>
                ` : null }
                
                ${this.config.enabledComponents["cat-browser"] ? html`
					<div class="content" id="cat-browser">
						<category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find( item => item.id === "browser")}">
                        </category-page>
					</div>
                ` : null }
                
                ${this.config.enabledComponents["cat-analysis"] ? html`
					<div class="content" id="cat-analysis">
						<category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find( item => item.id === "analysis")}">
                        </category-page>
					</div>
                ` : null }
                
                ${this.config.enabledComponents["cat-clinical"] ? html`
					<div class="content" id="cat-clinical">
						<category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find( item => item.id === "clinical")}">
                        </category-page>
					</div>
                ` : null }
                
                ${this.config.enabledComponents["cat-catalog"] ? html`
					<div class="content" id="cat-catalog">
						<category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find( item => item.id === "catalog")}">
                        </category-page>
					</div>
                ` : null }
                
                ${this.config.enabledComponents["cat-ga4gh"] ? html`
					<div class="content" id="cat-ga4gh">
						<category-page .opencgaSession="${this.opencgaSession}" .config="${this.config.menu.find( item => item.id === "ga4gh")}">
                        </category-page>
					</div>
                ` : null }                                                                
                                
                                
                ${this.config.enabledComponents.gwas ? html`
					<div class="content" id="opencga-gwas-analysis">
						<opencga-gwas-analysis>
                        </opencga-gwas-analysis>
					</div>
                ` : null }
				
                
			<!-- TODO convert in lit-element
				<template is="dom-if" if="{{config.enabledComponents.clinical}}">
					<div class="content" id="clinical">
						<opencga-variant-clinical opencga-session="{{opencgaSession}}" config="[[config.tools.clinical]]"
												  population-frequencies="{{config.populationFrequencies}}"
												  protein-substitution-scores="{{config.proteinSubstitutionScores}}"
												  consequence-types="{{config.consequenceTypes}}"
												  opencga-client="{{opencgaClient}}" cellbase-client="{{cellbaseClient}}"
												  on-notifymessage="onNotifyMessage"
												  event-notify-name="{{config.notifyEventMessage}}">
						</opencga-variant-clinical>
					</div>
				</template>
				
				<template is="dom-if" if="{{config.enabledComponents.settings}}">
					<div class="content" id="settings" style="width: 40%; margin: auto">
						<br>
						<iva-settings opencga-client="{{opencgaClient}}" on-config="refreshConfig"
									  default-config="{{defaultConfig}}">
						</iva-settings>
					</div>
				</template>
			
				<template is="dom-if" if="{{config.enabledComponents.project}}">
					<div class="content" id="project">
						<opencga-project opencga-client="{{opencgaClient}}" project="{{opencgaSession.project}}"
										 study-summaries="{{studySummaries}}"
										 on-study="updateStudy">
						</opencga-project>
					</div>
				</template>
			
				<template is="dom-if" if="{{config.enabledComponents.clinicalAnalysisCreator}}">
					<div class="content" id="clinicalAnalysisCreator">
						<opencga-clinical-analysis-creator opencga-session="{{opencgaSession}}"
														   config="{{config.clinicalAnalysisBrowser}}"></opencga-clinical-analysis-creator>
					</div>
				</template>
				-->
			
			</div>`;
    }
}

customElements.define("iva-app", IvaApp);
